import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import {
    createClient,
    expectErrorCode,
    registerAccount,
    resetDatabase,
    uniqueAccount,
} from "./helpers.js";

describe("REMOVE_OTP", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(() => {
        client.dispose();
    });

    it("removes a stored otp and returns true", async () => {
        const account = await registerAccount(client, uniqueAccount("removeotpvalid"));

        await client.client!.query("SELECT STUDITOPIA.SAVE_OTP($1, $2, $3);", [
            account.session_id,
            account.user_id,
            123456,
        ]);

        const response = await client.client!.query<{ removed: boolean }>(
            "SELECT STUDITOPIA.REMOVE_OTP($1, $2) AS removed;",
            [account.session_id, account.user_id],
        );
        const row = await client.client!.query<{ otp: number | null }>(
            "SELECT OTP FROM STUDITOPIA.ACCOUNT WHERE ID = $1;",
            [account.user_id],
        );

        expect(response.rows[0]?.removed).toBe(true);
        expect(row.rows[0]?.otp).toBeNull();
    });

    it("returns true when the otp is already empty", async () => {
        const account = await registerAccount(client, uniqueAccount("removeotpempty"));

        const response = await client.client!.query<{ removed: boolean }>(
            "SELECT STUDITOPIA.REMOVE_OTP($1, $2) AS removed;",
            [account.session_id, account.user_id],
        );

        expect(response.rows[0]?.removed).toBe(true);
    });

    it("rejects an invalid session", async () => {
        const account = await registerAccount(client, uniqueAccount("removeotpinvalid"));

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.REMOVE_OTP($1, $2);", [
                99999999,
                account.user_id,
            ]),
            "45005",
        );
    });

    it("rejects a session owned by another user", async () => {
        const first = await registerAccount(client, uniqueAccount("removeotpowner1"));
        const second = await registerAccount(client, uniqueAccount("removeotpowner2"));

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.REMOVE_OTP($1, $2);", [
                first.session_id,
                second.user_id,
            ]),
            "45005",
        );
    });

    it("does not remove another user's otp", async () => {
        const first = await registerAccount(client, uniqueAccount("removeotpother1"));
        const second = await registerAccount(client, uniqueAccount("removeotpother2"));

        await client.client!.query("SELECT STUDITOPIA.SAVE_OTP($1, $2, $3);", [
            first.session_id,
            first.user_id,
            111111,
        ]);
        await client.client!.query("SELECT STUDITOPIA.SAVE_OTP($1, $2, $3);", [
            second.session_id,
            second.user_id,
            222222,
        ]);

        await client.client!.query("SELECT STUDITOPIA.REMOVE_OTP($1, $2);", [
            first.session_id,
            first.user_id,
        ]);

        const row = await client.client!.query<{ otp: number | null }>(
            "SELECT OTP FROM STUDITOPIA.ACCOUNT WHERE ID = $1;",
            [second.user_id],
        );

        expect(row.rows[0]?.otp).toBe(222222);
    });
});
