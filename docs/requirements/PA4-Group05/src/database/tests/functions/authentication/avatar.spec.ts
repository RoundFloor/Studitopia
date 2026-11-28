import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import { createTestAccount } from "../tag/helpers.js";
import { createClient, expectErrorCode, resetDatabase, uniqueAccount } from "./helpers.js";

describe("account avatar functions", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(async () => {
        await resetDatabase(client);
        client.dispose();
    });

    it("SET_ACCOUNT_AVATAR stores an owned file and GET_ACCOUNT_BY_ID returns it", async () => {
        const input = uniqueAccount("avatarowner");
        const account = await createTestAccount(client, "avatarowner");
        const created = await client.client!.query<{ id: number; src: string }>(
            "SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);",
            ["avatar.png", account],
        );
        const fileId = created.rows[0]!.id;

        const before = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_ACCOUNT_BY_ID($1);",
            [account],
        );
        expect(before.rows[0]).toMatchObject({
            username: input.username,
            avatar: null,
        });

        const set = await client.client!.query<{ set_account_avatar: boolean }>(
            "SELECT STUDITOPIA.SET_ACCOUNT_AVATAR($1, $2) AS set_account_avatar;",
            [account, fileId],
        );
        expect(set.rows[0]?.set_account_avatar).toBe(true);

        const after = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_ACCOUNT_BY_ID($1);",
            [account],
        );
        expect(after.rows[0]).toMatchObject({
            username: input.username,
            avatar: fileId,
        });
    });

    it("SET_ACCOUNT_AVATAR clears the avatar with NULL", async () => {
        const account = await createTestAccount(client, "avatarcclear");
        const created = await client.client!.query<{ id: number }>(
            "SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);",
            ["clear.png", account],
        );
        const fileId = created.rows[0]!.id;

        await client.client!.query("SELECT STUDITOPIA.SET_ACCOUNT_AVATAR($1, $2);", [
            account,
            fileId,
        ]);
        const cleared = await client.client!.query<{ set_account_avatar: boolean }>(
            "SELECT STUDITOPIA.SET_ACCOUNT_AVATAR($1, NULL) AS set_account_avatar;",
            [account],
        );

        expect(cleared.rows[0]?.set_account_avatar).toBe(true);
        const after = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_ACCOUNT_BY_ID($1);",
            [account],
        );
        expect(after.rows[0]).toMatchObject({ avatar: null });
    });

    it("SET_ACCOUNT_AVATAR rejects a file owned by another account", async () => {
        const owner = await createTestAccount(client, "avatarnotowner");
        const other = await createTestAccount(client, "avatarfileowner");
        const created = await client.client!.query<{ id: number }>(
            "SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);",
            ["foreign.png", other],
        );
        const fileId = created.rows[0]!.id;

        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.SET_ACCOUNT_AVATAR($1, $2);", [
                owner,
                fileId,
            ]),
            "23503",
        );
    });

    it("SET_ACCOUNT_AVATAR returns false for an unknown account", async () => {
        const response = await client.client!.query<{ set_account_avatar: boolean }>(
            "SELECT STUDITOPIA.SET_ACCOUNT_AVATAR($1, NULL) AS set_account_avatar;",
            [999999],
        );

        expect(response.rows[0]?.set_account_avatar).toBe(false);
    });
});
