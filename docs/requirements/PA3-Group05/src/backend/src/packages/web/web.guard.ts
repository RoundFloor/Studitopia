import { applyDecorators, UseGuards } from '@nestjs/common';
import { WebService } from './web.service.js';



export function WebBased() {
  return applyDecorators(
    UseGuards(WebService),
  );
}