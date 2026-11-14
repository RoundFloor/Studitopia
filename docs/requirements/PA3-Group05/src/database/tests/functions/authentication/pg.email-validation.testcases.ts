export type EmailValidationTestcase = {
    description: string;
    email: string;
    result: true | string;
};

export const emailValidationTestcases: EmailValidationTestcase[] = [
    // Valid emails on registered domains
    {
        description: "student hcmus domain",
        email: "student.ab@student.hcmus.edu.vn",
        result: true,
    },
    {
        description: "apcs domain",
        email: "nguyen.van.a@apcs.fitus.edu.vn",
        result: true,
    },
    {
        description: "plus addressing",
        email: "student.ab+test@student.hcmus.edu.vn",
        result: true,
    },
    {
        description: "hyphen in local part",
        email: "student-ab@hcmut.edu.vn",
        result: true,
    },

    // Invalid formats
    { description: "missing at", email: "email.test", result: "45002" },
    { description: "missing domain", email: "email.test@", result: "45002" },
    {
        description: "multiple at",
        email: "email.test@@student.hcmus.edu.vn",
        result: "45002",
    },
    { description: "incomplete domain", email: "email.test@student", result: "45002" },
    {
        description: "leading domain dot",
        email: "email.test@.student.hcmus.edu.vn",
        result: "45002",
    },
    {
        description: "consecutive domain dots",
        email: "email.test@student..hcmus.edu.vn",
        result: "45002",
    },
    {
        description: "trailing domain dot",
        email: "email.test@student.hcmus.edu.vn.",
        result: "45002",
    },
    {
        description: "space in domain",
        email: "email.test@ student.hcmus.edu.vn",
        result: "45002",
    },
    {
        description: "space before at",
        email: "email.test @student.hcmus.edu.vn",
        result: "45002",
    },
    {
        description: "trailing space",
        email: "email.test@student.hcmus.edu.vn ",
        result: "45002",
    },
    { description: "missing local part", email: "@student.hcmus.edu.vn", result: "45002" },
    { description: "too short", email: "a@b.co", result: "45002" },
    { description: "empty", email: "", result: "45002" },

    // Registered format but unknown domain
    { description: "gmail", email: "external.one@gmail.com", result: "46001" },
    { description: "yahoo", email: "external.two@yahoo.com", result: "46001" },
    { description: "parent hcmus domain", email: "external.three@hcmus.edu.vn", result: "46001" },
    { description: "parent uit domain", email: "external.four@uit.edu.vn", result: "46001" },
    { description: "parent uel domain", email: "external.five@uel.edu.vn", result: "46001" },
];
