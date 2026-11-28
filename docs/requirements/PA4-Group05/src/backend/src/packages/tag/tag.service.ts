import { Injectable } from '@nestjs/common';
import { PostgresService } from '../postgres/pg.service.js';
import { RelevantTagResponse, SimpleTag, TagDetailResponse, TagResponse, TagsByIdResponse } from './dto/tag.dto.js';
import { SecurityGenerationService } from '../security-generation/sg.service.js';
import { id, ids } from '../../common/dto/id.dto.js';
import { RESPONSE_CODE } from '../../common/response-code/code.config.js';

@Injectable()
export class TagService {
  constructor(private readonly postgres: PostgresService, private readonly securityService: SecurityGenerationService) {}

  async getTags(session_id: number, account_id: number, category?: string): Promise<TagResponse[]> {
    const tags = await this.postgres.getTag(category)
    return await Promise.all(
      tags.map(async value => TagResponse(
        await this.securityService.crypt(JSON.stringify(ids(session_id, account_id, [id(value.id, 'other')]))),
        value.name,
        value.num_tag,
        value.num_post,
        value.icon,
        value.hot,
        value.description,
      ))
    );
  }

  async getRelevantTags(session_id: number, account_id: number, keys: string[]): Promise<RelevantTagResponse[]> {
    const tagIds: number[] = []
    for (const key of keys) {
      const decoded = await this.decode(key)
      tagIds.push(...decoded.ids.map(value => value.id))
    }
    if (!tagIds.length) return Promise.reject(RESPONSE_CODE.INVALID_ID)
    const tags = await this.postgres.getRelevantTag([...new Set(tagIds)])
    return await Promise.all(
      tags.map(async value => RelevantTagResponse(
        await this.securityService.crypt(JSON.stringify(ids(session_id, account_id, [id(value.id, 'other')]))),
        value.name,
        value.num_post,
      ))
    );
  }

  async getTagsById(session_id: number, account_id: number, key: string): Promise<TagsByIdResponse[]> {
    const tagIds: number[] = (await this.decode(key)).ids.map(value => value.id)
    const tags = await this.postgres.getTagsById([...new Set(tagIds)])
    return await Promise.all(
      tags.map(async value => TagsByIdResponse(
        await this.securityService.crypt(JSON.stringify(ids(session_id, account_id, [id(value.id, 'other')]))),
        value.name,
        value.category,
      ))
    );
  }

  async getTag(session_id: number, account_id: number, key: string): Promise<TagDetailResponse> {
    const decoded = await this.decode(key)
    if (decoded.ids.length != 1) return Promise.reject(RESPONSE_CODE.INVALID_ID)
    const rows = await this.postgres.getTagById(decoded.ids[0].id)
    const value = rows[0]
    if (!value) return Promise.reject(RESPONSE_CODE.DATABASE_ERROR)
    return TagDetailResponse(
      await this.securityService.crypt(JSON.stringify(ids(session_id, account_id, [id(value.id, 'other')]))),
      value.name,
      value.num_tag,
      value.num_post,
      value.category,
      value.created_time,
      value.icon,
      value.hot,
      value.description,
    );
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
