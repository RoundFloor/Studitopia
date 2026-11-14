import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import {
    createClient,
    expectErrorCode,
    loginByEmail,
    loginByUsername,
    registerAccount,
    resetDatabase,
    uniqueAccount,
    type AccountInput,
    type LoginResult,
} from "./helpers.js";
import { loginTestcases } from "./pg.login.testcases.js";

function credentialFor(
    testcase: (typeof loginTestcases)[number],
    account: AccountInput,
    index: number,
): string {
    switch (testcase.credential) {
        case "username":
            return account.username;
        case "email":
            return account.email;
        case "uppercase-username":
            return account.username.toUpperCase();
        case "uppercase-email":
            return account.email.toUpperCase();
        case "unknown-username":
            return `unknown.user${index}`;
        case "unknown-email":
            return `unknown.user${index}@student.hcmus.edu.vn`;
    }
}

describe("LOGIN", () => {
    let client: PostgresClient;
    let sequence = 0;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(() => {
        client.dispose();
    });

    it.each(loginTestcases)("$description", async (testcase) => {
        const index = sequence++;
        const account = uniqueAccount(`login${index}`);
        const registered = await registerAccount(client, account);

        const identifier = credentialFor(testcase, account, index);
        const password =
            testcase.password === "correct" ? account.password : "Wrong@123456";
        const action =
            testcase.method === "username"
                ? loginByUsername(client, identifier, password)
                : loginByEmail(client, identifier, password);

        if (testcase.result === "45007") {
            await expectErrorCode(action, testcase.result);
            return;
        }

        const response = await action;
        const login = response.rows[0] as LoginResult | undefined;

        expect(login).toBeDefined();
        expect(login!.user_id).toBe(registered.user_id);
        expect(login!.role).toBe("STUDENT");
        expect(login!.status).toBe("INACTIVE");
        expect(login!.session_id).toBeTypeOf("number");

        const valid = await client.client!.query<{ valid: boolean }>(
            "SELECT STUDITOPIA.SESSION_CHECK($1, $2) AS valid;",
            [login!.session_id, login!.user_id],
        );
        expect(valid.rows[0]?.valid).toBe(true);
    });

    it("keeps the session created during registration active", async () => {
        const account = uniqueAccount("loginmultiple");
        const registered = await registerAccount(client, account);

        const response = await loginByUsername(
            client,
            account.username,
            account.password,
        );
        const login = response.rows[0]!;

        const oldSession = await client.client!.query<{ status: string }>(
            "SELECT STATUS FROM STUDITOPIA.SESSION WHERE ID = $1;",
            [registered.session_id],
        );

        expect(login.session_id).not.toBe(registered.session_id);
        expect(oldSession.rows[0]?.status).toBe("ACTIVE");
    });

    it("does not create a session when credentials are invalid", async () => {
        const account = uniqueAccount("loginno");
        const registered = await registerAccount(client, account);

        const before = await client.client!.query<{ count: string }>(
            "SELECT COUNT(*) AS count FROM STUDITOPIA.SESSION WHERE OWNER_ID = $1;",
            [registered.user_id],
        );

        await expectErrorCode(
            loginByUsername(client, account.username, "Wrong@123456"),
            "45007",
        );

        const after = await client.client!.query<{ count: string }>(
            "SELECT COUNT(*) AS count FROM STUDITOPIA.SESSION WHERE OWNER_ID = $1;",
            [registered.user_id],
        );

        expect(after.rows[0]?.count).toBe(before.rows[0]?.count);
    });
});
