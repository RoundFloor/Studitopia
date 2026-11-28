import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { PostService } from './post.service.js';
import { Response } from '../../common/response.dto.js';
import { RESPONSE_CODE, ResponseCode } from '../../common/response-code/code.config.js';
import { Authenticated } from '../security-generation/sg.guard.js';
import { KeyReponse } from '../security-generation/dto/key-response.dto.js';
import { KeySession } from '../security-generation/decorators/token-bearer.decorators.js';

@Controller('api/v1/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Authenticated()
  @Get('relevant')
  async getRelevantPosts(
    @KeySession({type: 'access', force: true}) key: KeyReponse,
    @Query('include') include: string | string[] | undefined,
    @Query('exclude') exclude: string | string[] | undefined,
  ): Promise<Response> {
    const toKeys = (value: string | string[] | undefined): string[] =>
      value === undefined ? [] : Array.isArray(value) ? value : [value]
    return await this.postService.getRelevantPosts(
      key.session_id,
      key.user_id,
      toKeys(include),
      toKeys(exclude),
    ).then(
      value => new Response(HttpStatus.OK, value),
      (code: ResponseCode) => code == RESPONSE_CODE.INVALID_ID
        ? new Response(HttpStatus.CONFLICT, [code])
        : new Response(HttpStatus.INTERNAL_SERVER_ERROR, [code]),
    );
  }

  @Authenticated()
  @Get(':id')
  async getPost(
    @KeySession({type: 'access', force: true}) key: KeyReponse,
    @Param('id') id: string,
  ): Promise<Response> {
    return await this.postService.getPost(key.session_id, key.user_id, id).then(
      value => new Response(HttpStatus.OK, value),
      (code: ResponseCode) => code == RESPONSE_CODE.INVALID_ID
        ? new Response(HttpStatus.CONFLICT, [code])
        : new Response(HttpStatus.INTERNAL_SERVER_ERROR, [code]),
    );
  }
}
