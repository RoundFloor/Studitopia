import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import {
    createClient,
    expectErrorCode,
    registerAccount,
    resetDatabase,
    uniqueAccount,
} from "./helpers.js";

describe("ACTIVE_ACCOUNT", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(() => {
        client.dispose();
    });

    it("activates an inactive account and clears its otp", async () => {
        const account = await registerAccount(client, uniqueAccount("activevalid"));

        await client.client!.query("SELECT STUDITOPIA.SAVE_OTP($1, $2, $3);", [
            account.session_id,
            account.user_id,
            account.user_id + 100000,
        ]);

        const response = await client.client!.query<{ activated: boolean }>(
            "SELECT STUDITOPIA.ACTIVE_ACCOUNT($1, $2) AS activated;",
            [account.session_id, account.user_id],
        );

        expect(response.rows[0]?.activated).toBe(true);

        const row = await client.client!.query<{ status: string; otp: number | null }>(
            "SELECT STATUS, OTP FROM STUDITOPIA.ACCOUNT WHERE ID = $1;",
            [account.user_id],
        );

        expect(row.rows[0]?.status).toBe("ACTIVE");
        expect(row.rows[0]?.otp).toBeNull();
    });

    it("activates an account in the preinit state", async () => {
        const account = await registerAccount(client, uniqueAccount("activepreinit"));

        await client.client!.query(
            "UPDATE STUDITOPIA.ACCOUNT SET STATUS = 'PREINIT' WHERE ID = $1;",
            [account.user_id],
        );

        const response = await client.client!.query<{ activated: boolean }>(
            "SELECT STUDITOPIA.ACTIVE_ACCOUNT($1, $2) AS activated;",
            [account.session_id, account.user_id],
        );

        expect(response.rows[0]?.activated).toBe(true);
    });

    it("returns false when the account is already active", async () => {
        const account = await registerAccount(client, uniqueAccount("activeagain"));

        await client.client!.query("SELECT STUDITOPIA.ACTIVE_ACCOUNT($1, $2);", [
            account.session_id,
            account.user_id,
        ]);

        const response = await client.client!.query<{ activated: boolean }>(
            "SELECT STUDITOPIA.ACTIVE_ACCOUNT($1, $2) AS activated;",
            [account.session_id, account.user_id],
        );

        expect(response.rows[0]?.activated).toBe(false);
    });

    it("does not activate a suspended account", async () => {
        const account = await registerAccount(client, uniqueAccount("activesuspend"));

        await client.client!.query(
            "UPDATE STUDITOPIA.ACCOUNT SET STATUS = 'SUSPEND' WHERE ID = $1;",
            [account.user_id],
        );

        const response = await client.client!.query<{ activated: boolean }>(
            "SELECT STUDITOPIA.ACTIVE_ACCOUNT($1, $2) AS activated;",
            [account.session_id, account.user_id],
        );
        const row = await client.client!.query<{ status: string }>(
            "SELECT STATUS FROM STUDITOPIA.ACCOUNT WHERE ID = $1;",
            [account.user_id],
        );

        expect(response.rows[0]?.activated).toBe(false);
        expect(row.rows[0]?.status).toBe("SUSPEND");
    });

    it("rejects an invalid session", async () => {
        const account = await registerAccount(client, uniqueAccount("activeinvalid"));

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.ACTIVE_ACCOUNT($1, $2);", [
                99999999,
                account.user_id,
            ]),
            "45005",
        );
    });

    it("rejects a session owned by another user", async () => {
        const first = await registerAccount(client, uniqueAccount("activeowner1"));
        const second = await registerAccount(client, uniqueAccount("activeowner2"));

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.ACTIVE_ACCOUNT($1, $2);", [
                first.session_id,
                second.user_id,
            ]),
            "45005",
        );
    });
});
