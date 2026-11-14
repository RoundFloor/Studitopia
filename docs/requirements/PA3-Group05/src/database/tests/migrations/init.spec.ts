import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const init = readFileSync(
    new URL("../../src/schemas/init.sql", import.meta.url),
    "utf8",
);
const reverse = readFileSync(
    new URL("../../src/schemas/_init.sql", import.meta.url),
    "utf8",
);

describe("schema init", () => {
    it("creates the STUDITOPIA schema", () => {
        expect(init).toContain("CREATE SCHEMA STUDITOPIA");
    });

    it("installs citext and pgcrypto inside the STUDITOPIA schema", () => {
        expect(init).toContain("CREATE EXTENSION IF NOT EXISTS citext SCHEMA STUDITOPIA");
        expect(init).toContain("CREATE EXTENSION IF NOT EXISTS pgcrypto SCHEMA STUDITOPIA");
    });

    it("can be reversed by dropping the schema", () => {
        expect(reverse).toContain("DROP SCHEMA IF EXISTS STUDITOPIA CASCADE");
    });
});
