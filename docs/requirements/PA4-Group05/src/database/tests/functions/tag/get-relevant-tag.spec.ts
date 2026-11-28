import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import { resetDatabase } from "../authentication/helpers.js";
import {
    createCategory,
    createPostTestClient,
    createTag,
    createTestAccount,
    deleteTags,
} from "./helpers.js";

describe("GET_RELEVANT_TAG", () => {
    let client: PostgresClient;
    const tagIds: number[] = [];

    beforeAll(async () => {
        client = await createPostTestClient();
    });

    afterAll(async () => {
        await deleteTags(client, tagIds);
        await resetDatabase(client);
        client.dispose();
    });

    it("returns every tag on posts carrying all input tags, with post counts", async () => {
        const account = await createTestAccount(client, `relevant.${Date.now()}`);
        const suffix = Date.now();
        const categoryId = await createCategory(client, `TEST_RELEVANT_CATEGORY_${suffix}`);
        const tagA = await createTag(client, `Relevant A ${suffix}`, categoryId);
        const tagB = await createTag(client, `Relevant B ${suffix}`, categoryId);
        const tagC = await createTag(client, `Relevant C ${suffix}`, categoryId);
        const tagD = await createTag(client, `Relevant D ${suffix}`, categoryId);
        tagIds.push(tagA, tagB, tagC, tagD);

        await client.client!.query(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4);",
            ["both plus c", "content", account, [tagA, tagB, tagC]],
        );
        await client.client!.query(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4);",
            ["both only", "content", account, [tagA, tagB]],
        );
        await client.client!.query(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4);",
            ["a and c", "content", account, [tagA, tagC]],
        );
        await client.client!.query(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4);",
            ["b only", "content", account, [tagB]],
        );

        const response = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_RELEVANT_TAG($1);",
            [[tagA, tagB]],
        );

        expect(response.rows).toHaveLength(3);
        expect(response.rows).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: tagA, num_post: 2 }),
                expect.objectContaining({ id: tagB, num_post: 2 }),
                expect.objectContaining({ id: tagC, num_post: 1 }),
            ]),
        );
        expect(response.rows.some((row: { id: number }) => row.id === tagD)).toBe(false);
    });
});
