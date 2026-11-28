import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PostgresClient } from "../../../scripts/sql.js";
import { expectErrorCode } from "../authentication/helpers.js";
import {
    createCategory,
    createPostTestClient,
    createTag,
    createTestAccount,
    deleteTags,
    ensureCategory,
    linkTags,
} from "./helpers.js";

describe("tag functions", () => {
    let client: PostgresClient;
    const tagIds: number[] = [];
    let domainId: number;

    beforeAll(async () => {
        client = await createPostTestClient();
    });

    afterAll(async () => {
        await deleteTags(client, tagIds);
        if (domainId) {
            await client.client!.query("DELETE FROM STUDITOPIA.DOMAIN WHERE ID = $1;", [
                domainId,
            ]);
        }
        client.dispose();
    });

    it("GET_TAG returns only tags of the requested category and is case-insensitive", async () => {
        const categoryA = await createCategory(client, "TEST_CATEGORY_A");
        const categoryB = await createCategory(client, "TEST_CATEGORY_B");
        const tagA = await createTag(client, "test tag a", categoryA);
        const tagB = await createTag(client, "test tag b", categoryB);
        tagIds.push(tagA, tagB);

        const response = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_TAG($1);",
            ["test_category_a"],
        );

        expect(response.rows.map((row: { id: number }) => row.id)).toEqual([tagA]);
        expect(response.rows[0]?.name).toBe("test tag a");
        expect(response.rows[0]?.description).toBe("Description for test tag a");
    });

    it("GET_TAG_BY_ID returns the tag with its category name", async () => {
        const categoryId = await createCategory(client, "TEST_CATEGORY_BY_ID");
        const tagId = await createTag(client, "test tag by id", categoryId);
        tagIds.push(tagId);

        const response = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_TAG_BY_ID($1);",
            [tagId],
        );

        expect(response.rows[0]).toMatchObject({
            id: tagId,
            name: "test tag by id",
            category: "TEST_CATEGORY_BY_ID",
            description: "Description for test tag by id",
            num_tag: 0,
            num_post: 0,
        });
    });

    it("GET_TAG_BY_NAME matches names case-insensitively", async () => {
        const categoryId = await createCategory(client, "TEST_CATEGORY_BY_NAME");
        const tagId = await createTag(client, "Test Tag Lookup", categoryId);
        tagIds.push(tagId);

        const response = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_TAG_BY_NAME($1);",
            ["test tag lookup"],
        );

        expect(response.rows.map((row: { id: number }) => row.id)).toEqual([tagId]);
        expect(response.rows[0]?.description).toBe("Description for Test Tag Lookup");
    });

    it("CREATE_TAG creates a tag in the given category", async () => {
        const categoryName = `TEST_CATEGORY_CREATE_${Date.now()}`;
        const categoryId = await createCategory(client, categoryName);

        const created = await client.client!.query<{ create_tag: number }>(
            "SELECT STUDITOPIA.CREATE_TAG($1, $2, $3) AS create_tag;",
            ["Test Created Tag", categoryName.toLowerCase(), "Created tag description"],
        );
        const tagId = created.rows[0]!.create_tag;
        tagIds.push(tagId);

        const response = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_TAG_BY_ID($1);",
            [tagId],
        );
        expect(response.rows[0]).toMatchObject({
            id: tagId,
            name: "Test Created Tag",
            description: "Created tag description",
            category: categoryName,
        });
        expect(categoryId).toBeGreaterThan(0);
    });

    it("CREATE_TAG rejects a missing category", async () => {
        await expectErrorCode(
            client.client!.query(
                "SELECT STUDITOPIA.CREATE_TAG($1, $2, $3);",
                ["Test Orphan Tag", "TEST_MISSING_CATEGORY", "Orphan description"],
            ),
            "23503",
        );
    });

    it("GET_AREA and GET_SUBJECT return children of the given tag in their category", async () => {
        const universityCategory = await ensureCategory(client, "UNIVERSITY");
        const areaCategory = await ensureCategory(client, "AREA");
        const subjectCategory = await ensureCategory(client, "SUBJECT");
        const university = await createTag(client, "Test University", universityCategory);
        const area = await createTag(client, "Test Area", areaCategory);
        const subject = await createTag(client, "Test Subject", subjectCategory);
        tagIds.push(university, area, subject);
        await linkTags(client, university, area);
        await linkTags(client, area, subject);

        const areas = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_AREA($1);",
            [university],
        );
        const subjects = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_SUBJECT($1);",
            [area],
        );

        expect(areas.rows.map((row: { id: number }) => row.id)).toEqual([area]);
        expect(areas.rows[0]?.description).toBe("Description for Test Area");
        expect(subjects.rows.map((row: { id: number }) => row.id)).toEqual([subject]);
        expect(subjects.rows[0]?.description).toBe("Description for Test Subject");
    });

    it("GET_TAG_BY_EMAIL resolves tags through the email domain", async () => {
        const domain = await client.client!.query<{ id: number }>(
            "INSERT INTO STUDITOPIA.DOMAIN(DOMAIN) VALUES ($1) RETURNING ID;",
            ["student.tagfixture.example.edu"],
        );
        domainId = domain.rows[0]!.id;
        const categoryId = await createCategory(client, "TEST_EMAIL_CATEGORY");
        const tagId = await createTag(client, "Test Email University", categoryId);
        tagIds.push(tagId);
        await client.client!.query(
            "INSERT INTO STUDITOPIA.RELATED_EMAIL_TAG(TAG_ID, DOMAIN_ID) VALUES ($1, $2);",
            [tagId, domainId],
        );

        const response = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_TAG_BY_EMAIL($1);",
            ["Someone@Student.TagFixture.Example.Edu"],
        );

        expect(response.rows.map((row: { id: number }) => row.id)).toEqual([tagId]);
    });

    it("SET_TAG_ICON stores an icon that tag GET functions expose", async () => {
        const account = await createTestAccount(client, "tagiconowner");
        const created = await client.client!.query<{ id: number }>(
            "SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);",
            ["icon.png", account],
        );
        const fileId = created.rows[0]!.id;
        const categoryId = await createCategory(client, "TEST_TAG_ICON_CATEGORY");
        const tagId = await createTag(client, "Test Tag Icon", categoryId);
        tagIds.push(tagId);

        const set = await client.client!.query<{ set_tag_icon: boolean }>(
            "SELECT STUDITOPIA.SET_TAG_ICON($1, $2) AS set_tag_icon;",
            [tagId, fileId],
        );
        expect(set.rows[0]?.set_tag_icon).toBe(true);

        const byId = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_TAG_BY_ID($1);",
            [tagId],
        );
        const byName = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_TAG_BY_NAME($1);",
            ["Test Tag Icon"],
        );
        const byCategory = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_TAG($1);",
            ["TEST_TAG_ICON_CATEGORY"],
        );

        expect(byId.rows[0]).toMatchObject({ id: tagId, icon: fileId });
        expect(byName.rows[0]).toMatchObject({ id: tagId, icon: fileId });
        expect(byCategory.rows[0]).toMatchObject({ id: tagId, icon: fileId });

        const cleared = await client.client!.query<{ set_tag_icon: boolean }>(
            "SELECT STUDITOPIA.SET_TAG_ICON($1, NULL) AS set_tag_icon;",
            [tagId],
        );
        expect(cleared.rows[0]?.set_tag_icon).toBe(true);

        const afterClear = await client.client!.query(
            "SELECT * FROM STUDITOPIA.GET_TAG_BY_ID($1);",
            [tagId],
        );
        expect(afterClear.rows[0]).toMatchObject({ icon: null });
    });

    it("SET_TAG_ICON rejects an unknown file and an unknown tag", async () => {
        await expectErrorCode(
            client.client!.query("SELECT STUDITOPIA.SET_TAG_ICON($1, $2);", [999999, 999999]),
            "23503",
        );

        const account = await createTestAccount(client, "tagiconunknown");
        const created = await client.client!.query<{ id: number }>(
            "SELECT * FROM STUDITOPIA.CREATE_FILE($1, $2);",
            ["orphan-icon.png", account],
        );
        const response = await client.client!.query<{ set_tag_icon: boolean }>(
            "SELECT STUDITOPIA.SET_TAG_ICON($1, $2) AS set_tag_icon;",
            [999999, created.rows[0]!.id],
        );
        expect(response.rows[0]?.set_tag_icon).toBe(false);
    });
});
