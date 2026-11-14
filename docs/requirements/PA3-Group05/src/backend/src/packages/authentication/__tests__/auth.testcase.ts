import { RESPONSE_CODE } from "../../../common/response-code/code.config.js";

export const displayname_test = [
    {displayname: "", result: false},
    {displayname: "a", result: false},
    {displayname: "ab", result: false},
    {displayname: "abc", result: false},
    {displayname: "abcd", result: false},
    {displayname: "abcde", result: false},
    {displayname: "abcdef", result: false},
    {displayname: "abcdefg", result: false},
    {displayname: "abcdefgh", result: true},
    {displayname: "abcdef3gh9", result: true },
    {displayname: "aBcddegh", result: true},
    {displayname: "abcd efgh", result: true},
    {displayname: "abcdefghabcdefghabcdefghabcdefgh", result: true},
    {displayname: "abcdefghabcdefghabcdefghabcdefghs", result: false},
    {displayname: "ab@cd efgh", result: false},
    {displayname: "ab|cd efgh", result: false},
    {displayname: "ab%cd efgh", result: false},
    {displayname: "ab#cd efgh", result: false},
    {displayname: "ab!cd efgh", result: false},
    {displayname: "ab`cd efgh", result: false},
    {displayname: "ab?cd efgh", result: false},
    {displayname: "ab\"cd efgh", result: false},
    {displayname: "ab}cd efgh", result: false},
    {displayname: "abcd eáfgh", result: false},
    {displayname: "          ", result: false},
    {displayname: "    sdafsdf      ", result: false},
    {displayname: "    sdafsdf", result: false},
    {displayname: "sdafsdf      ", result: false}
]

export function generateRandomDisplayName(): string {
    const length = Math.random() * 40 + 5
    if (Math.random() > 0.8)
        return Array.from({ length })
            .map(() => String.fromCharCode(Math.random() * 96 + 32))
            .join('');
    
    return Array.from({ length })
            .map(() => String.fromCharCode((Math.random() > 0.8)?32:Math.random() * 26 + 97))
            .join('');
}

export const username_test = [
    {username: "", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "a", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "ab", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "abc", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "abcd", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "abcde", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "abcdef", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "abcdefg", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "abcd efgh", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "abcdefgh", result: RESPONSE_CODE.SUCCESS},
    {username: "ab.cde.fgh", result: RESPONSE_CODE.SUCCESS},
    {username: "abc.defg.h", result: RESPONSE_CODE.SUCCESS},
    {username: "abcdefgfd.aah", result: RESPONSE_CODE.SUCCESS},
    {username: "a.bcdefg.h", result: RESPONSE_CODE.SUCCESS},
    {username: "abcdefghabcdefghabcdefghabcdefgh", result: RESPONSE_CODE.SUCCESS},
    {username: "abcdefghabcdefghabcdefghabcdefghs", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "ab.cdefgh", result: RESPONSE_CODE.SUCCESS},
    {username: "ab.cdef.gh", result: RESPONSE_CODE.SUCCESS},
    {username: "ab cdefgh", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "ab@cdefgh", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "ab|cdefgh", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "ab%cdefgh", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "ab#cdefgh", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "ab!cdefgh", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "ab`cdefgh", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "ab?cdefgh", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "ab\"cd efgh", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "ab}cd efgh", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "abcd eáfgh", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "          ", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "    sdafsdf      ", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "    sdafsdf", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "sdafsdf      ", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "abcdeAgh", result: RESPONSE_CODE.INVALID_USERNAME},
    {username: "abcdefghBDs", result: RESPONSE_CODE.INVALID_USERNAME}
]
export function generateRandomUsername(): string {
    const length = Math.random() * 40 + 5
    if (Math.random() > 0.8)
        return Array.from({ length })
            .map(() => String.fromCharCode(Math.random() * 96 + 32))
            .join('');
    
    return Array.from({ length })
        .map(() => (Math.random() > 0.9)
            ? String.fromCharCode(Math.random() * 26 + 65)
            : (Math.random() > 0.8)
                ? '.'
                : String.fromCharCode(Math.random() * 26 + 97))
        .join('');
}

export const password_test = [
  { password: "Abcdef1!", result: true },
  { password: "Hello123@", result: true },
  { password: "Secure9#Pass", result: true },
  { password: "MyPass8$word", result: true },
  { password: "Test1234%A", result: true },
  { password: "BlueSky7!x", result: true },
  { password: "Data2026@Lab", result: true },
  { password: "Strong5&Key", result: true },
  { password: "Code123!Ab", result: true },
  { password: "Green4#Tree", result: true },
  { password: "Python8@Dev", result: true },
  { password: "Cloud9$Net", result: true },
  { password: "Alpha1!Beta", result: true },
  { password: "Magic7%Word", result: true },
  { password: "Light3&Moon", result: true },
  { password: "Fast2*Track", result: true },
  { password: "Happy6+Days", result: true },
  { password: "Smart4=Mind", result: true },
  { password: "Ocean5?Wave", result: true },
  { password: "Brave8^Heart", result: true },
  { password: "Winter2!Snow", result: true },
  { password: "Silver9@Fox", result: true },
  { password: "Golden3#Bird", result: true },
  { password: "Digital7$World", result: true },
  { password: "Future5%Tech", result: true },
  { password: "Orange4&Fruit", result: true },
  { password: "Rocket6*Star", result: true },
  { password: "Market8+Trend", result: true },
  { password: "Shadow1=Night", result: true },
  { password: "Crystal9?Lake", result: true },
  { password: "Ab1!xyz", result: false },
  { password: "ABCDEFG1!", result: false },
  { password: "abcdefg1!", result: false },
  { password: "Abcdefgh!", result: false },
  { password: "Abcdefg1", result: false },
  { password: "", result: false },
  {
    password: "Ab1!" + "a".repeat(61),
    result: false,
  },
  { password: "Abcdef1!\0", result: false },
];

export function generateRandomPassword(): string {
    const length = Math.random() * 40 + 5    
    return Array.from({ length })
        .map(() => (String.fromCharCode(Math.random() * 128)))
        .join('');
}
