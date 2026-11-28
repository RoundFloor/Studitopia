import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import { expectErrorCode, uniqueAccount } from "../authentication/helpers.js";
import {
    createCategory,
    createPostTestClient,
    createTag,
    createTestAccount,
    deleteTags,
    linkTags,
} from "../tag/helpers.js";

describe("post functions", () => {
    let client: PostgresClient;
    const tagIds: number[] = [];

    beforeAll(async () => {
        client = await createPostTestClient();
    });

    afterAll(async () => {
        await deleteTags(client, tagIds);
        client.dispose();
    });

    it("CREATE_POST creates the post and its root comment", async () => {
        const input = uniqueAccount("postcreate");
        const account = await createTestAccount(client, "postcreate");

        const created = await client.client!.query<{ create_post: number }>(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4) AS create_post;",
            ["Test post title", "Test post content", account, []],
        );
        const postId = created.rows[0]!.create_post;

        const post = await client.client!.query(
            "SELECT * FROM STUDITOPIA.POST WHERE ID = $1;",
            [postId],
        );
        const comments = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_COMMENT($1);",
            [postId],
        );

        expect(post.rows[0]).toMatchObject({
            id: postId,
            title: "Test post title",
            account_id: account,
        });
        expect(comments.rows).toHaveLength(1);
        expect(comments.rows[0]).toMatchObject({
            content: "Test post content",
            account_id: account,
        });

        const listed = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_POST($1, $2);",
            [[], []],
        );
        const listedPost = listed.rows.find((row: { id: number }) => row.id === postId);
        expect(listedPost).toMatchObject({
            id: postId,
            title: "Test post title",
            account_id: account,
            displayname: input.displayname,
            avatar_id: null,
            comment_id: comments.rows[0]?.id,
            true_response: null,
            tags: [],
        });
        expect(listedPost?.created_time).toBeInstanceOf(Date);
    });

    it("CREATE_POST with tags links the post to each tag once", async () => {
        const account = await createTestAccount(client, "posttags");
        const categoryId = await createCategory(client, "TEST_POST_CATEGORY");
        const first = await createTag(client, "Test Post Tag One", categoryId);
        const second = await createTag(client, "Test Post Tag Two", categoryId);
        tagIds.push(first, second);

        const created = await client.client!.query<{ create_post: number }>(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4) AS create_post;",
            ["Tagged post", "Tagged post content", account, [first, second, first]],
        );
        const postId = created.rows[0]!.create_post;

        const links = await client.client!.query(
            "SELECT TAG_ID FROM STUDITOPIA.INCLUDE_POST_TAG WHERE POST_ID = $1 ORDER BY TAG_ID;",
            [postId],
        );
        expect(links.rows.map((row: { tag_id: number }) => row.tag_id)).toEqual([
            first,
            second,
        ]);

        const counts = await client.client!.query(
            "SELECT ID, NUM_POST FROM STUDITOPIA.TAG WHERE ID = ANY($1) ORDER BY ID;",
            [[first, second]],
        );
        expect(counts.rows.map((row: { num_post: number }) => row.num_post)).toEqual([1, 1]);
    });

    it("GET_POST filters by all requested tags and returns every post when no tags are given", async () => {
        const account = await createTestAccount(client, "postfilter");
        const categoryId = await createCategory(client, "TEST_FILTER_CATEGORY");
        const first = await createTag(client, "Test Filter Tag One", categoryId);
        const second = await createTag(client, "Test Filter Tag Two", categoryId);
        tagIds.push(first, second);
        const both = await client.client!.query<{ create_post: number }>(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4) AS create_post;",
            ["Both tags", "content", account, [first, second]],
        );
        const onlyFirst = await client.client!.query<{ create_post: number }>(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4) AS create_post;",
            ["One tag", "content", account, [first]],
        );

        const bothTags = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_POST($1, $2);",
            [[first, second], []],
        );
        const noTags = await client.client!.query("SELECT * FROM STUDITOPIA.GET_POST($1, $2);", [
            [],
            [],
        ]);
        const missingTag = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_POST($1, $2);",
            [[999999], []],
        );

        expect(bothTags.rows.map((row: { id: number }) => row.id)).toEqual([
            both.rows[0]!.create_post,
        ]);
        expect(
            noTags.rows.map((row: { id: number }) => row.id),
        ).toContain(onlyFirst.rows[0]!.create_post);
        expect(missingTag.rows).toHaveLength(0);

        const excluded = await createTag(client, "Test Filter Excluded", categoryId);
        tagIds.push(excluded);
        const withExcluded = await client.client!.query<{ create_post: number }>(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4) AS create_post;",
            ["Both plus excluded", "content", account, [first, second, excluded]],
        );
        const withoutExcluded = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_POST($1, $2);",
            [
                [first, second],
                [excluded],
            ],
        );
        expect(withoutExcluded.rows.map((row: { id: number }) => row.id)).toEqual([
            both.rows[0]!.create_post,
        ]);
        expect(
            withoutExcluded.rows.some(
                (row: { id: number }) => row.id === withExcluded.rows[0]!.create_post,
            ),
        ).toBe(false);
    });

    it("GET_POST_BY_ID returns the post with its tag ids", async () => {
        const input = uniqueAccount("postbyid");
        const account = await createTestAccount(client, "postbyid");
        const avatar = await client.client!.query<{ id: number }>(
            "SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);",
            ["post-by-id.png", account],
        );
        const avatarId = avatar.rows[0]!.id;
        await client.client!.query("SELECT STUDITOPIA.SET_ACCOUNT_AVATAR($1, $2);", [
            account,
            avatarId,
        ]);
        const categoryId = await createCategory(client, "TEST_BY_ID_CATEGORY");
        const tagId = await createTag(client, "Test By Id Tag", categoryId);
        tagIds.push(tagId);
        const created = await client.client!.query<{ create_post: number }>(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4) AS create_post;",
            ["Post by id", "content", account, [tagId]],
        );

        const response = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_POST_BY_ID($1);",
            [created.rows[0]!.create_post],
        );

        expect(response.rows[0]).toMatchObject({
            id: created.rows[0]!.create_post,
            title: "Post by id",
            account_id: account,
            displayname: input.displayname,
            avatar_id: avatarId,
            tags: [tagId],
        });

        const listed = await client.client!.query("SELECT * FROM STUDITOPIA.GET_POST($1, $2);", [
            [tagId],
            [],
        ]);
        expect(listed.rows).toEqual(response.rows);
    });

    it("CREATE_COMMENT maintains the parent comment count and GET_COMMENT returns the whole thread", async () => {
        const account = await createTestAccount(client, "postcomments");
        const created = await client.client!.query<{ create_post: number }>(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4) AS create_post;",
            ["Thread post", "root content", account, []],
        );
        const postId = created.rows[0]!.create_post;
        const root = await client.client!.query<{ id: number }>(
            "SELECT COMMENT_ID AS id FROM STUDITOPIA.POST WHERE ID = $1;",
            [postId],
        );
        const rootId = root.rows[0]!.id;

        const reply = await client.client!.query<{ create_comment: number }>(
            "SELECT STUDITOPIA.CREATE_COMMENT($1, $2, $3) AS create_comment;",
            [rootId, "first reply", account],
        );
        const nested = await client.client!.query<{ create_comment: number }>(
            "SELECT STUDITOPIA.CREATE_COMMENT($1, $2, $3) AS create_comment;",
            [reply.rows[0]!.create_comment, "nested reply", account],
        );

        const comments = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_COMMENT($1);",
            [postId],
        );
        const children = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_COMMENT_OF_COMMENT($1);",
            [rootId],
        );
        const counts = await client.client!.query(
            "SELECT ID, COMMENT FROM STUDITOPIA.COMMENT WHERE ID = ANY($1) ORDER BY ID;",
            [[rootId, reply.rows[0]!.create_comment]],
        );

        expect(comments.rows.map((row: { id: number }) => row.id).sort()).toEqual(
            [rootId, reply.rows[0]!.create_comment, nested.rows[0]!.create_comment].sort(),
        );
        expect(children.rows.map((row: { id: number }) => row.id)).toEqual([
            reply.rows[0]!.create_comment,
        ]);
        expect(counts.rows.map((row: { comment: number }) => row.comment)).toEqual([1, 1]);

        const listed = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_POST($1, $2);",
            [[], []],
        );
        expect(listed.rows.find((row: { id: number }) => row.id === postId)).toMatchObject({
            comment_id: rootId,
            tags: [],
        });
    });

    it("VOTE_COMMENT keeps one vote per account and maintains vote counters", async () => {
        const account = await createTestAccount(client, "postvotes");
        const created = await client.client!.query<{ create_post: number }>(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4) AS create_post;",
            ["Vote post", "vote content", account, []],
        );
        const postId = created.rows[0]!.create_post;
        const root = await client.client!.query<{ id: number }>(
            "SELECT COMMENT_ID AS id FROM STUDITOPIA.POST WHERE ID = $1;",
            [postId],
        );
        const commentId = root.rows[0]!.id;

        await client.client!.query(
            "SELECT STUDITOPIA.VOTE_COMMENT($1, $2, $3);",
            [commentId, account, 0],
        );
        const afterUpvote = await client.client!.query(
            "SELECT UPVOTE, DOWNVOTE FROM STUDITOPIA.COMMENT WHERE ID = $1;",
            [commentId],
        );
        expect(afterUpvote.rows[0]).toMatchObject({ upvote: 1, downvote: 0 });

        await client.client!.query(
            "SELECT STUDITOPIA.VOTE_COMMENT($1, $2, $3);",
            [commentId, account, 1],
        );
        const afterDownvote = await client.client!.query(
            "SELECT UPVOTE, DOWNVOTE FROM STUDITOPIA.COMMENT WHERE ID = $1;",
            [commentId],
        );
        expect(afterDownvote.rows[0]).toMatchObject({ upvote: 0, downvote: 1 });

        await expectErrorCode(
            client.client!.query(
                "INSERT INTO STUDITOPIA.VOTE(COMMENT_ID, ACCOUNT_ID, TYPE) VALUES ($1, $2, $3);",
                [commentId, account, 0],
            ),
            "23505",
        );

        const removed = await client.client!.query<{ remove_vote: boolean }>(
            "SELECT STUDITOPIA.REMOVE_VOTE($1, $2) AS remove_vote;",
            [commentId, account],
        );
        const afterRemove = await client.client!.query(
            "SELECT UPVOTE, DOWNVOTE FROM STUDITOPIA.COMMENT WHERE ID = $1;",
            [commentId],
        );

        expect(removed.rows[0]?.remove_vote).toBe(true);
        expect(afterRemove.rows[0]).toMatchObject({ upvote: 0, downvote: 0 });
    });

    it("VOTE_COMMENT rejects an invalid vote type", async () => {
        const account = await createTestAccount(client, "postbadvote");
        const created = await client.client!.query<{ create_post: number }>(
            "SELECT STUDITOPIA.CREATE_POST($1, $2, $3, $4) AS create_post;",
            ["Bad vote post", "content", account, []],
        );
        const post = await client.client!.query<{ comment_id: number }>(
            "SELECT COMMENT_ID FROM STUDITOPIA.POST WHERE ID = $1;",
            [created.rows[0]!.create_post],
        );

        await expectErrorCode(
            client.client!.query(
                "SELECT STUDITOPIA.VOTE_COMMENT($1, $2, $3);",
                [post.rows[0]!.comment_id, account, 2],
            ),
            "23514",
        );
    });

    it("tag relation changes update NUM_TAG counters", async () => {
        const parentCategory = await createCategory(client, "TEST_COUNTER_PARENT_CAT");
        const childCategory = await createCategory(client, "TEST_COUNTER_CHILD_CAT");
        const parent = await createTag(client, "Test Counter Parent", parentCategory);
        const child = await createTag(client, "Test Counter Child", childCategory);
        tagIds.push(parent, child);

        await linkTags(client, parent, child);
        const afterInsert = await client.client!.query(
            "SELECT NUM_TAG FROM STUDITOPIA.TAG WHERE ID = $1;",
            [parent],
        );
        await client.client!.query(
            "DELETE FROM STUDITOPIA.TAG_CONTAIN WHERE TAG_ID_A = $1 AND TAG_ID_B = $2;",
            [parent, child],
        );
        const afterDelete = await client.client!.query(
            "SELECT NUM_TAG FROM STUDITOPIA.TAG WHERE ID = $1;",
            [parent],
        );

        expect(afterInsert.rows[0]?.num_tag).toBe(1);
        expect(afterDelete.rows[0]?.num_tag).toBe(0);
    });
});
