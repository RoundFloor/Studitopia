import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
    captureError,
    createClient,
    expectErrorCode,
    registerAccount,
    resetDatabase,
    uniqueAccount,
} from "./helpers.js";
import { PostgresClient } from "../../../scripts/sql.js";
import { usernameValidationTestcases } from "./pg.username-validation.testcases.js";

describe("USERNAME_VALIDATION", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(() => {
        client.dispose();
    });

    it.each(usernameValidationTestcases)(
        "$description: $username",
        async ({ username, result }) => {
            const action = client.client!.query<{ valid: boolean }>(
                "SELECT STUDITOPIA.USERNAME_VALIDATION($1) AS valid;",
                [username],
            );

            if (result === true) {
                const response = await action;
                expect(response.rows[0]?.valid).toBe(true);
            } else {
                await expectErrorCode(action, result);
            }
        },
    );

    it("rejects a username that is already registered", async () => {
        const account = uniqueAccount("duplicate");
        await registerAccount(client, account);

        const error = await captureError(
            client.client!.query("SELECT STUDITOPIA.USERNAME_VALIDATION($1);", [
                account.username,
            ]),
        );

        expect(error.code, error.message).toBe("47002");
    });
});
