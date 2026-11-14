import { Injectable } from '@nestjs/common';
import { DatabaseError, Pool } from 'pg';
import { SQLSTATE } from './dto/SQLSTATE.dto.js';
import {
  RESPONSE_CODE,
  ResponseCode,
} from '../../common/response-code/code.config.js';
import {
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  DB_MAX_CONNECTION,
  DB_IDLE_TIMEOUT_MILLIS,
  DB_CONNECTION_TIMEOUT_MILLIS,
} from './pg.config.js';
import { RegisterResponse, SessionResponse } from './dto/response.dto.js';

type DatabaseResult<T> = {
  code: ResponseCode;
  data?: T;
};

@Injectable()
export class PostgresService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST ?? "localhost",
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      max: DB_MAX_CONNECTION,
      idleTimeoutMillis: DB_IDLE_TIMEOUT_MILLIS,
      connectionTimeoutMillis: DB_CONNECTION_TIMEOUT_MILLIS,
    });
  }

  private toResponseCode(
    error: unknown,
    sqlstateMap: Record<string, ResponseCode>,
  ): ResponseCode {
    console.log(error)
    if (error instanceof DatabaseError) {
      return sqlstateMap[error.code ?? ''] ?? RESPONSE_CODE.DATABASE_ERROR;
    }
    return RESPONSE_CODE.UNKNOWN_ERROR;
  }

  async validate_email(email: string): Promise<ResponseCode> {
    return await this.pool
      .query('SELECT * FROM studitopia.EMAIL_VALIDATION($1);', [email])
      .then(() => RESPONSE_CODE.SUCCESS)
      .catch((e) =>
        this.toResponseCode(e, {
          [SQLSTATE.INVALID_EMAIL]: RESPONSE_CODE.INVALID_EMAIL,
          [SQLSTATE.UNREGISTERED_EMAIL_DOMAIN]:
            RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN,
          [SQLSTATE.DUPLICATED_EMAIL]: RESPONSE_CODE.DUPLICATED_EMAIL,
        }),
      );
  }

  async validate_username(username: string): Promise<ResponseCode> {
    return await this.pool
      .query('SELECT * FROM studitopia.USERNAME_VALIDATION($1);', [username])
      .then(() => RESPONSE_CODE.SUCCESS)
      .catch((e) =>
        this.toResponseCode(e, {
          [SQLSTATE.INVALID_USERNAME]: RESPONSE_CODE.INVALID_USERNAME,
          [SQLSTATE.DUPLICATED_USERNAME]: RESPONSE_CODE.DUPLICATED_USERNAME,
        }),
      );
  }

  async register(
    displayname: string,
    username: string,
    email: string,
    password: string,
  ): Promise<DatabaseResult<RegisterResponse>> {
    return await this.pool
      .query('SELECT * FROM studitopia.REGISTER($1, $2, $3, $4);', [
        displayname,
        email,
        username,
        password,
      ])
      .then((value) => ({
        code: RESPONSE_CODE.SUCCESS,
        data: {
          user_id: String(value.rows[0].user_id),
          session_id: String(value.rows[0].session_id),
          role: String(value.rows[0].account_role),
          status: String(value.rows[0].account_status),
        },
      }))
      .catch((e) => ({
        code: this.toResponseCode(e, {
          [SQLSTATE.INVALID_DISPLAYNAME]: RESPONSE_CODE.INVALID_DISPLAYNAME,
          [SQLSTATE.INVALID_USERNAME]: RESPONSE_CODE.INVALID_USERNAME,
          [SQLSTATE.DUPLICATED_USERNAME]: RESPONSE_CODE.DUPLICATED_USERNAME,
          [SQLSTATE.INVALID_EMAIL]: RESPONSE_CODE.INVALID_EMAIL,
          [SQLSTATE.UNREGISTERED_EMAIL_DOMAIN]:
            RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN,
          [SQLSTATE.DUPLICATED_EMAIL]: RESPONSE_CODE.DUPLICATED_EMAIL,
          [SQLSTATE.INVALID_PASSWORD]: RESPONSE_CODE.INVALID_PASSWORD,
        }),
      }));
  }

  async loginByUsername(
    username: string,
    password: string,
  ): Promise<DatabaseResult<SessionResponse>> {
    return await this.login(
      'studitopia.LOGIN_BY_USERNAME($1, $2);',
      username,
      password,
    );
  }

  async loginByEmail(
    email: string,
    password: string,
  ): Promise<DatabaseResult<SessionResponse>> {
    return await this.login(
      'studitopia.LOGIN_BY_EMAIL($1, $2);',
      email,
      password,
    );
  }

  private async login(
    fn: string,
    identifier: string,
    password: string,
  ): Promise<DatabaseResult<SessionResponse>> {
    return await this.pool
      .query(`SELECT * FROM ${fn}`, [identifier, password])
      .then((value) => ({
        code: RESPONSE_CODE.SUCCESS,
        data: {
          session_id: String(value.rows[0].session_id),
          user_id: String(value.rows[0].user_id),
          role: value.rows[0].role as string,
          status: String(value.rows[0].status),
        },
      }))
      .catch((e) => ({
        code: this.toResponseCode(e, {
          [SQLSTATE.INVALID_CREDENTIALS]: RESPONSE_CODE.INVALID_CREDENTIALS,
        }),
      }));
  }

  async logout(
    session_id: string,
    user_id: string,
  ): Promise<ResponseCode> {
    return await this.pool
      .query('SELECT studitopia.LOGOUT($1, $2);', [session_id, user_id])
      .then(() => RESPONSE_CODE.SUCCESS)
      .catch((e) =>
        this.toResponseCode(e, {
          [SQLSTATE.INVALID_SESSION]: RESPONSE_CODE.INVALID_SESSION,
        }),
      );
  }

  async activeAccount(
    session_id: string,
    user_id: string,
  ): Promise<ResponseCode> {
    return await this.pool
      .query('SELECT studitopia.ACTIVE_ACCOUNT($1, $2);', [
        session_id,
        user_id,
      ])
      .then(() => RESPONSE_CODE.SUCCESS)
      .catch((e) =>
        this.toResponseCode(e, {
          [SQLSTATE.INVALID_SESSION]: RESPONSE_CODE.INVALID_SESSION,
        }),
      );
  }

  async getEmail(
    session_id: string,
    user_id: string,
  ): Promise<DatabaseResult<string>> {
    return await this.pool
      .query('SELECT * FROM studitopia.GET_EMAIL($1, $2);', [
        session_id,
        user_id,
      ])
      .then((value) => ({
        code: RESPONSE_CODE.SUCCESS,
        data: (value.rows[0].get_email ?? value.rows[0].email) as string,
      }))
      .catch((e) => ({
        code: this.toResponseCode(e, {
          [SQLSTATE.INVALID_SESSION]: RESPONSE_CODE.INVALID_SESSION,
        }),
      }));
  }

  async saveOtp(
    session_id: string,
    user_id: string,
    otp: number,
  ): Promise<ResponseCode> {
    return await this.pool
      .query('SELECT studitopia.SAVE_OTP($1, $2, $3);', [
        session_id,
        user_id,
        otp,
      ])
      .then(() => RESPONSE_CODE.SUCCESS)
      .catch((e) =>
        this.toResponseCode(e, {
          [SQLSTATE.INVALID_SESSION]: RESPONSE_CODE.INVALID_SESSION,
        }),
      );
  }

  async getOtp(
    session_id: string,
    user_id: string,
  ): Promise<DatabaseResult<number | null>> {
    return await this.pool
      .query('SELECT studitopia.GET_OTP($1, $2);', [session_id, user_id])
      .then((value) => ({
        code: RESPONSE_CODE.SUCCESS,
        data:
          value.rows[0].get_otp === null
            ? null
            : Number(value.rows[0].get_otp),
      }))
      .catch((e) => ({
        code: this.toResponseCode(e, {
          [SQLSTATE.INVALID_SESSION]: RESPONSE_CODE.INVALID_SESSION,
        }),
      }));
  }

  async removeOtp(
    session_id: string,
    user_id: string,
  ): Promise<ResponseCode> {
    return await this.pool
      .query('SELECT studitopia.REMOVE_OTP($1, $2);', [session_id, user_id])
      .then(() => RESPONSE_CODE.SUCCESS)
      .catch((e) =>
        this.toResponseCode(e, {
          [SQLSTATE.INVALID_SESSION]: RESPONSE_CODE.INVALID_SESSION,
        }),
      );
  }
}
