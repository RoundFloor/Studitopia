import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { RESPONSE_CODE } from '../../../common/response-code/code.config.js';

const message = RESPONSE_CODE.VALIDATION_ERROR.toString();

export class CreateCommentDto {
  @IsInt({ message })
  @Min(1, { message })
  readonly parent_comment_id: number;

  @IsString({ message })
  @IsNotEmpty({ message })
  readonly content: string;
}
