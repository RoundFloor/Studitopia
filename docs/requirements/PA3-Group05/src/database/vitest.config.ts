import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["tests/**/*.spec.ts"],
        exclude: ["node_modules/**", "dist/**"],
        fileParallelism: false,
        testTimeout: 20000,
        hookTimeout: 30000,
    },
});
