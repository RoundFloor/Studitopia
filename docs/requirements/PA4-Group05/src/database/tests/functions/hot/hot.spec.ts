import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import { resetDatabase } from "../authentication/helpers.js";
import {
    createCategory,
    createPostTestClient,
    createTag,
    createTestAccount,
    deleteTags,
} from "../tag/helpers.js";

describe("HOT triggers", () => {
    let client: PostgresClient;
    const tagIds: number[] = [];

    beforeAll(async () => {
        client = await createPostTestClient();
    });

    afterAll(async () => {
        await resetDatabase(client);
        await deleteTags(client, tagIds);
        client.dispose();
    });

    it("propagates comment hot through post to tags", async () => {
        const suffix = Date.now();
        const account = await createTestAccount(client, `hot.${suffix}`);
        const categoryId = await createCategory(client, `HOT_CATEGORY_${suffix}`);
        const tagA = await createTag(client, `Hot Tag A ${suffix}`, categoryId);
        const tagB = await createTag(client, `Hot Tag B ${suffix}`, categoryId);
        tagIds.push(tagA, tagB);

        const hotOfComment = async (id: number) =>
            (
                await client.client!.query<{ hot: number }>(
                    "SELECT HOT FROM STUDITOPIA.COMMENT WHERE ID = $1;",
                    [id],
                )
            ).rows[0]!.hot;
        const hotOfPost = async (id: number) =>
            (
                await client.client!.query<{ hot: number }>(
                    "SELECT HOT FROM STUDITOPIA.POST WHERE ID = $1;",
                    [id],
                )
            ).rows[0]!.hot;
        const hotOfTag = async (id: number) =>
            (
                await client.client!.query<{ hot: number }>(
                    "SELECT HOT FROM STUDITOPIA.TAG WHERE ID = $1;",
                    [id],
                )
            ).rows[0]!.hot;

        const created = await client.client!.query<{ create_post: number }>(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4) AS create_post;",
            ["Hot post", "root content", account, [tagA, tagB]],
        );
        const postId = created.rows[0]!.create_post;
        const root = await client.client!.query<{ comment_id: number }>(
            "SELECT COMMENT_ID FROM STUDITOPIA.POST WHERE ID = $1;",
            [postId],
        );
        const rootId = root.rows[0]!.comment_id;

        expect(await hotOfComment(rootId)).toBe(0);
        expect(await hotOfPost(postId)).toBe(0);
        expect(await hotOfTag(tagA)).toBe(0);

        await client.client!.query("SELECT STUDITOPIA.VOTE_COMMENT($1, $2, 0);", [
            rootId,
            account,
        ]);
        expect(await hotOfComment(rootId)).toBe(1);
        expect(await hotOfPost(postId)).toBe(1);
        expect(await hotOfTag(tagA)).toBe(1);
        expect(await hotOfTag(tagB)).toBe(1);

        const childCreated = await client.client!.query<{ create_comment: number }>(
            "SELECT STUDITOPIA.CREATE_COMMENT($1, $2, $3) AS create_comment;",
            [rootId, "child content", account],
        );
        const childId = childCreated.rows[0]!.create_comment;
        expect(await hotOfComment(childId)).toBe(0);
        expect(await hotOfComment(rootId)).toBe(3);
        expect(await hotOfPost(postId)).toBe(3);
        expect(await hotOfTag(tagA)).toBe(3);

        await client.client!.query("SELECT STUDITOPIA.VOTE_COMMENT($1, $2, 0);", [
            childId,
            account,
        ]);
        expect(await hotOfComment(childId)).toBe(1);
        expect(await hotOfComment(rootId)).toBe(4);
        expect(await hotOfPost(postId)).toBe(4);

        const grandchildCreated = await client.client!.query<{ create_comment: number }>(
            "SELECT STUDITOPIA.CREATE_COMMENT($1, $2, $3) AS create_comment;",
            [childId, "grandchild content", account],
        );
        const grandchildId = grandchildCreated.rows[0]!.create_comment;
        expect(await hotOfComment(grandchildId)).toBe(0);
        expect(await hotOfComment(childId)).toBe(3);
        expect(await hotOfComment(rootId)).toBe(6);
        expect(await hotOfPost(postId)).toBe(6);
        expect(await hotOfTag(tagA)).toBe(6);

        const secondAccount = await createTestAccount(client, `hot2.${suffix}`);
        await client.client!.query("SELECT STUDITOPIA.VOTE_COMMENT($1, $2, 1);", [
            rootId,
            secondAccount,
        ]);
        expect(await hotOfComment(rootId)).toBe(7);
        expect(await hotOfPost(postId)).toBe(7);
        expect(await hotOfTag(tagA)).toBe(7);

        await client.client!.query(
            "DELETE FROM STUDITOPIA.INCLUDE_POST_TAG WHERE POST_ID = $1 AND TAG_ID = $2;",
            [postId, tagB],
        );
        expect(await hotOfTag(tagA)).toBe(7);
        expect(await hotOfTag(tagB)).toBe(0);
    });
});
