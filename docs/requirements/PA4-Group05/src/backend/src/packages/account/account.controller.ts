import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  RawBody,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { AccountService } from './account.service.js';
import { Authenticated } from '../security-generation/sg.guard.js';
import { KeySession } from '../security-generation/decorators/token-bearer.decorators.js';
import { KeyReponse } from '../security-generation/dto/key-response.dto.js';
import { Response } from '../../common/response.dto.js';
import { RESPONSE_CODE, ResponseCode } from '../../common/response-code/code.config.js';
import { ContentType } from '../../common/decorators/content-type.decorators.js';

const IMAGE_EXTENSIONS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
};

@Controller('api/v1/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  private imageName(request: Request, contentType: string): string {
    const header = request.headers['x-file-name'];
    const provided = Array.isArray(header) ? header[0] : header;
    if (provided && provided.trim()) return provided.trim();

    const extension = IMAGE_EXTENSIONS[contentType] ?? 'img';
    return `avatar.${extension}`;
  }

  @Get('me')
  @Authenticated()
  async getMe(
    @KeySession({ type: 'access', force: true }) key: KeyReponse,
  ): Promise<Response> {
    return await this.accountService.getAccount(key.session_id, key.user_id).then(
      data => new Response(HttpStatus.ACCEPTED, data),
      (code: ResponseCode) => new Response(HttpStatus.INTERNAL_SERVER_ERROR, [code])
    )
  }

  @Patch('me/avatar')
  @Authenticated()
  async setAvatar(
    @KeySession({ type: 'access', force: true }) key: KeyReponse,
    @ContentType() contentType: string,
    @RawBody() buffer: Buffer
  ): Promise<Response> {
    const isImage = contentType.startsWith('image/');
    const isBinary = contentType === 'application/octet-stream';

    if ((!isImage && !isBinary) || !Buffer.isBuffer(buffer))
      return new Response(HttpStatus.BAD_REQUEST, [
        RESPONSE_CODE.VALIDATION_ERROR,
      ]);

    if (buffer.length === 0)
      return new Response(HttpStatus.BAD_REQUEST, [
        RESPONSE_CODE.VALIDATION_ERROR,
      ]);

    return await this.accountService.setAvatar(
        key.user_id,
        `avatar.${IMAGE_EXTENSIONS[contentType]}`,
        buffer
    ).then(_ => new Response(HttpStatus.OK))
    .catch((code: ResponseCode) => new Response(HttpStatus.BAD_REQUEST, [code]))
  }

  @Patch('me')
  @Authenticated()
  async updateAccount(): Promise<Response> {
    return new Response(HttpStatus.NOT_IMPLEMENTED, [
      RESPONSE_CODE.NOT_IMPLEMENTED,
    ]);
  }

  @Delete('me')
  @Authenticated()
  async deleteAccount(): Promise<Response> {
    return new Response(HttpStatus.NOT_IMPLEMENTED, [
      RESPONSE_CODE.NOT_IMPLEMENTED,
    ]);
  }
}
