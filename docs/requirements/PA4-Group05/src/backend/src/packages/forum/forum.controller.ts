import {
  Controller,
  Get,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ForumService } from './forum.service.js';
import { Response } from '../../common/response.dto.js';
import { RESPONSE_CODE, ResponseCode } from '../../common/response-code/code.config.js';
import { SecurityGenerationService } from '../security-generation/sg.service.js';
import { Authenticated } from '../security-generation/sg.guard.js';
import { KeyReponse } from '../security-generation/dto/key-response.dto.js';
import { KeySession } from '../security-generation/decorators/token-bearer.decorators.js';
import { ids } from '../../common/dto/id.dto.js';

@Controller('api/v1/forum')
export class ForumController {
  constructor(private readonly forumService: ForumService, private readonly securityService: SecurityGenerationService) {}

  @Authenticated()
  @Get()
  async getId(
    @KeySession({ type: "access", force: true }) key: KeyReponse,
  ): Promise<Response>
  {
    return await this.forumService.getUniversities(key.user_id, key.session_id).then(value =>
      new Response(HttpStatus.OK, value)
    ).catch(_ => new Response(HttpStatus.INTERNAL_SERVER_ERROR, [RESPONSE_CODE.UNKNOWN_ERROR]));
  }

  @Authenticated()
  @Get(':id')
  async getAreas(
    @KeySession({type: 'access', force: true}) key: KeyReponse,
    @Param('id') id: string,
  ): Promise<Response> {
    const old_ids = JSON.parse(await this.securityService.decrypt(id)) as ids
    if (old_ids.ids.find(value => value.type == 'university')) {
      if (old_ids.ids.length == 1) {
        return await this.forumService.getAreas(key.user_id, key.session_id, id).then(
          value => new Response(HttpStatus.OK, value)
        ).catch(_ => new Response(HttpStatus.INTERNAL_SERVER_ERROR, [RESPONSE_CODE.UNKNOWN_ERROR]));
      }
      else if (old_ids.ids.find(value => value.type == 'area')) {
        if (old_ids.ids.length == 2) {
          return await this.forumService.getSubjects(key.user_id, key.session_id, id).then(
            value => new Response(HttpStatus.OK, value)
          ).catch(_ => new Response(HttpStatus.INTERNAL_SERVER_ERROR, [RESPONSE_CODE.UNKNOWN_ERROR]));
        }
        else if (old_ids.ids.find(value => value.type == 'subject')) {
          if (old_ids.ids.find(value => value.type == 'post'))
            return new Response(HttpStatus.CONFLICT, [RESPONSE_CODE.INVALID_ID])
          return await this.forumService.getPosts(key.user_id, key.session_id, id).then(
            value => new Response(HttpStatus.OK, value)
          ).catch((code: ResponseCode) => code == RESPONSE_CODE.INVALID_ID
            ? new Response(HttpStatus.CONFLICT, [code])
            : new Response(HttpStatus.INTERNAL_SERVER_ERROR, [code]));
        }

      }
    }
    return new Response(HttpStatus.CONFLICT, [RESPONSE_CODE.INVALID_ID])
  }
}
