import { Injectable } from '@nestjs/common';
import { PostgresService } from '../postgres/pg.service.js';
import { PostResponse } from '../post/dto/post.dto.js';
import { toPostResponse } from '../post/post.mapper.js';
import { TagResponse } from '../tag/dto/tag.dto.js';
import { SecurityGenerationService } from '../security-generation/sg.service.js';
import { id, ids } from '../../common/dto/id.dto.js';
import { RESPONSE_CODE } from '../../common/response-code/code.config.js';

@Injectable()
export class ForumService {
  constructor(private readonly postgres: PostgresService, private readonly securityService: SecurityGenerationService) {}

  async getUniversities(account_id: number, session_id: number): Promise<TagResponse[]> {
    const tags = await this.postgres.getTag('university');
    return await Promise.all(
      tags.map(async value => {
        const idt = ids(session_id, account_id, [id(value.id, 'university')])
        return TagResponse(
          await this.securityService.crypt(JSON.stringify(idt)),
          value.name,
          value.num_tag,
          value.num_post,
          value.icon,
          value.hot,
          value.description
        )
      })
    );
  }

  async getAreas(account_id: number, session_id: number, key: string): Promise<TagResponse[]> {
    const old_ids = JSON.parse(await this.securityService.decrypt(key)) as ids
    const university = old_ids.ids.find(value => value.type == 'university')
    if (!university) return []
    const areas = await this.postgres.getArea(university.id)
    return await Promise.all(
      areas.map(async value => {
        const idt = ids(session_id, account_id, [...old_ids.ids, id(value.id, 'area')])
        return TagResponse(
          await this.securityService.crypt(JSON.stringify(idt)),
          value.name,
          value.num_tag,
          value.num_post,
          value.icon,
          value.hot,
          value.description
        )
      })
    );
  }

  async getSubjects(account_id: number, session_id: number, key: string): Promise<TagResponse[]> {
    const old_ids = JSON.parse(await this.securityService.decrypt(key)) as ids
    const area = old_ids.ids.find(value => value.type == 'area')
    if (!area) return []
    const subjects = await this.postgres.getSubject(area.id)
    return await Promise.all(
      subjects.map(async value => {
        const idt = ids(session_id, account_id, [...old_ids.ids, id(value.id, 'subject')])
        return TagResponse(
          await this.securityService.crypt(JSON.stringify(idt)),
          value.name,
          value.num_tag,
          value.num_post,
          value.icon,
          value.hot,
          value.description
        )
      })
    );
  }

  async getPosts(session_id: number, account_id: number, key: string): Promise<PostResponse[]> {
    const old_ids = JSON.parse(await this.securityService.decrypt(key)) as ids
    if (old_ids.ids.find(value => value.type == 'post'))
      return Promise.reject(RESPONSE_CODE.INVALID_ID)
    const posts = await this.postgres.getPost(old_ids.ids.map(id => id.id), [])
    return await Promise.all(
      posts.map(async value => await toPostResponse(value, this.securityService, session_id, account_id, 'post'))
    );
  }
}
