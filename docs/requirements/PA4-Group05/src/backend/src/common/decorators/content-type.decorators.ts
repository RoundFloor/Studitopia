import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { RESPONSE_CODE } from '../response-code/code.config.js';

export const ContentType = createParamDecorator(
  (ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.contentType;
  }
);
