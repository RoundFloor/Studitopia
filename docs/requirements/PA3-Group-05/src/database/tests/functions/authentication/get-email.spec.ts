import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import {
    createClient,
    expectErrorCode,
    registerAccount,
    resetDatabase,
    uniqueAccount,
} from "./helpers.js";

describe("GET_EMAIL", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(() => {
        client.dispose();
    });

    it("returns the email of the session owner", async () => {
        const account = uniqueAccount("getemailsession");
        const registered = await registerAccount(client, account);

        const response = await client.client!.query<{ email: string }>(
            "SELECT STUDITOPIA.GET_EMAIL($1, $2) AS email;",
            [registered.session_id, registered.user_id],
        );

        expect(response.rows[0]?.email).toBe(account.email);
    });

    it("returns the email for a session created by login", async () => {
        const account = uniqueAccount("getemaillogin");
        const registered = await registerAccount(client, account);

        const login = await client.client!.query<{ session_id: number }>(
            "SELECT * FROM STUDITOPIA.LOGIN_BY_USERNAME($1, $2);",
            [account.username, account.password],
        );

        const response = await client.client!.query<{ email: string }>(
            "SELECT STUDITOPIA.GET_EMAIL($1, $2) AS email;",
            [login.rows[0]!.session_id, registered.user_id],
        );

        expect(response.rows[0]?.email).toBe(account.email);
    });

    it("rejects an unknown session", async () => {
        const { user_id } = await registerAccount(
            client,
            uniqueAccount("getemailunknown"),
        );

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.GET_EMAIL($1, $2);", [
                99999999,
                user_id,
            ]),
            "45005",
        );
    });

    it("rejects a session owned by another user", async () => {
        const first = await registerAccount(client, uniqueAccount("getemailowner1"));
        const second = await registerAccount(client, uniqueAccount("getemailowner2"));

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.GET_EMAIL($1, $2);", [
                first.session_id,
                second.user_id,
            ]),
            "45005",
        );
    });

    it("rejects a session after logout", async () => {
        const account = await registerAccount(client, uniqueAccount("getemaillogout"));

        await client.client!.query("SELECT STUDITOPIA.LOGOUT($1, $2);", [
            account.session_id,
            account.user_id,
        ]);

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.GET_EMAIL($1, $2);", [
                account.session_id,
                account.user_id,
            ]),
            "45005",
        );
    });
});
