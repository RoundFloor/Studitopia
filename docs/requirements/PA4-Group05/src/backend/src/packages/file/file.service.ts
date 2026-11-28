import { Injectable } from '@nestjs/common';
import { extname } from 'node:path';
import { PostgresService } from '../postgres/pg.service.js';
import { StorageService } from '../storage/storage.service.js';
import { SecurityGenerationService } from '../security-generation/sg.service.js';
import { RESPONSE_CODE } from '../../common/response-code/code.config.js';
import { ids } from '../../common/dto/id.dto.js';

const IMAGE_CONTENT_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
};

export interface ImageData {
  data: Buffer;
  contentType: string;
}

@Injectable()
export class FileService {
  constructor(
    private readonly postgres: PostgresService,
    private readonly storage: StorageService,
    private readonly securityService: SecurityGenerationService,
  ) {}

  async getImage(session_id: number, account_id: number, key: string): Promise<ImageData> {
    const decoded = await this.decode(key)
    if (decoded.session_id != session_id || decoded.account_id != account_id)
      return Promise.reject(RESPONSE_CODE.INVALID_ID)

    const fileRef = decoded.ids.find(value => value.type == 'avatar' || value.type == 'image')
    if (!fileRef || decoded.ids.length != 1) return Promise.reject(RESPONSE_CODE.INVALID_ID)

    const file = (await this.postgres.getFileById(fileRef.id))[0]
    if (!file) return Promise.reject(RESPONSE_CODE.DATABASE_ERROR)

    const data = await this.storage.readFile(file.src).catch(
      () => Promise.reject(RESPONSE_CODE.STORAGE_ERROR)
    );
    const extension = extname(file.name).toLowerCase()
    return {
      data,
      contentType: IMAGE_CONTENT_TYPES[extension] ?? 'application/octet-stream',
    };
  }

  private async decode(key: string): Promise<ids> {
    const decoded = await this.securityService.decrypt(key).then(
      value => {
        try {
          return JSON.parse(value) as ids
        } catch {
          return Promise.reject(RESPONSE_CODE.INVALID_ID)
        }
      },
      () => Promise.reject(RESPONSE_CODE.INVALID_ID),
    );
    if (!decoded || !Array.isArray(decoded.ids) || decoded.ids.some(value => !Number.isInteger(value.id)))
      return Promise.reject(RESPONSE_CODE.INVALID_ID)
    return decoded
  }
}
