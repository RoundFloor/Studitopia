import { DatabaseError } from "pg";
import { SQLSTATE } from "../dto/SQLSTATE.dto.js";
import { storage } from "./pg.testcases.js";
import { registedDomainEmail } from "./pg.service.mock.js";

function validate_email(email: string) {
      if (email.length > 254) {
        let error = new DatabaseError("", 0, 'error')
        error.code = SQLSTATE.INVALID_EMAIL
        throw error
      } 
      const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*([._-][a-zA-Z0-9]+)*([%+][a-zA-Z0-9]+)?@([a-zA-Z0-9]+[-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        let error = new DatabaseError("", 0, 'error')
        error.code = SQLSTATE.INVALID_EMAIL
        throw error
      };
      const domain = email.split('@')[1]
      if (!registedDomainEmail.includes(domain)) {
        let error = new DatabaseError("", 0, 'error')
        error.code = SQLSTATE.UNREGISTERED_EMAIL_DOMAIN
        throw error
      }
      if (!storage.validate_email(email)) {
        let error = new DatabaseError("", 0, 'error')
        error.code = SQLSTATE.DUPLICATED_EMAIL
        throw error
      };
      return {rows: [{}], rowCount: 1}
}
function validate_username(username: string) {
  if (username.length < 8 || username.length > 32 || username[username.length - 1] == '.' || username[0] == '.') {
    let error = new DatabaseError("", 0, 'error')
    error.code = SQLSTATE.INVALID_USERNAME;
    throw error
  }
  for (let i = 0; i < username.length; i++) {
      if (username[i] >= 'a' && username[i] <= 'z') continue;
      if (username[i] >= '0' && username[i] <= '9') continue;
      if (username[i] == '.' && username[i-1] != '.') continue;
      let error = new DatabaseError("", 0, 'error')
      error.code = SQLSTATE.INVALID_USERNAME;
      throw error
  }
  if (!storage.validate_username(username)) {
    let error = new DatabaseError("", 0, 'error')
    error.code = SQLSTATE.DUPLICATED_USERNAME;
    throw error
  };
  return {rows: [{}], rowCount: 1}
}
export function validate_displayname(displayname: string) {  
  if (displayname.length < 8 || displayname.length > 32) return false;
  if (displayname[0] == " " || displayname[displayname.length - 1] == " ") return false;
  for (let i = 0; i < displayname.length; i++) {
      if (displayname[i] >= 'a' && displayname[i] <= 'z') continue;
      if (displayname[i] >= 'A' && displayname[i] <= 'Z') continue;
      if (displayname[i] >= '0' && displayname[i] <= '9') continue;
      if (displayname[i] == ' ' && displayname[i-1] != ' ') continue;
      return false;
  }
  return true;
}
export function validate_password(password: string) {
  if (password.length < 8 || password.length > 32) return false;
  let lowercase = false, supercase = false, number = false, special = false;
  for (let i = 0; i < password.length; i++) {
      if (password[i] >= 'a' && password[i] <= 'z') lowercase = true
      else if (password[i] >= 'A' && password[i] <= 'Z') supercase = true
      else if (password[i] >= '0' && password[i] <= '9') number = true;
      else if (password[i] == '\0') return false
      else special = true;
  }
  return lowercase && supercase && number && special;
}
function register(displayname: string, username: string, email: string, password: string) {
  if (!validate_displayname(displayname)) {
    let error = new DatabaseError("", 0, 'error')
    error.code = SQLSTATE.INVALID_DISPLAYNAME;
    throw error
  };
  validate_email(email)
  validate_username(username)
  if (!validate_password(password)) {
    let error = new DatabaseError("", 0, 'error')
    error.code = SQLSTATE.INVALID_PASSWORD;
    throw error
  };
  const tokens = storage.register(displayname, username, email, password)
  return {rows: [{session_id: tokens.session_id, user_id: tokens.user_id, role: tokens.role, status: tokens.status}], rowCount: 1}
}

export const PoolMock = {
  async query(query: string, params: any[]) {
      switch (query) {
        case "SELECT * FROM STUDITOPIA.EMAIL_VALIDATION($1);":
          return validate_email(params[0] as string);
        case "SELECT * FROM STUDITOPIA.USERNAME_VALIDATION($1);":
          return validate_username(params[0] as string)
        case "SELECT * FROM STUDITOPIA.REGISTER($1, $2, $3, $4) AS C(user_id, session_id, role, status);":
          return register(params[0], params[2], params[1], params[3])
      }
    let e = new DatabaseError("", 0, 'error')
    e.code = SQLSTATE.OTHERS
    throw e
  }
}