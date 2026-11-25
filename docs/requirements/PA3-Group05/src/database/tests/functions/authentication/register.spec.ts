import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { DatabaseError } from "pg";
import { PostgresClient } from "../../../scripts/sql.js";
import { register_testcase } from "./pg.register.testcases.js";
import { createClient, resetDatabase } from "./helpers.js";

describe("REGISTER", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(() => {
        client.dispose();
    });

    it.each(register_testcase)(
        "[$displayname, $email, $password, $username]",
        async ({ displayname, email, password, result, username }) => {
            try {
                const response = await client.client!.query(
                    "SELECT * FROM STUDITOPIA.REGISTER($1, $2, $3, $4);",
                    [displayname, email, username, password],
                );

                expect(result, "expected registration to fail").toEqual([]);
                expect(response.rowCount).toBe(1);
            } catch (error) {
                if (!(error instanceof DatabaseError)) {
                    throw error;
                }

                expect(result, error.message).toContain(error.code!);
            }
        },
    );
});
