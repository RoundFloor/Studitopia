import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Response as MResponse} from './response.dto.js'

@Injectable()
export class HttpCodeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<MResponse>): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        response.status(data.statusCode);
        data.cookies?.forEach((value, key) => {
          response.cookie(key, value.value, value.options)
          })
        return data.data;
      }),
    );
  }
}
