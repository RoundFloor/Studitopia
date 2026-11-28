import { Injectable } from '@nestjs/common';
import { PostgresService } from '../postgres/pg.service.js';
import { PostResponse } from './dto/post.dto.js';
import { toPostResponse } from './post.mapper.js';
import { CommentResponse } from '../postgres/dto/response.dto.js';
import { SecurityGenerationService } from '../security-generation/sg.service.js';
import { ids } from '../../common/dto/id.dto.js';
import { RESPONSE_CODE } from '../../common/response-code/code.config.js';

@Injectable()
export class PostService {
  constructor(private readonly postgres: PostgresService, private readonly securityService: SecurityGenerationService) {}

  async getPost(session_id: number, account_id: number, key: string): Promise<PostResponse> {
    const decoded = await this.decode(key)
    const post = decoded.ids.find(value => value.type == 'post')
    if (!post) return Promise.reject(RESPONSE_CODE.INVALID_ID)
    const value = (await this.postgres.getPostById(post.id))[0]
    if (!value) return Promise.reject(RESPONSE_CODE.DATABASE_ERROR)
    return await toPostResponse(value, this.securityService, session_id, account_id, 'post-retrieve');
  }

  async getRelevantPosts(session_id: number, account_id: number, included: string[], excluded: string[]): Promise<PostResponse[]> {
    const includedTags = await this.collectTagIds(included)
    const excludedTags = await this.collectTagIds(excluded)
    const posts = await this.postgres.getPost(includedTags, excludedTags)
    return await Promise.all(
      posts.map(async value => await toPostResponse(value, this.securityService, session_id, account_id, 'post'))
    );
  }

  async getComments(postId: number): Promise<CommentResponse[]> {
    return await this.postgres.getComment(postId);
  }

  async getReplies(commentId: number): Promise<CommentResponse[]> {
    return await this.postgres.getCommentOfComment(commentId);
  }

  private async collectTagIds(keys: string[]): Promise<number[]> {
    const tagIds: number[] = []
    for (const key of keys) {
      const decoded = await this.decode(key)
      tagIds.push(...decoded.ids.map(value => value.id))
    }
    return [...new Set(tagIds)]
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
