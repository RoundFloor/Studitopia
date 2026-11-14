const tests = new Map<string, boolean>([
    ["012345678910", true ],
    ["10987654321", false],
])
export const testcases = [...tests.keys()]

export const reCaptchaMock = {
    validate: vi.fn((token: string) => {
        return tests.get(token) ?? false;
    })
}