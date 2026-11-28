import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import {
    createClient,
    expectErrorCode,
    registerAccount,
    resetDatabase,
    uniqueAccount,
} from "./helpers.js";

describe("LOGOUT", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(() => {
        client.dispose();
    });

    it("marks the session as inactive and expired", async () => {
        const account = await registerAccount(client, uniqueAccount("logoutvalid"));

        const response = await client.client!.query<{ logout: boolean }>(
            "SELECT STUDITOPIA.LOGOUT($1, $2) AS logout;",
            [account.session_id, account.user_id],
        );

        expect(response.rows[0]?.logout).toBe(true);

        const session = await client.client!.query<{
            status: string;
            expired: boolean;
        }>(
            "SELECT STATUS, EXPIRED_TIME <= NOW() AS expired FROM STUDITOPIA.SESSION WHERE ID = $1;",
            [account.session_id],
        );

        expect(session.rows[0]?.status).toBe("INACTIVE");
        expect(session.rows[0]?.expired).toBe(true);
    });

    it("rejects a session that does not exist", async () => {
        const { user_id } = await registerAccount(
            client,
            uniqueAccount("logoutunknown"),
        );

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.LOGOUT($1, $2);", [
                99999999,
                user_id,
            ]),
            "45005",
        );
    });

    it("rejects a session owned by another user", async () => {
        const first = await registerAccount(client, uniqueAccount("logoutowner1"));
        const second = await registerAccount(client, uniqueAccount("logoutowner2"));

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.LOGOUT($1, $2);", [
                first.session_id,
                second.user_id,
            ]),
            "45005",
        );
    });

    it("rejects logging out twice", async () => {
        const account = await registerAccount(client, uniqueAccount("logouttwice"));

        await client.client!.query("SELECT STUDITOPIA.LOGOUT($1, $2);", [
            account.session_id,
            account.user_id,
        ]);

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.LOGOUT($1, $2);", [
                account.session_id,
                account.user_id,
            ]),
            "45005",
        );
    });

    it("does not affect another user's session", async () => {
        const first = await registerAccount(client, uniqueAccount("logoutother1"));
        const second = await registerAccount(client, uniqueAccount("logoutother2"));

        await client.client!.query("SELECT STUDITOPIA.LOGOUT($1, $2);", [
            first.session_id,
            first.user_id,
        ]);

        const valid = await client.client!.query<{ valid: boolean }>(
            "SELECT STUDITOPIA.SESSION_CHECK($1, $2) AS valid;",
            [second.session_id, second.user_id],
        );

        expect(valid.rows[0]?.valid).toBe(true);
    });
});
