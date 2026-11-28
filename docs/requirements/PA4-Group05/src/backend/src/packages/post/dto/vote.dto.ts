import { IsIn, IsOptional } from 'class-validator';
import { RESPONSE_CODE } from '../../../common/response-code/code.config.js';

const message = RESPONSE_CODE.VALIDATION_ERROR.toString();

export class VoteDto {
  @IsOptional()
  @IsIn([0, 1], { message })
  readonly type?: 0 | 1;
}
