import { Injectable } from '@nestjs/common';
import { DatabaseError, Pool } from 'pg';
import { SQLSTATE } from './dto/SQLSTATE.dto.js';
import {
  RESPONSE_CODE,
  ResponseCode,
} from '../../common/response-code/code.config.js';
import {
  DB_MAX_CONNECTION,
  DB_IDLE_TIMEOUT_MILLIS,
  DB_CONNECTION_TIMEOUT_MILLIS,
} from './pg.config.js';
import {
  AccountResponse,
  CommentResponse,
  CreatedFileResponse,
  FileResponse,
  PostResponse,
  RegisterResponse,
  RelevantTagResponse,
  SessionResponse,
  TagDetailResponse,
  TagResponse,
  TagsByIdResponse,
} from './dto/response.dto.js';
import { EnvironmentService } from '../environment/environment.service.js';

type QueryRow = Record<string, unknown>;

const INVALID_INPUT_ERRORS: Record<string, ResponseCode> = {
  [SQLSTATE.INVALID_INPUT]: RESPONSE_CODE.INVALID_INPUT,
};

const FOREIGN_KEY_ERRORS: Record<string, ResponseCode> = {
  [SQLSTATE.FOREIGN_KEY_VIOLATION]: RESPONSE_CODE.FOREIGN_KEY_VIOLATION,
};

const UNIQUE_ERRORS: Record<string, ResponseCode> = {
  [SQLSTATE.UNIQUE_VIOLATION]: RESPONSE_CODE.UNIQUE_VIOLATION,
};

const VOTE_TYPE_ERRORS: Record<string, ResponseCode> = {
  [SQLSTATE.INVALID_VOTE_TYPE]: RESPONSE_CODE.INVALID_VOTE_TYPE,
};

const INVALID_SESSION_ERRORS: Record<string, ResponseCode> = {
  [SQLSTATE.INVALID_SESSION]: RESPONSE_CODE.INVALID_SESSION,
};

const toNumber = (value: unknown): number => Number(value);

const toBoolean = (value: unknown): boolean => value === true;

const toNullableNumber = (value: unknown): number | null =>
  value === null || value === undefined ? null : Number(value);

const toNullableString = (value: unknown): string | null =>
  value === null || value === undefined ? null : value as string;

const toTag = (row: QueryRow): TagResponse => ({
  id: Number(row.id),
  name: String(row.name),
  num_tag: Number(row.num_tag),
  num_post: Number(row.num_post),
  icon: toNullableNumber(row.icon),
  hot: Number(row.hot),
  description: String(row.description),
});

const toTagDetail = (row: QueryRow): TagDetailResponse => ({
  ...toTag(row),
  category: String(row.category),
  created_time: row.created_time as Date,
});

const toRelevantTag = (row: QueryRow): RelevantTagResponse => ({
  id: Number(row.id),
  name: String(row.name),
  num_post: Number(row.num_post),
});

const toTagsById = (row: QueryRow): TagsByIdResponse => ({
  id: Number(row.id),
  name: String(row.name),
  category: String(row.category),
});

const toPost = (row: QueryRow): PostResponse => ({
  id: Number(row.id),
  title: String(row.title),
  account_id: Number(row.account_id),
  displayname: String(row.displayname),
  avatar_id: Number(row.avatar_id),
  comment_id: Number(row.comment_id),
  content: String(row.content),
  upvote: Number(row.upvote),
  downvote: Number(row.downvote),
  num_comment: Number(row.num_comment),
  true_response: toBoolean(row.true_response),
  created_time: row.created_time as Date,
  tags: Array.isArray(row.tags) ? row.tags.map(Number) : [],
});

const toComment = (row: QueryRow): CommentResponse => ({
  id: Number(row.id),
  content: String(row.content),
  account_id: Number(row.account_id),
  upvote: Number(row.upvote),
  downvote: Number(row.downvote),
  num_comment: Number(row.num_comment),
  created_time: row.created_time as Date,
});

const toCreatedFile = (row: QueryRow): CreatedFileResponse => ({
  id: Number(row.id),
  src: String(row.src),
});

const toFile = (row: QueryRow): FileResponse => ({
  id: Number(row.id),
  name: String(row.name),
  src: String(row.src),
  account_id: Number(row.account_id),
  updated_time: row.updated_time as Date,
  created_time: row.created_time as Date,
});

const toAccount = (row: QueryRow): AccountResponse => ({
  displayname: String(row.displayname),
  username: String(row.username),
  university_name: toNullableString(row.university_name),
  university_id: toNullableNumber(row.university_id),
  faculty_name: toNullableString(row.faculty_name),
  faculty_id: toNullableNumber(row.faculty_id),
  major_name: toNullableString(row.major_name),
  major_id: toNullableNumber(row.major_id),
  avatar_id: toNullableNumber(row.avatar),
  role: String(row.role),
  status: String(row.status),
  create_time: row.create_time as Date,
});

@Injectable()
export class PostgresService {
  private pool: Promise<Pool>;

  constructor(private readonly env: EnvironmentService) {
    this.pool = new Promise(async (resolve, _reject) => {
      let pool: Pool | undefined = undefined
      while (!pool) {
        pool = new Pool({
          host: await env.get("DB_HOST", "Database Host", 'localhost'),
          port: await env.get("DB_PORT", "Database Port", 5432, (value) => Number.parseInt(value)),
          user: await env.get("DB_USER", "Database User", 'studitopia'),
          password: await env.get("DB_PASSWORD", "Database Password", 'studitopia'),
          database: await env.get("DB_DATABASE", "Database name", 'studitopia'),
          max: DB_MAX_CONNECTION,
          idleTimeoutMillis: DB_IDLE_TIMEOUT_MILLIS,
          connectionTimeoutMillis: DB_CONNECTION_TIMEOUT_MILLIS,
        })
        try {
          await pool.connect()
          console.log("Database connect successful!")
        }
        catch (e) {
          if (e instanceof DatabaseError)
            console.error(e.message)
          else console.error(e)
          pool = undefined
        }
      }
      return resolve(pool);
    })
  }

  private toResponseCode(
    error: unknown,
    sqlstateMap: Record<string, ResponseCode>,
  ): ResponseCode {
    console.log(error);
    if (error instanceof DatabaseError) {
      return sqlstateMap[error.code ?? ''] ?? RESPONSE_CODE.DATABASE_ERROR;
    }
    return RESPONSE_CODE.UNKNOWN_ERROR;
  }

  private async select<T>(
    fn: string,
    params: unknown[],
    map: (row: QueryRow) => T,
    errors: Record<string, ResponseCode> = {},
    suffix = '',
  ): Promise<T[]> {
    const placeholders = params.map((_, index) => `$${index + 1}`).join(', ');
    const pool = await this.pool;
    try {
      const value = await pool.query(
        `SELECT * FROM ${fn}(${placeholders})${suffix};`,
        params,
      );
      return value.rows.map(map);
    } catch (error: unknown) {
      throw this.toResponseCode(error, errors);
    }
  }

  private async execute(
    fn: string,
    params: unknown[],
    errors: Record<string, ResponseCode> = {},
  ): Promise<void> {
    await this.select<void>(fn, params, () => {}, errors);
  }

  async validate_email(email: string): Promise<void> {
    await this.select<void>(
      'STUDITOPIA.EMAIL_VALIDATION',
      [email],
      () => {},
      {
        [SQLSTATE.INVALID_EMAIL]: RESPONSE_CODE.INVALID_EMAIL,
        [SQLSTATE.UNREGISTERED_EMAIL_DOMAIN]:
          RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN,
        [SQLSTATE.DUPLICATED_EMAIL]: RESPONSE_CODE.DUPLICATED_EMAIL,
      },
    );
  }

  async validate_username(username: string): Promise<void> {
    await this.select<void>(
      'STUDITOPIA.USERNAME_VALIDATION',
      [username],
      () => {},
      {
        [SQLSTATE.INVALID_USERNAME]: RESPONSE_CODE.INVALID_USERNAME,
        [SQLSTATE.DUPLICATED_USERNAME]: RESPONSE_CODE.DUPLICATED_USERNAME,
      },
    );
  }

  async register(
    displayname: string,
    username: string,
    email: string,
    password: string,
  ): Promise<RegisterResponse> {
    const rows = await this.select<RegisterResponse>(
      'STUDITOPIA.REGISTER',
      [displayname, email, username, password],
      row => row as unknown as RegisterResponse,
      {
        [SQLSTATE.INVALID_DISPLAYNAME]: RESPONSE_CODE.INVALID_DISPLAYNAME,
        [SQLSTATE.INVALID_USERNAME]: RESPONSE_CODE.INVALID_USERNAME,
        [SQLSTATE.DUPLICATED_USERNAME]: RESPONSE_CODE.DUPLICATED_USERNAME,
        [SQLSTATE.INVALID_EMAIL]: RESPONSE_CODE.INVALID_EMAIL,
        [SQLSTATE.UNREGISTERED_EMAIL_DOMAIN]:
          RESPONSE_CODE.UNREGISTERED_EMAIL_DOMAIN,
        [SQLSTATE.DUPLICATED_EMAIL]: RESPONSE_CODE.DUPLICATED_EMAIL,
        [SQLSTATE.INVALID_PASSWORD]: RESPONSE_CODE.INVALID_PASSWORD,
      },
      ' AS C(user_id, session_id, role, status)',
    );
    return rows[0];
  }

  async loginByUsername(
    username: string,
    password: string,
  ): Promise<SessionResponse> {
    return await this.login('STUDITOPIA.LOGIN_BY_USERNAME', username, password);
  }

  async loginByEmail(
    email: string,
    password: string,
  ): Promise<SessionResponse> {
    return await this.login('STUDITOPIA.LOGIN_BY_EMAIL', email, password);
  }

  private async login(
    fn: string,
    identifier: string,
    password: string,
  ): Promise<SessionResponse> {
    const rows = await this.select<SessionResponse>(
      fn,
      [identifier, password],
      row => row as unknown as SessionResponse,
      {
        [SQLSTATE.INVALID_CREDENTIALS]: RESPONSE_CODE.INVALID_CREDENTIALS,
      },
    );
    return rows[0];
  }

  async logout(session_id: number, user_id: number): Promise<void> {
    await this.execute('STUDITOPIA.LOGOUT', [session_id, user_id], INVALID_SESSION_ERRORS);
  }

  async activeAccount(session_id: number, user_id: number): Promise<void> {
    await this.execute('STUDITOPIA.ACTIVE_ACCOUNT', [session_id, user_id], INVALID_SESSION_ERRORS);
  }

  async getEmail(session_id: number, user_id: number): Promise<string> {
    const rows = await this.select<QueryRow>(
      'STUDITOPIA.GET_EMAIL',
      [session_id, user_id],
      row => row,
      INVALID_SESSION_ERRORS,
    );
    return (rows[0]?.get_email ?? rows[0]?.email) as string;
  }

  async saveOtp(
    session_id: number,
    user_id: number,
    otp: number,
  ): Promise<void> {
    await this.execute('STUDITOPIA.SAVE_OTP', [session_id, user_id, otp], INVALID_SESSION_ERRORS);
  }

  async getOtp(session_id: number, user_id: number): Promise<number | null> {
    const rows = await this.select<QueryRow>(
      'STUDITOPIA.GET_OTP',
      [session_id, user_id],
      row => row,
      INVALID_SESSION_ERRORS,
    );
    return rows[0]?.get_otp === null || rows[0]?.get_otp === undefined
      ? null
      : Number(rows[0].get_otp);
  }

  async removeOtp(session_id: number, user_id: number): Promise<void> {
    await this.execute('STUDITOPIA.REMOVE_OTP', [session_id, user_id], INVALID_SESSION_ERRORS);
  }

  async getTag(category?: string): Promise<TagResponse[]> {
    if (category)
      return await this.select('STUDITOPIA.GET_TAG', [category], toTag);
    return await this.select('STUDITOPIA.GET_TAG', [], toTag)
  }

  async getTagById(tagId: number): Promise<TagDetailResponse[]> {
    return await this.select('STUDITOPIA.GET_TAG_BY_ID', [tagId], toTagDetail);
  }

  async getTagsById(ids: number[]): Promise<TagsByIdResponse[]> {
    return await this.select('STUDITOPIA.GET_TAGS_BY_ID', [ids], toTagsById);
  }

  async getTagByName(name: string): Promise<TagDetailResponse[]> {
    return await this.select('STUDITOPIA.GET_TAG_BY_NAME', [name], toTagDetail);
  }

  async getTagByEmail(email: string): Promise<TagResponse[]> {
    return await this.select('STUDITOPIA.GET_TAG_BY_EMAIL', [email], toTag);
  }

  async getArea(universityId: number): Promise<TagResponse[]> {
    return await this.select('STUDITOPIA.GET_AREA', [universityId], toTag);
  }

  async getSubject(areaId: number): Promise<TagResponse[]> {
    return await this.select('STUDITOPIA.GET_SUBJECT', [areaId], toTag);
  }

  async getRelevantTag(ids: number[]): Promise<RelevantTagResponse[]> {
    return await this.select('STUDITOPIA.GET_RELEVANT_TAG', [ids], toRelevantTag);
  }

  async createTag(
    name: string,
    category: string,
    description: string,
  ): Promise<number> {
    const rows = await this.select(
      'STUDITOPIA.CREATE_TAG',
      [name, category, description],
      row => toNumber(row.create_tag),
      {
        ...INVALID_INPUT_ERRORS,
        ...FOREIGN_KEY_ERRORS,
        ...UNIQUE_ERRORS,
      },
    );
    return rows[0];
  }

  async createPost(
    title: string,
    content: string,
    accountId: number,
    tags: number[],
  ): Promise<number> {
    const rows = await this.select(
      'STUDITOPIA.CREATE_POST',
      [title, content, accountId, tags],
      row => toNumber(row.create_post),
      {
        ...INVALID_INPUT_ERRORS,
        ...FOREIGN_KEY_ERRORS,
      },
    );
    return rows[0];
  }

  async getPost(includedTags: number[] | null, excludedTags: number[] | null): Promise<PostResponse[]> {
    return await this.select('STUDITOPIA.GET_POST', [includedTags, excludedTags], toPost);
  }

  async getPostById(postId: number): Promise<PostResponse[]> {
    return await this.select('STUDITOPIA.GET_POST_BY_ID', [postId], toPost);
  }

  async createComment(
    parentCommentId: number,
    content: string,
    accountId: number,
  ): Promise<number> {
    const rows = await this.select(
      'STUDITOPIA.CREATE_COMMENT',
      [parentCommentId, content, accountId],
      row => toNumber(row.create_comment),
      FOREIGN_KEY_ERRORS,
    );
    return rows[0];
  }

  async getComment(postId: number): Promise<CommentResponse[]> {
    return await this.select('STUDITOPIA.GET_COMMENT', [postId], toComment);
  }

  async getCommentOfComment(commentId: number): Promise<CommentResponse[]> {
    return await this.select('STUDITOPIA.GET_COMMENT_OF_COMMENT', [commentId], toComment);
  }

  async voteComment(
    commentId: number,
    accountId: number,
    type = 0,
  ): Promise<number> {
    const rows = await this.select(
      'STUDITOPIA.VOTE_COMMENT',
      [commentId, accountId, type],
      row => toNumber(row.vote_comment),
      {
        ...FOREIGN_KEY_ERRORS,
        ...UNIQUE_ERRORS,
        ...VOTE_TYPE_ERRORS,
      },
    );
    return rows[0];
  }

  async removeVote(commentId: number, accountId: number): Promise<boolean> {
    const rows = await this.select(
      'STUDITOPIA.REMOVE_VOTE',
      [commentId, accountId],
      row => toBoolean(row.remove_vote),
      FOREIGN_KEY_ERRORS,
    );
    return rows[0];
  }

  async createFile(
    name: string,
    accountId: number,
  ): Promise<CreatedFileResponse[]> {
    return await this.select(
      'STUDITOPIA.CREATE_FILE',
      [name, accountId],
      toCreatedFile,
      {
        ...INVALID_INPUT_ERRORS,
        ...FOREIGN_KEY_ERRORS,
      },
    );
  }

  async getFileById(fileId: number): Promise<FileResponse[]> {
    return await this.select('STUDITOPIA.GET_FILE_BY_ID', [fileId], toFile);
  }

  async getFileByAccount(accountId: number): Promise<FileResponse[]> {
    return await this.select('STUDITOPIA.GET_FILE_BY_ACCOUNT', [accountId], toFile);
  }

  async updateFile(
    fileId: number,
    accountId: number,
    name: string,
  ): Promise<boolean> {
    const rows = await this.select(
      'STUDITOPIA.UPDATE_FILE',
      [fileId, accountId, name],
      row => toBoolean(row.update_file),
      {
        ...INVALID_INPUT_ERRORS,
        ...FOREIGN_KEY_ERRORS,
      },
    );
    return rows[0];
  }

  async deleteFile(fileId: number, accountId: number): Promise<boolean> {
    const rows = await this.select(
      'STUDITOPIA.DELETE_FILE',
      [fileId, accountId],
      row => toBoolean(row.delete_file),
      FOREIGN_KEY_ERRORS,
    );
    return rows[0];
  }

  async setAccountAvatar(
    accountId: number,
    fileId: number | null,
  ): Promise<boolean> {
    const rows = await this.select(
      'STUDITOPIA.SET_ACCOUNT_AVATAR',
      [accountId, fileId],
      row => toBoolean(row.set_account_avatar),
      FOREIGN_KEY_ERRORS,
    );
    return rows[0];
  }

  async getAccountById(accountId: number): Promise<AccountResponse[]> {
    return await this.select('STUDITOPIA.GET_ACCOUNT_BY_ID', [accountId], toAccount);
  }

  async setTagIcon(
    tagId: number,
    fileId: number | null,
  ): Promise<boolean> {
    const rows = await this.select(
      'STUDITOPIA.SET_TAG_ICON',
      [tagId, fileId],
      row => toBoolean(row.set_tag_icon),
      FOREIGN_KEY_ERRORS,
    );
    return rows[0];
  }
}
