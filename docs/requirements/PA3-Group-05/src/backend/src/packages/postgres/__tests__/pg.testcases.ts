import { RESPONSE_CODE, ResponseCode } from "../../../common/response-code/code.config.js";

export const email_testcase: { email: string; result: ResponseCode }[] = [
  { email: "student@student.hcmus.edu.vn", result: RESPONSE_CODE.SUCCESS },
  { email: "nguyenvana@student.hcmus.edu.vn", result: RESPONSE_CODE.SUCCESS },
  { email: "an.nguyen@student.hcmus.edu.vn", result: RESPONSE_CODE.SUCCESS },
  { email: "nguyen.van.a@student.hcmus.edu.vn", result: RESPONSE_CODE.SUCCESS },
  { email: "pham.van.b@student.hcmus.edu.vn", result: RESPONSE_CODE.SUCCESS },
  { email: "do.van.c@student.hcmus.edu.vn", result: RESPONSE_CODE.SUCCESS },
  { email: "le.van.d@student.hcmus.edu.vn", result: RESPONSE_CODE.SUCCESS },
  { email: "sv123456@student.hcmus.edu.vn", result: RESPONSE_CODE.SUCCESS },
  { email: "student@hcmus.edu.vn", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN },
  { email: "nguyenvana@hcmus.edu.vn", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN},
  { email: "student@st.hcmuaf.edu.vn", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN },
  { email: "student@vnuhcm.edu.vn", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN },
  { email: "student@uit.edu.vn", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN },
  { email: "student@fit.hcmus.edu.vn", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN },
  { email: "nguyenvanastudent.hcmus.edu.vn", result: RESPONSE_CODE.INVALID_EMAIL },
  { email: "@student.hcmus.edu.vn", result: RESPONSE_CODE.INVALID_EMAIL },
  { email: "nguyenvana@", result: RESPONSE_CODE.INVALID_EMAIL },
  { email: "nguyenvana@student.hcmus", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN },
  { email: "nguyen van a@student.hcmus.edu.vn", result: RESPONSE_CODE.INVALID_EMAIL},
  { email: "nguyenvana @student.hcmus.edu.vn", result: RESPONSE_CODE.INVALID_EMAIL },
  { email: "nguyen@@student.hcmus.edu.vn", result: RESPONSE_CODE.INVALID_EMAIL},
  { email: "nguyenvana@gmail.com", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN },
  { email: "nguyenvana@yahoo.com", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN },
  { email: "nguyenvana@outlook.com", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN },
  { email: "nguyenvana@student.example.com", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN },
  { email: "nguyenvana@student.hcmus.edu.vn.example.com", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN },
  { email: "nguyenvana@student-hcmus.edu.vn", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN },
  { email: "nguyenvana@fakehcmus.edu.vn", result: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN },
  { email: "", result: RESPONSE_CODE.INVALID_EMAIL },
  { email: "nguyen..vana@student.hcmus.edu.vn", result: RESPONSE_CODE.INVALID_EMAIL },
  { email: ".nguyenvana@student.hcmus.edu.vn", result: RESPONSE_CODE.INVALID_EMAIL},
  { email: "nguyenvana.@student.hcmus.edu.vn", result: RESPONSE_CODE.INVALID_EMAIL },
  { email: "nguyenvana@.edu.vn", result: RESPONSE_CODE.INVALID_EMAIL },
  { email: "nguyenvana@student..hcmus.edu.vn", result: RESPONSE_CODE.INVALID_EMAIL },
  { email: "nguyen(vana)@student.hcmus.edu.vn", result: RESPONSE_CODE.INVALID_EMAIL },
];

export const storage = {
  validate_email(email: string) {
    if (this.account_email.includes(email)) return false;
    return true;
  },
  validate_username(username: string) {
    if (this.account_username.includes(username)) return false;
    return true;
  },
  clean() {
    console.log("[CLEAN STORAGE]")
    this.ids.clear()
    this.account_email = []
    this.account_username = []
    this.sessions = []
    this.active_sessions.clear()
    this.otps.clear()
  },
  register(displayname: string, username: string, email: string, password: string): { session_id: string, user_id: string, role: string, status: string } {
    this.account_email.push(email)
    this.account_username.push(username)
    this.account.set(email, { email, username, displayname, password, activate: false });
    this.account.set(username, { email, username, displayname, password, activate: false });
    const user_id = this.ids.size / 2;
    this.ids.set(email, user_id)
    this.ids.set(username, user_id)
    const session_id = this.sessions.length
    this.sessions.push(`${user_id}`);
    this.active_sessions.add(`${session_id}`);
    return {session_id:`${session_id}`, user_id:`${user_id}`, role: 'STUDENT', status: 'INACTIVE'}
  },
  validSession(session_id: string, user_id: string) {
    return this.active_sessions.has(session_id) && this.sessions[Number(session_id)] === user_id;
  },
  emailOf(user_id: string) {
    for (const [email, id] of this.ids) {
      if (`${id}` !== user_id) continue;
      if (email.includes('@')) return email;
    }
    return undefined;
  },
  account_email: [] as string[],
  account_username: [] as string[],
  account: new Map < string, {email: string, username: string, displayname: string, password: string, activate: boolean}>(),
  ids: new Map<string, number>(),
  sessions: [] as string[],
  active_sessions: new Set<string>(),
  otps: new Map<string, number>(),
  generateToken() {
    return Array.from({length: Math.random() * 100 + 40}, () => String.fromCharCode(97 + Math.random()*26)).join('')
  }
  // tokens: new Map<string, number>(),
  // createToken() {
  //   return Array.from({length: 6}, (_) => String.fromCharCode(48 + Math.round(Math.random() * 9))).join('')
  // }


}