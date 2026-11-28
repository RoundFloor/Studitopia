import { Injectable } from '@nestjs/common';
import { PostgresService } from '../postgres/pg.service.js';
import { StorageService } from '../storage/storage.service.js';
import { RESPONSE_CODE, ResponseCode } from '../../common/response-code/code.config.js';
import { SecurityGenerationService } from '../security-generation/sg.service.js';
import { id, ids } from '../../common/dto/id.dto.js';
import { CreatedFileResponse } from '../postgres/dto/response.dto.js';

export interface AccountData {
  avatar: string | null;
  displayname: string;
  username: string;
  university_name: string | null;
  university_id: string | null;
  faculty_name: string | null;
  faculty_id: string | null;
  major_name: string | null;
  major_id: string | null;
  role: string;
  status: string;
  create_time: Date;
}

@Injectable()
export class AccountService {
  constructor(
    private readonly postgres: PostgresService,
    private readonly storage: StorageService,
    private readonly security: SecurityGenerationService
  ) {}

  async getAccount(session_id: number, account_id: number): Promise<AccountData> {
    const account = (await this.postgres.getAccountById(account_id))[0]
    if (!account) return Promise.reject(RESPONSE_CODE.DATABASE_ERROR)

    const encryptId = async (
      value: number | null,
      type: 'university' | 'faculty' | 'major',
    ): Promise<string | null> => value === null
      ? null
      : await this.security.crypt(JSON.stringify(ids(session_id, account_id, [id(value, type)])));

    return {
      avatar: account.avatar_id === null ? null : await this.security.crypt(
                  JSON.stringify(ids(session_id, account_id, [id(account.avatar_id, 'avatar')]))
              ),
      displayname: account.displayname,
      username: account.username,
      university_name: account.university_name,
      university_id: await encryptId(account.university_id, 'university'),
      faculty_name: account.faculty_name,
      faculty_id: await encryptId(account.faculty_id, 'faculty'),
      major_name: account.major_name,
      major_id: await encryptId(account.major_id, 'major'),
      role: account.role,
      status: account.status,
      create_time: account.create_time
    }
  }

  async setAvatar(
    accountId: number,
    fileName: string,
    content: Buffer,
  ): Promise<CreatedFileResponse> {
    const file = (await this.postgres.createFile(fileName, accountId))[0]
    if (!file) return Promise.reject(RESPONSE_CODE.DATABASE_ERROR)

    try {
      await this.storage.saveFile(file.src, content);
    } catch {
      await this.postgres.deleteFile(file.id, accountId).catch(() => {});
      return Promise.reject(RESPONSE_CODE.STORAGE_ERROR);
    }

    try {
      await this.postgres.setAccountAvatar(accountId, file.id);
    } catch (code) {
      await this.storage.deleteFile(file.src).catch(() => {});
      await this.postgres.deleteFile(file.id, accountId).catch(() => {});
      return Promise.reject(code as ResponseCode);
    }

    return file;
  }
}
