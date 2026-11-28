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
    validate_email: vi.fn(async (email: string): Promise<void> => {
      if (email.length > 254) throw RESPONSE_CODE.INVALID_EMAIL;
      const emailRegex = /^[a-zA-Z][a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*([%+][a-zA-Z0-9]+)?@([a-zA-Z0-9]+[-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) throw RESPONSE_CODE.INVALID_EMAIL;
      const domain = email.split('@')[1];
      if (!registedDomainEmail.includes(domain)) throw RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN;
      if (!storage.validate_email(email)) throw RESPONSE_CODE.DUPLICATED_EMAIL;
    }),
    validate_username: vi.fn(async (username: string): Promise<void> => {
      if (username.length < 8 || username.length > 32 || username[username.length - 1] == '.' || username[0] == '.')
        throw RESPONSE_CODE.INVALID_USERNAME;
      for (let i = 0; i < username.length; i++) {
          if (username[i] >= 'a' && username[i] <= 'z') continue;
          if (username[i] >= '0' && username[i] <= '9') continue;
          if (username[i] == '.' && username[i-1] != '.') continue;
          throw RESPONSE_CODE.INVALID_USERNAME;
      }
      if (!storage.validate_username(username)) throw RESPONSE_CODE.DUPLICATED_USERNAME;
    }),
    register: vi.fn(async (displayname: string, username: string, email: string, password: string) => {
      if (!validate_displayname(displayname)) throw RESPONSE_CODE.INVALID_DISPLAYNAME;
      if (!validate_password(password)) throw RESPONSE_CODE.INVALID_PASSWORD;

      if (email.length > 254) throw RESPONSE_CODE.INVALID_EMAIL;
      const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*([._-][a-zA-Z0-9]+)*([%+][a-zA-Z0-9]+)?@([a-zA-Z0-9]+[-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) throw RESPONSE_CODE.INVALID_EMAIL;
      const domain = email.split('@')[1];
      if (!registedDomainEmail.includes(domain)) throw RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN;
      if (!storage.validate_email(email)) throw RESPONSE_CODE.DUPLICATED_EMAIL;

      if (username.length < 8 || username.length > 32 || username[username.length - 1] == '.' || username[0] == '.')
        throw RESPONSE_CODE.INVALID_USERNAME;
      for (let i = 0; i < username.length; i++) {
          if (username[i] >= 'a' && username[i] <= 'z') continue;
          if (username[i] >= '0' && username[i] <= '9') continue;
          if (username[i] == '.' && username[i-1] != '.') continue;
          throw RESPONSE_CODE.INVALID_USERNAME;
      }
      if (!storage.validate_username(username)) throw RESPONSE_CODE.DUPLICATED_USERNAME;
      const response = storage.register(displayname, username, email, password);
      return { user_id: response.user_id, session_id: response.session_id, role: response.role, status: response.status };
    }),
    loginByUsername: vi.fn(async (username: string, password: string) => {
      const account = storage.account.get(username);
      if (!account || account.password !== password) throw RESPONSE_CODE.INVALID_CREDENTIALS;
      const user_id = `${storage.ids.get(username)}`;
      const session_id = `${storage.sessions.length}`;
      storage.sessions.push(user_id);
      storage.active_sessions.add(session_id);
      return { session_id, user_id, role: 'STUDENT', status: account.activate ? 'ACTIVE' : 'INACTIVE' };
    }),
    loginByEmail: vi.fn(async (email: string, password: string) => {
      const account = storage.account.get(email);
      if (!account || account.password !== password) throw RESPONSE_CODE.INVALID_CREDENTIALS;
      const user_id = `${storage.ids.get(email)}`;
      const session_id = `${storage.sessions.length}`;
      storage.sessions.push(user_id);
      storage.active_sessions.add(session_id);
      return { session_id, user_id, role: 'STUDENT', status: account.activate ? 'ACTIVE' : 'INACTIVE' };
    }),
    logout: vi.fn(async (session_id: string, user_id: string) => {
      if (!storage.validSession(session_id, user_id)) throw RESPONSE_CODE.INVALID_SESSION;
      storage.active_sessions.delete(session_id);
      storage.otps.delete(session_id);
    }),
    activeAccount: vi.fn(async (session_id: string, user_id: string) => {
      if (!storage.validSession(session_id, user_id)) throw RESPONSE_CODE.INVALID_SESSION;
      const email = storage.emailOf(user_id);
      if (!email) throw RESPONSE_CODE.DATABASE_ERROR;
      const account = storage.account.get(email)!;
      if (!account.activate) {
        account.activate = true;
        storage.account.get(account.username)!.activate = true;
        storage.otps.delete(session_id);
      }
    }),
    getEmail: vi.fn(async (session_id: string, user_id: string) => {
      if (!storage.validSession(session_id, user_id)) throw RESPONSE_CODE.INVALID_SESSION;
      const email = storage.emailOf(user_id);
      if (!email) throw RESPONSE_CODE.DATABASE_ERROR;
      return email;
    }),
    saveOtp: vi.fn(async (session_id: string, user_id: string, otp: number) => {
      if (!storage.validSession(session_id, user_id)) throw RESPONSE_CODE.INVALID_SESSION;
      storage.otps.set(session_id, otp);
    }),
    getOtp: vi.fn(async (session_id: string, user_id: string) => {
      if (!storage.validSession(session_id, user_id)) throw RESPONSE_CODE.INVALID_SESSION;
      return storage.otps.get(session_id) ?? null;
    }),
    removeOtp: vi.fn(async (session_id: string, user_id: string) => {
      if (!storage.validSession(session_id, user_id)) throw RESPONSE_CODE.INVALID_SESSION;
      storage.otps.delete(session_id);
    })
} as any as PostgresService
