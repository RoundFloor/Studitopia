import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import {
    createClient,
    expectErrorCode,
    loginByEmail,
    loginByUsername,
    registerAccount,
    resetDatabase,
} from "./helpers.js";
import { fullFlowTestcases } from "./pg.full-flow.testcases.js";

async function sessionValid(
    client: PostgresClient,
    sessionId: number,
    userId: number,
): Promise<boolean> {
    const response = await client.client!.query<{ valid: boolean }>(
        "SELECT EXISTS (SELECT 1 FROM STUDITOPIA.SESSION WHERE ID = $1 AND OWNER_ID = $2 AND STATUS = 'ACTIVE' AND EXPIRED_TIME > NOW()) AS valid;",
        [sessionId, userId],
    );
    return response.rows[0]!.valid;
}

async function accountState(client: PostgresClient, userId: number) {
    const response = await client.client!.query<{
        status: string;
        otp: number | null;
    }>("SELECT STATUS, OTP FROM STUDITOPIA.ACCOUNT WHERE ID = $1;", [userId]);
    return response.rows[0]!;
}

describe("Authentication full flow", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(() => {
        client.dispose();
    });

    it.each(fullFlowTestcases)(
        "complete authentication flow: $description",
        async ({ description, otp, ...account }) => {
            // 1. Registration creates an inactive account and an active session.
            const registered = await registerAccount(client, account);

            expect(registered.user_id).toBeTypeOf("number");
            expect(registered.session_id).toBeTypeOf("number");
            expect(await sessionValid(client, registered.session_id, registered.user_id)).toBe(true);

            let state = await accountState(client, registered.user_id);
            expect(state.status).toBe("INACTIVE");
            expect(state.otp).toBeNull();

            const email = await client.client!.query<{ email: string }>(
                "SELECT STUDITOPIA.GET_EMAIL($1, $2) AS email;",
                [registered.session_id, registered.user_id],
            );
            expect(email.rows[0]?.email).toBe(account.email);

            // 2. Login by username issues an additional session; the old one stays active.
            const byUsername = await loginByUsername(
                client,
                account.username,
                account.password,
            );
            const usernameLogin = byUsername.rows[0]!;

            expect(usernameLogin.user_id).toBe(registered.user_id);
            expect(usernameLogin.role).toBe("STUDENT");
            expect(usernameLogin.status).toBe("INACTIVE");
            expect(usernameLogin.session_id).not.toBe(registered.session_id);
            expect(
                await sessionValid(
                    client,
                    usernameLogin.session_id,
                    usernameLogin.user_id,
                ),
            ).toBe(true);
            expect(
                await sessionValid(
                    client,
                    registered.session_id,
                    registered.user_id,
                ),
            ).toBe(true);

            // 3. OTP can be stored and read with the login session.
            const emptyOtp = await client.client!.query<{ otp: number | null }>(
                "SELECT STUDITOPIA.GET_OTP($1, $2) AS otp;",
                [usernameLogin.session_id, usernameLogin.user_id],
            );
            expect(emptyOtp.rows[0]?.otp).toBeNull();

            const saved = await client.client!.query<{ saved: boolean }>(
                "SELECT STUDITOPIA.SAVE_OTP($1, $2, $3) AS saved;",
                [usernameLogin.session_id, usernameLogin.user_id, otp],
            );
            expect(saved.rows[0]?.saved).toBe(true);

            const storedOtp = await client.client!.query<{ otp: number | null }>(
                "SELECT STUDITOPIA.GET_OTP($1, $2) AS otp;",
                [usernameLogin.session_id, usernameLogin.user_id],
            );
            expect(storedOtp.rows[0]?.otp).toBe(otp);

            // 4. Activation moves the account to ACTIVE and clears the OTP.
            const activated = await client.client!.query<{ activated: boolean }>(
                "SELECT STUDITOPIA.ACTIVE_ACCOUNT($1, $2) AS activated;",
                [usernameLogin.session_id, usernameLogin.user_id],
            );
            expect(activated.rows[0]?.activated).toBe(true);

            state = await accountState(client, usernameLogin.user_id);
            expect(state.status).toBe("ACTIVE");
            expect(state.otp).toBeNull();

            const clearedOtp = await client.client!.query<{ otp: number | null }>(
                "SELECT STUDITOPIA.GET_OTP($1, $2) AS otp;",
                [usernameLogin.session_id, usernameLogin.user_id],
            );
            expect(clearedOtp.rows[0]?.otp).toBeNull();

            // 5. Logout invalidates the session for every protected operation.
            const loggedOut = await client.client!.query<{ logout: boolean }>(
                "SELECT STUDITOPIA.LOGOUT($1, $2) AS logout;",
                [usernameLogin.session_id, usernameLogin.user_id],
            );
            expect(loggedOut.rows[0]?.logout).toBe(true);
            expect(
                await sessionValid(
                    client,
                    usernameLogin.session_id,
                    usernameLogin.user_id,
                ),
            ).toBe(false);

            await expectErrorCode(
                client.client!.query("SELECT STUDITOPIA.GET_EMAIL($1, $2);", [
                    usernameLogin.session_id,
                    usernameLogin.user_id,
                ]),
                "45005",
            );

            // 6. Login by email works and returns the now active account.
            const byEmail = await loginByEmail(client, account.email, account.password);
            const emailLogin = byEmail.rows[0]!;

            expect(emailLogin.user_id).toBe(registered.user_id);
            expect(emailLogin.status).toBe("ACTIVE");
            expect(emailLogin.session_id).not.toBe(usernameLogin.session_id);
            expect(
                await sessionValid(client, emailLogin.session_id, emailLogin.user_id),
            ).toBe(true);

            const emailAgain = await client.client!.query<{ email: string }>(
                "SELECT STUDITOPIA.GET_EMAIL($1, $2) AS email;",
                [emailLogin.session_id, emailLogin.user_id],
            );
            expect(emailAgain.rows[0]?.email).toBe(account.email);

            const otpAfterLogin = await client.client!.query<{ otp: number | null }>(
                "SELECT STUDITOPIA.GET_OTP($1, $2) AS otp;",
                [emailLogin.session_id, emailLogin.user_id],
            );
            expect(otpAfterLogin.rows[0]?.otp).toBeNull();

            // 7. The second session can also be logged out cleanly.
            const secondLogout = await client.client!.query<{ logout: boolean }>(
                "SELECT STUDITOPIA.LOGOUT($1, $2) AS logout;",
                [emailLogin.session_id, emailLogin.user_id],
            );
            expect(secondLogout.rows[0]?.logout).toBe(true);
            expect(
                await sessionValid(client, emailLogin.session_id, emailLogin.user_id),
            ).toBe(false);

            // 8. Registering the same identity again is rejected.
            await expectErrorCode(
                client.client!.query(
                    "SELECT * FROM STUDITOPIA.REGISTER($1, $2, $3, $4);",
                    [account.displayname, account.email, account.username, account.password],
                ),
                "47002",
            );
        },
    );
});
