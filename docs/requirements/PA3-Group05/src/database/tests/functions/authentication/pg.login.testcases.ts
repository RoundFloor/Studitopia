export type LoginTestcase = {
    description: string;
    method: "username" | "email";
    credential:
        | "username"
        | "email"
        | "uppercase-username"
        | "uppercase-email"
        | "unknown-username"
        | "unknown-email";
    password: "correct" | "wrong";
    result: "ok" | "45007";
};

export const loginTestcases: LoginTestcase[] = [
    {
        description: "login by username",
        method: "username",
        credential: "username",
        password: "correct",
        result: "ok",
    },
    {
        description: "login by email",
        method: "email",
        credential: "email",
        password: "correct",
        result: "ok",
    },
    {
        description: "username is case insensitive",
        method: "username",
        credential: "uppercase-username",
        password: "correct",
        result: "ok",
    },
    {
        description: "email is case insensitive",
        method: "email",
        credential: "uppercase-email",
        password: "correct",
        result: "ok",
    },
    {
        description: "wrong password with username",
        method: "username",
        credential: "username",
        password: "wrong",
        result: "45007",
    },
    {
        description: "wrong password with email",
        method: "email",
        credential: "email",
        password: "wrong",
        result: "45007",
    },
    {
        description: "unknown username",
        method: "username",
        credential: "unknown-username",
        password: "correct",
        result: "45007",
    },
    {
        description: "unknown email",
        method: "email",
        credential: "unknown-email",
        password: "correct",
        result: "45007",
    },
];
