import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import {
    createClient,
    expectErrorCode,
    registerAccount,
    resetDatabase,
    uniqueAccount,
} from "./helpers.js";

describe("REGISTER_SESSION", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(() => {
        client.dispose();
    });

    it("creates a new active session for an account", async () => {
        const account = await registerAccount(client, uniqueAccount("registersession"));

        const response = await client.client!.query<{ id: number }>(
            "SELECT STUDITOPIA.REGISTER_SESSION($1) AS id;",
            [account.user_id],
        );
        const sessionId = response.rows[0]?.id;

        expect(sessionId).toBeTypeOf("number");
        expect(sessionId).not.toBe(account.session_id);

        const session = await client.client!.query<{
            owner_id: number;
            status: string;
            expired_time: Date;
        }>(
            "SELECT OWNER_ID, STATUS, EXPIRED_TIME FROM STUDITOPIA.SESSION WHERE ID = $1;",
            [sessionId],
        );

        expect(session.rows[0]?.owner_id).toBe(account.user_id);
        expect(session.rows[0]?.status).toBe("ACTIVE");
        expect(session.rows[0]!.expired_time.getTime()).toBeGreaterThan(Date.now());
    });

    it("allows multiple active sessions for the same account", async () => {
        const account = await registerAccount(
            client,
            uniqueAccount("registersessionmultiple"),
        );

        const response = await client.client!.query<{ id: number }>(
            "SELECT STUDITOPIA.REGISTER_SESSION($1) AS id;",
            [account.user_id],
        );

        const oldSession = await client.client!.query<{ status: string }>(
            "SELECT STATUS FROM STUDITOPIA.SESSION WHERE ID = $1;",
            [account.session_id],
        );

        expect(response.rows[0]?.id).not.toBe(account.session_id);
        expect(oldSession.rows[0]?.status).toBe("ACTIVE");
    });

    it("rejects an account id that does not exist", async () => {
        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.REGISTER_SESSION($1);", [
                99999999,
            ]),
            "23503",
        );
    });
});
