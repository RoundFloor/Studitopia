import { RESPONSE_CODE } from "../../../common/response-code/code.config.js";
import { PostgresService } from "../pg.service.js";
import { storage } from "./pg.testcases.js";
import { validate_displayname, validate_password } from "./pool.mock.js";

export const registedDomainEmail: string[] = [
  "student.hcmus.edu.vn",
  "apcs.fitus.edu.vn",
  "clc.fitus.edu.vn",
  "ctvp.fitus.edu.vn",
  "hcmut.edu.vn",
  "hcmussh.edu.vn",
  "student.hcmiu.edu.vn",
  "gm.uit.edu.vn",
  "ms.uit.edu.vn",
  "st.uel.edu.vn",
  "sdh.uel.edu.vn",
];

export const PostgresServiceMock = {
    validate_email: vi.fn(async (email: string) => {
      if (email.length > 254) return RESPONSE_CODE.INVALID_EMAIL;
      const emailRegex = /^[a-zA-Z][a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*([%+][a-zA-Z0-9]+)?@([a-zA-Z0-9]+[-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) return RESPONSE_CODE.INVALID_EMAIL;
      const domain = email.split('@')[1];
      if (!registedDomainEmail.includes(domain)) return RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN;
      if (!storage.validate_email(email)) return RESPONSE_CODE.DUPLICATED_EMAIL;
      return RESPONSE_CODE.SUCCESS;
    }),
    validate_username: vi.fn(async (username: string) => {
      if (username.length < 8 || username.length > 32 || username[username.length - 1] == '.' || username[0] == '.')
        return RESPONSE_CODE.INVALID_USERNAME;
      for (let i = 0; i < username.length; i++) {
          if (username[i] >= 'a' && username[i] <= 'z') continue;
          if (username[i] >= '0' && username[i] <= '9') continue;
          if (username[i] == '.' && username[i-1] != '.') continue;
          return RESPONSE_CODE.INVALID_USERNAME;
      }
      if (!storage.validate_username(username)) return RESPONSE_CODE.DUPLICATED_USERNAME;
      return RESPONSE_CODE.SUCCESS;
    }),
    register: vi.fn(async (displayname: string, username: string, email: string, password: string) => {
      if (!validate_displayname(displayname)) return { code: RESPONSE_CODE.INVALID_DISPLAYNAME };
      if (!validate_password(password)) return { code: RESPONSE_CODE.INVALID_PASSWORD };

      if (email.length > 254) return { code: RESPONSE_CODE.INVALID_EMAIL };
      const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*([._-][a-zA-Z0-9]+)*([%+][a-zA-Z0-9]+)?@([a-zA-Z0-9]+[-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) return { code: RESPONSE_CODE.INVALID_EMAIL };
      const domain = email.split('@')[1];
      if (!registedDomainEmail.includes(domain)) return { code: RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN };
      if (!storage.validate_email(email)) return { code: RESPONSE_CODE.DUPLICATED_EMAIL };
      
      if (username.length < 8 || username.length > 32 || username[username.length - 1] == '.' || username[0] == '.')
        return { code: RESPONSE_CODE.INVALID_USERNAME };
      for (let i = 0; i < username.length; i++) {
          if (username[i] >= 'a' && username[i] <= 'z') continue;
          if (username[i] >= '0' && username[i] <= '9') continue;
          if (username[i] == '.' && username[i-1] != '.') continue;
        return { code: RESPONSE_CODE.INVALID_USERNAME };
      }
      if (!storage.validate_username(username)) return { code: RESPONSE_CODE.DUPLICATED_USERNAME };
      const response = storage.register(displayname, username, email, password);
      return { code: RESPONSE_CODE.SUCCESS, data: { user_id: response.user_id, session_id: response.session_id, role: response.role, status: response.status } }
    }),
    loginByUsername: vi.fn(async (username: string, password: string) => {
      const account = storage.account.get(username);
      if (!account || account.password !== password) return { code: RESPONSE_CODE.INVALID_CREDENTIALS };
      const user_id = `${storage.ids.get(username)}`;
      const session_id = `${storage.sessions.length}`;
      storage.sessions.push(user_id);
      storage.active_sessions.add(session_id);
      return { code: RESPONSE_CODE.SUCCESS, data: { session_id, user_id, role: 'STUDENT', status: account.activate ? 'ACTIVE' : 'INACTIVE' } };
    }),
    loginByEmail: vi.fn(async (email: string, password: string) => {
      const account = storage.account.get(email);
      if (!account || account.password !== password) return { code: RESPONSE_CODE.INVALID_CREDENTIALS };
      const user_id = `${storage.ids.get(email)}`;
      const session_id = `${storage.sessions.length}`;
      storage.sessions.push(user_id);
      storage.active_sessions.add(session_id);
      return { code: RESPONSE_CODE.SUCCESS, data: { session_id, user_id, role: 'STUDENT', status: account.activate ? 'ACTIVE' : 'INACTIVE' } };
    }),
    logout: vi.fn(async (session_id: string, user_id: string) => {
      if (!storage.validSession(session_id, user_id)) return RESPONSE_CODE.INVALID_SESSION;
      storage.active_sessions.delete(session_id);
      storage.otps.delete(session_id);
      return RESPONSE_CODE.SUCCESS;
    }),
    activeAccount: vi.fn(async (session_id: string, user_id: string) => {
      if (!storage.validSession(session_id, user_id)) return RESPONSE_CODE.INVALID_SESSION;
      const email = storage.emailOf(user_id);
      if (!email) return RESPONSE_CODE.DATABASE_ERROR;
      const account = storage.account.get(email)!;
      if (!account.activate) {
        account.activate = true;
        storage.account.get(account.username)!.activate = true;
        storage.otps.delete(session_id);
      }
      return RESPONSE_CODE.SUCCESS;
    }),
    getEmail: vi.fn(async (session_id: string, user_id: string) => {
      if (!storage.validSession(session_id, user_id)) return { code: RESPONSE_CODE.INVALID_SESSION };
      const email = storage.emailOf(user_id);
      if (!email) return { code: RESPONSE_CODE.DATABASE_ERROR };
      return { code: RESPONSE_CODE.SUCCESS, data: email };
    }),
    saveOtp: vi.fn(async (session_id: string, user_id: string, otp: number) => {
      if (!storage.validSession(session_id, user_id)) return RESPONSE_CODE.INVALID_SESSION;
      storage.otps.set(session_id, otp);
      return RESPONSE_CODE.SUCCESS;
    }),
    getOtp: vi.fn(async (session_id: string, user_id: string) => {
      if (!storage.validSession(session_id, user_id)) return { code: RESPONSE_CODE.INVALID_SESSION };
      return { code: RESPONSE_CODE.SUCCESS, data: storage.otps.get(session_id) ?? null };
    }),
    removeOtp: vi.fn(async (session_id: string, user_id: string) => {
      if (!storage.validSession(session_id, user_id)) return RESPONSE_CODE.INVALID_SESSION;
      storage.otps.delete(session_id);
      return RESPONSE_CODE.SUCCESS;
    })
} as any as PostgresService