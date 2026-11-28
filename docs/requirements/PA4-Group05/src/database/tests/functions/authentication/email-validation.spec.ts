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
import { emailValidationTestcases } from "./pg.email-validation.testcases.js";

describe("EMAIL_VALIDATION", () => {
    let client: PostgresClient;

    beforeAll(async () => {
        client = await createClient();
        await resetDatabase(client);
    });

    afterAll(() => {
        client.dispose();
    });

    it.each(emailValidationTestcases)(
        "$description: $email",
        async ({ email, result }) => {
            const action = client.client!.query<{ valid: boolean }>(
                "SELECT STUDITOPIA.EMAIL_VALIDATION($1) AS valid;",
                [email],
            );

            if (result === true) {
                const response = await action;
                expect(response.rows[0]?.valid).toBe(true);
            } else {
                await expectErrorCode(action, result);
            }
        },
    );

    it("rejects an email that is already registered", async () => {
        const account = uniqueAccount("emailduplicate");
        await registerAccount(client, account);

        const error = await captureError(
            client.client!.query("SELECT STUDITOPIA.EMAIL_VALIDATION($1);", [
                account.email,
            ]),
        );

        expect(error.code, error.message).toBe("47001");
    });

    it("rejects a registered email regardless of casing", async () => {
        const account = uniqueAccount("emailcasing");
        await registerAccount(client, account);

        const error = await captureError(
            client.client!.query("SELECT STUDITOPIA.EMAIL_VALIDATION($1);", [
                account.email.toUpperCase(),
            ]),
        );

        expect(error.code, error.message).toBe("47001");
    });
});
