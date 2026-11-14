import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import {
    createClient,
    expectErrorCode,
    registerAccount,
    resetDatabase,
    uniqueAccount,
} from "./helpers.js";

describe("SAVE_OTP", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(() => {
        client.dispose();
    });

    it("stores the otp and returns true", async () => {
        const account = await registerAccount(client, uniqueAccount("saveotpvalid"));

        const response = await client.client!.query<{ saved: boolean }>(
            "SELECT STUDITOPIA.SAVE_OTP($1, $2, $3) AS saved;",
            [account.session_id, account.user_id, 123456],
        );
        const row = await client.client!.query<{ otp: number | null }>(
            "SELECT OTP FROM STUDITOPIA.ACCOUNT WHERE ID = $1;",
            [account.user_id],
        );

        expect(response.rows[0]?.saved).toBe(true);
        expect(row.rows[0]?.otp).toBe(123456);
    });

    it("overwrites an existing otp", async () => {
        const account = await registerAccount(client, uniqueAccount("saveotpoverwrite"));

        await client.client!.query("SELECT STUDITOPIA.SAVE_OTP($1, $2, $3);", [
            account.session_id,
            account.user_id,
            123456,
        ]);
        await client.client!.query("SELECT STUDITOPIA.SAVE_OTP($1, $2, $3);", [
            account.session_id,
            account.user_id,
            987654,
        ]);

        const row = await client.client!.query<{ otp: number | null }>(
            "SELECT OTP FROM STUDITOPIA.ACCOUNT WHERE ID = $1;",
            [account.user_id],
        );

        expect(row.rows[0]?.otp).toBe(987654);
    });

    it("rejects an invalid session without changing the otp", async () => {
        const account = await registerAccount(client, uniqueAccount("saveotpinvalid"));

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.SAVE_OTP($1, $2, $3);", [
                99999999,
                account.user_id,
                123456,
            ]),
            "45005",
        );

        const row = await client.client!.query<{ otp: number | null }>(
            "SELECT OTP FROM STUDITOPIA.ACCOUNT WHERE ID = $1;",
            [account.user_id],
        );

        expect(row.rows[0]?.otp).toBeNull();
    });

    it("rejects a session owned by another user", async () => {
        const first = await registerAccount(client, uniqueAccount("saveotpowner1"));
        const second = await registerAccount(client, uniqueAccount("saveotpowner2"));

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.SAVE_OTP($1, $2, $3);", [
                first.session_id,
                second.user_id,
                123456,
            ]),
            "45005",
        );
    });
});
