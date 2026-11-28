import { PostgresClient } from "../../../scripts/sql.js";
import { resetDatabase, uniqueAccount } from "../authentication/helpers.js";

export type TagRow = {
    id: number;
    name: string;
    num_tag: number;
    num_post: number;
    category: string;
    created_time: Date;
};

export async function createPostTestClient(): Promise<PostgresClient> {
    const client = new PostgresClient(true);
    await client.connect();
    if (!client.client) {
        throw new Error("Could not connect to PostgreSQL");
    }
    await resetDatabase(client);
    return client;
}

export async function createTestAccount(
    client: PostgresClient,
    suffix: string,
): Promise<number> {
    const input = uniqueAccount(suffix);
    const result = await client.client!.query<{ id: number }>(
        `INSERT INTO STUDITOPIA.ACCOUNT(DISPLAYNAME, EMAIL, USERNAME, PASSWORD, DOMAIN_ID)
         SELECT $1, $2::STUDITOPIA.TYPE_EMAIL, $3::STUDITOPIA.TYPE_USERNAME, 'x', D.ID
         FROM STUDITOPIA.DOMAIN D
         WHERE D.DOMAIN = SPLIT_PART($2, '@', 2)::STUDITOPIA.CITEXT
         RETURNING ID;`,
        [input.displayname, input.email, input.username],
    );
    return result.rows[0]!.id;
}

export async function createCategory(
    client: PostgresClient,
    name: string,
    description: string = `Description for ${name}`,
): Promise<number> {
    const result = await client.client!.query<{ id: number }>(
        "INSERT INTO STUDITOPIA.CATEGORY(NAME, DESCRIPTION) VALUES ($1, $2) RETURNING ID;",
        [name, description],
    );
    return result.rows[0]!.id;
}

export async function ensureCategory(
    client: PostgresClient,
    name: string,
    description: string = `Description for ${name}`,
): Promise<number> {
    const result = await client.client!.query<{ id: number }>(
        `WITH existing AS (
            SELECT ID FROM STUDITOPIA.CATEGORY WHERE NAME = $1::STUDITOPIA.CITEXT
        ), inserted AS (
            INSERT INTO STUDITOPIA.CATEGORY(NAME, DESCRIPTION)
            SELECT $1::STUDITOPIA.CITEXT, $2
            WHERE NOT EXISTS (SELECT 1 FROM existing)
            RETURNING ID
        )
        SELECT ID FROM existing
        UNION ALL
        SELECT ID FROM inserted;`,
        [name, description],
    );
    return result.rows[0]!.id;
}

export async function createTag(
    client: PostgresClient,
    name: string,
    categoryId: number,
    description: string = `Description for ${name}`,
): Promise<number> {
    const result = await client.client!.query<{ id: number }>(
        `INSERT INTO STUDITOPIA.TAG(NAME, CATEGORY_ID, DESCRIPTION)
         VALUES ($1, $2, $3) RETURNING ID;`,
        [name, categoryId, description],
    );
    return result.rows[0]!.id;
}

export async function linkTags(
    client: PostgresClient,
    parentId: number,
    childId: number,
): Promise<void> {
    await client.client!.query(
        "INSERT INTO STUDITOPIA.TAG_CONTAIN(TAG_ID_A, TAG_ID_B) VALUES ($1, $2);",
        [parentId, childId],
    );
}

export async function deleteTags(client: PostgresClient, ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    await client.client!.query(
        "DELETE FROM STUDITOPIA.INCLUDE_POST_TAG WHERE TAG_ID = ANY($1);",
        [ids],
    );
    await client.client!.query(
        "DELETE FROM STUDITOPIA.RELATED_EMAIL_TAG WHERE TAG_ID = ANY($1);",
        [ids],
    );
    await client.client!.query(
        "DELETE FROM STUDITOPIA.TAG_CONTAIN WHERE TAG_ID_A = ANY($1) OR TAG_ID_B = ANY($1);",
        [ids],
    );
    await client.client!.query("DELETE FROM STUDITOPIA.TAG WHERE ID = ANY($1);", [ids]);
}
