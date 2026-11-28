import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import { createClient, expectErrorCode, resetDatabase } from "./helpers.js";
import { createTag, deleteTags, ensureCategory } from "../tag/helpers.js";

describe("GET_ACCOUNT_BY_ID", () => {
    let client: PostgresClient;
    const tagIds: number[] = [];
    const domainIds: number[] = [];

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(async () => {
        await resetDatabase(client);
        await deleteTags(client, tagIds);
        if (domainIds.length > 0) {
            await client.client!.query("DELETE FROM STUDITOPIA.DOMAIN WHERE ID = ANY($1);", [
                domainIds,
            ]);
        }
        client.dispose();
    });

    const makeDomain = async (suffix: string) => {
        const result = await client.client!.query<{ id: number }>(
            "INSERT INTO STUDITOPIA.DOMAIN(DOMAIN) VALUES ($1) RETURNING ID;",
            [`accounttags${suffix}.test.edu`],
        );
        const id = result.rows[0]!.id;
        domainIds.push(id);
        return id;
    };

    const makeAccount = async (domainId: number, suffix: string) => {
        const result = await client.client!.query<{ id: number }>(
            `INSERT INTO STUDITOPIA.ACCOUNT(DISPLAYNAME, EMAIL, USERNAME, PASSWORD, DOMAIN_ID)
             VALUES ($1, $2::STUDITOPIA.TYPE_EMAIL, $3::STUDITOPIA.TYPE_USERNAME, 'x', $4)
             RETURNING ID;`,
            [`Tester ${suffix}`, `tester.${suffix}@accounttags${suffix}.test.edu`, `tester.${suffix}`, domainId],
        );
        return result.rows[0]!.id;
    };

    const linkTag = async (category: string, name: string, domainId: number) => {
        const categoryId = await ensureCategory(client, category);
        const tagId = await createTag(client, name, categoryId);
        tagIds.push(tagId);
        await client.client!.query(
            "INSERT INTO STUDITOPIA.RELATED_EMAIL_TAG(TAG_ID, DOMAIN_ID) VALUES ($1, $2);",
            [tagId, domainId],
        );
        return tagId;
    };

    it("returns one flattened name and id for university, faculty, and major", async () => {
        const suffix = Date.now().toString(36);
        const domainId = await makeDomain(suffix);
        const account = await makeAccount(domainId, suffix);
        const university = await linkTag("UNIVERSITY", `Test University ${suffix}`, domainId);
        const faculty = await linkTag("FACULTY", `Test Faculty ${suffix}`, domainId);
        const major = await linkTag("MAJOR", `Test Major ${suffix}`, domainId);

        const response = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_ACCOUNT_BY_ID($1);",
            [account],
        );

        expect(response.rows[0]).toMatchObject({
            university_name: `Test University ${suffix}`,
            university_id: university,
            faculty_name: `Test Faculty ${suffix}`,
            faculty_id: faculty,
            major_name: `Test Major ${suffix}`,
            major_id: major,
        });
    });

    it("rejects a second university tag for the same email domain", async () => {
        const suffix = Date.now().toString(36);
        const domainId = await makeDomain(suffix);
        await linkTag("UNIVERSITY", `Only University ${suffix}`, domainId);
        const categoryId = await ensureCategory(client, "UNIVERSITY");
        const duplicate = await createTag(client, `Duplicate University ${suffix}`, categoryId);
        tagIds.push(duplicate);

        await expectErrorCode(
            client.client!.query(
                "INSERT INTO STUDITOPIA.RELATED_EMAIL_TAG(TAG_ID, DOMAIN_ID) VALUES ($1, $2);",
                [duplicate, domainId],
            ),
            "23505",
        );
    });
});
