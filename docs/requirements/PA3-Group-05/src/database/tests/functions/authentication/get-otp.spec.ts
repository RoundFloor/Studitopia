import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import {
    createClient,
    expectErrorCode,
    registerAccount,
    resetDatabase,
    uniqueAccount,
} from "./helpers.js";

describe("GET_OTP", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(() => {
        client.dispose();
    });

    it("returns null when the account has no otp", async () => {
        const account = await registerAccount(client, uniqueAccount("getotpnone"));

        const response = await client.client!.query<{ otp: number | null }>(
            "SELECT STUDITOPIA.GET_OTP($1, $2) AS otp;",
            [account.session_id, account.user_id],
        );

        expect(response.rows[0]?.otp).toBeNull();
    });

    it("returns the stored otp", async () => {
        const account = await registerAccount(client, uniqueAccount("getotpstored"));

        await client.client!.query("SELECT STUDITOPIA.SAVE_OTP($1, $2, $3);", [
            account.session_id,
            account.user_id,
            654321,
        ]);

        const response = await client.client!.query<{ otp: number | null }>(
            "SELECT STUDITOPIA.GET_OTP($1, $2) AS otp;",
            [account.session_id, account.user_id],
        );

        expect(response.rows[0]?.otp).toBe(654321);
    });

    it("returns the latest otp after it is overwritten", async () => {
        const account = await registerAccount(client, uniqueAccount("getotpoverwrite"));

        await client.client!.query("SELECT STUDITOPIA.SAVE_OTP($1, $2, $3);", [
            account.session_id,
            account.user_id,
            111111,
        ]);
        await client.client!.query("SELECT STUDITOPIA.SAVE_OTP($1, $2, $3);", [
            account.session_id,
            account.user_id,
            222222,
        ]);

        const response = await client.client!.query<{ otp: number | null }>(
            "SELECT STUDITOPIA.GET_OTP($1, $2) AS otp;",
            [account.session_id, account.user_id],
        );

        expect(response.rows[0]?.otp).toBe(222222);
    });

    it("returns null after the otp is removed", async () => {
        const account = await registerAccount(client, uniqueAccount("getotpremoved"));

        await client.client!.query("SELECT STUDITOPIA.SAVE_OTP($1, $2, $3);", [
            account.session_id,
            account.user_id,
            333333,
        ]);
        await client.client!.query("SELECT STUDITOPIA.REMOVE_OTP($1, $2);", [
            account.session_id,
            account.user_id,
        ]);

        const response = await client.client!.query<{ otp: number | null }>(
            "SELECT STUDITOPIA.GET_OTP($1, $2) AS otp;",
            [account.session_id, account.user_id],
        );

        expect(response.rows[0]?.otp).toBeNull();
    });

    it("returns null after the account is activated", async () => {
        const account = await registerAccount(client, uniqueAccount("getotpactive"));

        await client.client!.query("SELECT STUDITOPIA.SAVE_OTP($1, $2, $3);", [
            account.session_id,
            account.user_id,
            444444,
        ]);
        await client.client!.query("SELECT STUDITOPIA.ACTIVE_ACCOUNT($1, $2);", [
            account.session_id,
            account.user_id,
        ]);

        const response = await client.client!.query<{ otp: number | null }>(
            "SELECT STUDITOPIA.GET_OTP($1, $2) AS otp;",
            [account.session_id, account.user_id],
        );

        expect(response.rows[0]?.otp).toBeNull();
    });

    it("rejects an invalid session", async () => {
        const account = await registerAccount(client, uniqueAccount("getotpinvalid"));

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.GET_OTP($1, $2);", [
                99999999,
                account.user_id,
            ]),
            "45005",
        );
    });

    it("rejects a session owned by another user", async () => {
        const first = await registerAccount(client, uniqueAccount("getotpowner1"));
        const second = await registerAccount(client, uniqueAccount("getotpowner2"));

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.GET_OTP($1, $2);", [
                first.session_id,
                second.user_id,
            ]),
            "45005",
        );
    });
});
