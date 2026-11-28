import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import { expectErrorCode, resetDatabase } from "../authentication/helpers.js";
import { createTestAccount } from "../tag/helpers.js";

describe("file functions", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = new PostgresClient(true);
        await client.connect();
        if (!client.client) {
            throw new Error("Could not connect to PostgreSQL");
        }
        await resetDatabase(client);
    });

    afterAll(async () => {
        await resetDatabase(client);
        client.dispose();
    });

    it("CREATE_FILE returns the generated id and account-based src", async () => {
        const account = await createTestAccount(client, "filecreate");
        const created = await client.client!.query<{ id: number; src: string }>(
            "SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);",
            ["avatar.png", account],
        );
        const fileId = created.rows[0]!.id;
        const generatedSrc = created.rows[0]!.src;

        expect(generatedSrc).toBe(`${account}/${fileId}`);

        const response = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_FILE_BY_ID($1);",
            [fileId],
        );

        expect(response.rows[0]).toMatchObject({
            id: fileId,
            name: "avatar.png",
            src: generatedSrc,
            account_id: account,
        });
        expect(response.rows[0]?.created_time).toBeInstanceOf(Date);
        expect(response.rows[0]?.updated_time).toBeInstanceOf(Date);
    });

    it("GET_FILE_BY_ACCOUNT returns only files owned by the account with unique sources", async () => {
        const owner = await createTestAccount(client, "fileowner");
        const other = await createTestAccount(client, "fileother");
        await client.client!.query("SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);", [
            "mine.txt",
            owner,
        ]);
        await client.client!.query("SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);", [
            "second.txt",
            owner,
        ]);
        await client.client!.query("SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);", [
            "theirs.txt",
            other,
        ]);

        const response = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_FILE_BY_ACCOUNT($1);",
            [owner],
        );

        expect(response.rows.map((row: { name: string }) => row.name)).toEqual([
            "mine.txt",
            "second.txt",
        ]);
        expect(new Set(response.rows.map((row: { src: string }) => row.src)).size).toBe(2);
    });

    it("UPDATE_FILE changes the name for its owner and refreshes UPDATED_TIME", async () => {
        const account = await createTestAccount(client, "fileupdate");
        const created = await client.client!.query<{ id: number; src: string }>(
            "SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);",
            ["old.txt", account],
        );
        const fileId = created.rows[0]!.id;
        const generatedSrc = created.rows[0]!.src;
        const before = await client.client!.query<{ updated_time: Date }>(
            "SELECT UPDATED_TIME FROM STUDITOPIA.FILE WHERE ID = $1;",
            [fileId],
        );

        await client.client!.query("SELECT pg_sleep(0.01);");
        const updated = await client.client!.query<{ update_file: boolean }>(
            "SELECT STUDITOPIA.UPDATE_FILE($1, $2, $3) AS update_file;",
            [fileId, account, "new.txt"],
        );

        const after = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_FILE_BY_ID($1);",
            [fileId],
        );
        expect(updated.rows[0]?.update_file).toBe(true);
        expect(after.rows[0]).toMatchObject({
            name: "new.txt",
            src: generatedSrc,
        });
        expect(after.rows[0]?.updated_time.getTime()).toBeGreaterThan(
            before.rows[0]!.updated_time.getTime(),
        );
    });

    it("UPDATE_FILE refuses a caller who does not own the file", async () => {
        const owner = await createTestAccount(client, "fileupdateowner");
        const other = await createTestAccount(client, "fileupdateother");
        const created = await client.client!.query<{ id: number }>(
            "SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);",
            ["private.txt", owner],
        );
        const fileId = created.rows[0]!.id;

        const updated = await client.client!.query<{ update_file: boolean }>(
            "SELECT STUDITOPIA.UPDATE_FILE($1, $2, $3) AS update_file;",
            [fileId, other, "hacked.txt"],
        );

        expect(updated.rows[0]?.update_file).toBe(false);
        const after = await client.client!.query(
            "SELECT NAME FROM STUDITOPIA.FILE WHERE ID = $1;",
            [fileId],
        );
        expect(after.rows[0]?.name).toBe("private.txt");
    });

    it("DELETE_FILE removes only files owned by the caller", async () => {
        const owner = await createTestAccount(client, "filedeleteowner");
        const other = await createTestAccount(client, "filedeleteother");
        const created = await client.client!.query<{ id: number }>(
            "SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);",
            ["remove.txt", owner],
        );
        const fileId = created.rows[0]!.id;

        const refused = await client.client!.query<{ delete_file: boolean }>(
            "SELECT STUDITOPIA.DELETE_FILE($1, $2) AS delete_file;",
            [fileId, other],
        );
        const deleted = await client.client!.query<{ delete_file: boolean }>(
            "SELECT STUDITOPIA.DELETE_FILE($1, $2) AS delete_file;",
            [fileId, owner],
        );

        expect(refused.rows[0]?.delete_file).toBe(false);
        expect(deleted.rows[0]?.delete_file).toBe(true);
        const after = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_FILE_BY_ID($1);",
            [fileId],
        );
        expect(after.rows).toHaveLength(0);
    });

    it("CREATE_FILE rejects blank names and unknown accounts", async () => {
        const account = await createTestAccount(client, "fileinvalid");

        await expectErrorCode(
            client.client!.query("SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);", ["   ", account]),
            "22023",
        );
        await expectErrorCode(
            client.client!.query("SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);", [
                "orphan.pdf",
                999999,
            ]),
            "23503",
        );
    });
});
