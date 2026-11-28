import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { RESPONSE_CODE } from '../../../common/response-code/code.config.js';

const message = RESPONSE_CODE.VALIDATION_ERROR.toString();

export class CreatePostDto {
  @IsString({ message })
  @IsNotEmpty({ message })
  readonly title: string;

  @IsString({ message })
  @IsNotEmpty({ message })
  readonly content: string;

  @IsArray({ message })
  @ArrayNotEmpty({ message })
  @IsInt({ each: true, message })
  readonly tags: number[];
}
