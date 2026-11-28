import { expect } from "vitest";
import { DatabaseError } from "pg";
import { PostgresClient } from "../../../scripts/sql.js";

export type AccountInput = {
    displayname: string;
    email: string;
    username: string;
    password: string;
};

export type RegisteredAccount = {
    user_id: number;
    session_id: number;
};

export type LoginResult = {
    session_id: number;
    user_id: number;
    role: string;
    status: string;
};

export async function createClient(): Promise<PostgresClient> {
    const client = new PostgresClient(true);
    await client.connect();
    if (!client.client) {
        throw new Error("Could not connect to PostgreSQL");
    }
    return client;
}

export async function resetDatabase(client: PostgresClient): Promise<void> {
    await client.client!.query("DELETE FROM STUDITOPIA.INCLUDE_POST_TAG;");
    await client.client!.query("DELETE FROM STUDITOPIA.VOTE;");
    await client.client!.query("DELETE FROM STUDITOPIA.POST;");
    await client.client!.query("DELETE FROM STUDITOPIA.COMMENT;");
    await client.client!.query("UPDATE STUDITOPIA.TAG SET ICON = NULL;");
    await client.client!.query("UPDATE STUDITOPIA.ACCOUNT SET AVATAR = NULL;");
    await client.client!.query("DELETE FROM STUDITOPIA.FILE;");
    await client.client!.query("DELETE FROM STUDITOPIA.SESSION;");
    await client.client!.query("DELETE FROM STUDITOPIA.ACCOUNT;");
}

export async function registerAccount(
    client: PostgresClient,
    input: AccountInput,
): Promise<RegisteredAccount> {
    const result = await client.client!.query<RegisteredAccount>(
        "SELECT * FROM STUDITOPIA.REGISTER($1, $2, $3, $4);",
        [input.displayname, input.email, input.username, input.password],
    );
    const account = result.rows[0];
    if (!account) {
        throw new Error(`Registration of ${input.username} returned no row`);
    }
    return account;
}

export function loginByUsername(
    client: PostgresClient,
    username: string,
    password: string,
) {
    return client.client!.query<LoginResult>(
        "SELECT * FROM STUDITOPIA.LOGIN_BY_USERNAME($1, $2);",
        [username, password],
    );
}

export function loginByEmail(
    client: PostgresClient,
    email: string,
    password: string,
) {
    return client.client!.query<LoginResult>(
        "SELECT * FROM STUDITOPIA.LOGIN_BY_EMAIL($1, $2);",
        [email, password],
    );
}

export async function captureError(
    action: Promise<unknown>,
): Promise<DatabaseError> {
    try {
        await action;
    } catch (error) {
        if (error instanceof DatabaseError) {
            return error;
        }
        throw error;
    }
    throw new Error("Expected a database error but the operation succeeded");
}

export async function expectErrorCode(
    action: Promise<unknown>,
    code: string,
): Promise<void> {
    const error = await captureError(action);
    expect(error.code, error.message).toBe(code);
}

export function uniqueAccount(
    suffix: string,
    overrides: Partial<AccountInput> = {},
): AccountInput {
    return {
        displayname: `Tester ${suffix}`,
        email: `tester.${suffix}@student.hcmus.edu.vn`,
        username: `tester.${suffix}`,
        password: "Secure@123456",
        ...overrides,
    };
}
