import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { KeyReponse } from '../dto/key-response.dto.js';
import { RESPONSE_CODE } from '../../../common/response-code/code.config.js';

export const KeySession = createParamDecorator(
  (data: {
    type: 'access' | 'refresh',
    force: boolean
  }, ctx: ExecutionContext): KeyReponse => {
    const request = ctx.switchToHttp().getRequest();
    switch (data.type) {
      case 'access': {
        if (data.force) {
          if (!request.user || (request.user as KeyReponse).expired_time <= Date.now())
            throw new HttpException([RESPONSE_CODE.INVALID_ACCESS_TOKEN], HttpStatus.UNAUTHORIZED);
        }
        return request.user as KeyReponse;
      }
      case 'refresh': {
        const refresh = request.refresh as KeyReponse | undefined;
        if (data.force) {
          if (!refresh || refresh.expired_time <= Date.now())
            throw new HttpException([RESPONSE_CODE.INVALID_REFRESH_TOKEN], HttpStatus.UNAUTHORIZED);
        }
        return refresh as KeyReponse;
      }
    }
  }
);
