export type UsernameValidationTestcase = {
    description: string;
    username: string;
    result: true | string;
};

export const usernameValidationTestcases: UsernameValidationTestcase[] = [
    // Valid usernames
    { description: "simple dotted username", username: "student.ab", result: true },
    { description: "multi part username", username: "nguyen.van.a", result: true },
    { description: "digits after first character", username: "student123", result: true },
    { description: "minimum length", username: "a2345678", result: true },
    { description: "maximum length", username: "a".repeat(31) + "1", result: true },

    // Invalid format
    { description: "too short", username: "student", result: "45003" },
    { description: "very short", username: "abc", result: "45003" },
    { description: "uppercase", username: "Student.ab", result: "45003" },
    { description: "underscore", username: "student_ab", result: "45003" },
    { description: "hyphen", username: "student-ab", result: "45003" },
    { description: "leading dot", username: ".studentab", result: "45003" },
    { description: "trailing dot", username: "studentab.", result: "45003" },
    { description: "consecutive dots", username: "student..ab", result: "45003" },
    { description: "digits only", username: "12345678", result: "45003" },
    { description: "too long", username: "abcdefghijklmnopqrstuvwxyzabcdefg", result: "45003" },
    { description: "empty", username: "", result: "45003" },
    { description: "space", username: "student ab", result: "45003" },
    { description: "special character", username: "student!ab", result: "45003" },
];
