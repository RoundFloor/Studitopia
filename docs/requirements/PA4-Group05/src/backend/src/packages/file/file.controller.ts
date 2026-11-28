import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import type { Response as ExpressResponse } from 'express';
import { FileService } from './file.service.js';
import { Response } from '../../common/response.dto.js';
import { RESPONSE_CODE, ResponseCode } from '../../common/response-code/code.config.js';
import { Authenticated } from '../security-generation/sg.guard.js';
import { KeyReponse } from '../security-generation/dto/key-response.dto.js';
import { KeySession } from '../security-generation/decorators/token-bearer.decorators.js';

@Controller('api/v1/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Authenticated()
  @Get(':id')
  async getImage(
    @KeySession({type: 'access', force: true}) key: KeyReponse,
    @Param('id') id: string,
    @Res({ passthrough: true }) response: ExpressResponse,
  ): Promise<Response> {
    return await this.fileService.getImage(key.session_id, key.user_id, id).then(
      image => {
        response.setHeader('Content-Type', image.contentType)
        return new Response(HttpStatus.OK, image.data)
      },
      (code: ResponseCode) => code == RESPONSE_CODE.INVALID_ID
        ? new Response(HttpStatus.CONFLICT, [code])
        : new Response(HttpStatus.INTERNAL_SERVER_ERROR, [code]),
    );
  }
}
