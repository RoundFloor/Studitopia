import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { TagService } from './tag.service.js';
import { Response } from '../../common/response.dto.js';
import { RESPONSE_CODE, ResponseCode } from '../../common/response-code/code.config.js';
import { Authenticated } from '../security-generation/sg.guard.js';
import { KeyReponse } from '../security-generation/dto/key-response.dto.js';
import { KeySession } from '../security-generation/decorators/token-bearer.decorators.js';

@Controller('api/v1/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Authenticated()
  @Get('relevant')
  async getRelevantTags(
    @KeySession({type: 'access', force: true}) key: KeyReponse,
    @Query('id') id: string | string[],
  ): Promise<Response> {
    const keys = id === undefined ? [] : Array.isArray(id) ? id : [id]
    if (!keys.length)
      return new Response(HttpStatus.BAD_REQUEST, [RESPONSE_CODE.VALIDATION_ERROR])
    return await this.tagService.getRelevantTags(key.user_id, key.session_id, keys).then(
      value => new Response(HttpStatus.OK, value),
      (code: ResponseCode) => code == RESPONSE_CODE.INVALID_ID
        ? new Response(HttpStatus.CONFLICT, [code])
        : new Response(HttpStatus.INTERNAL_SERVER_ERROR, [code]),
    );
  }

  @Authenticated()
  @Get('resolve/:id')
  async resolve(
    @KeySession({type: 'access', force: true}) key: KeyReponse,
    @Param('id') id: string,
  ): Promise<Response> {
    return await this.tagService.getTagsById(key.session_id, key.user_id, id).then(
      value => new Response(HttpStatus.OK, value),
      (code: ResponseCode) => code == RESPONSE_CODE.INVALID_ID
        ? new Response(HttpStatus.CONFLICT, [code])
        : new Response(HttpStatus.INTERNAL_SERVER_ERROR, [code]),
    );
  }

  @Authenticated()
  @Get(':id')
  async getTag(
    @KeySession({type: 'access', force: true}) key: KeyReponse,
    @Param('id') id: string,
  ): Promise<Response> {
    return await this.tagService.getTag(key.session_id, key.user_id, id).then(
      value => new Response(HttpStatus.OK, value),
      (code: ResponseCode) => code == RESPONSE_CODE.INVALID_ID
        ? new Response(HttpStatus.CONFLICT, [code])
        : new Response(HttpStatus.INTERNAL_SERVER_ERROR, [code]),
    );
  }

  @Authenticated()
  @Get()
  async getTags(
    @KeySession({type: 'access', force: true}) key: KeyReponse
  ): Promise<Response> {
    return await this.tagService.getTags(key.session_id, key.user_id).then(
      value => new Response(HttpStatus.OK, value),
      (code: ResponseCode) => code == RESPONSE_CODE.INVALID_ID
        ? new Response(HttpStatus.CONFLICT, [code])
        : new Response(HttpStatus.INTERNAL_SERVER_ERROR, [code]),
    );
  }
}
