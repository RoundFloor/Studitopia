import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import {
    createClient,
    expectErrorCode,
    registerAccount,
    resetDatabase,
    uniqueAccount,
} from "./helpers.js";

describe("SESSION_CHECK", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(() => {
        client.dispose();
    });

    it("accepts an active session owned by the user", async () => {
        const { user_id, session_id } = await registerAccount(
            client,
            uniqueAccount("sessionvalid"),
        );

        const response = await client.client!.query<{ valid: boolean }>(
            "SELECT STUDITOPIA.SESSION_CHECK($1, $2) AS valid;",
            [session_id, user_id],
        );

        expect(response.rows[0]?.valid).toBe(true);
    });

    it("rejects a session that belongs to another user", async () => {
        const first = await registerAccount(client, uniqueAccount("sessionowner1"));
        const second = await registerAccount(client, uniqueAccount("sessionowner2"));

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.SESSION_CHECK($1, $2);", [
                first.session_id,
                second.user_id,
            ]),
            "45005",
        );
    });

    it("rejects an unknown session id", async () => {
        const { user_id } = await registerAccount(
            client,
            uniqueAccount("sessionunknown"),
        );

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.SESSION_CHECK($1, $2);", [
                99999999,
                user_id,
            ]),
            "45005",
        );
    });

    it("rejects an inactive session", async () => {
        const { user_id, session_id } = await registerAccount(
            client,
            uniqueAccount("sessioninactive"),
        );

        await client.client!.query("SELECT STUDITOPIA.LOGOUT($1, $2);", [
            session_id,
            user_id,
        ]);

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.SESSION_CHECK($1, $2);", [
                session_id,
                user_id,
            ]),
            "45005",
        );
    });

    it("rejects an expired session", async () => {
        const { user_id, session_id } = await registerAccount(
            client,
            uniqueAccount("sessionexpired"),
        );

        await client.client!.query(
            "UPDATE STUDITOPIA.SESSION SET EXPIRED_TIME = NOW() - INTERVAL '1 day' WHERE ID = $1;",
            [session_id],
        );

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.SESSION_CHECK($1, $2);", [
                session_id,
                user_id,
            ]),
            "45005",
        );
    });
});
