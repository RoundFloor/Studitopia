import { applyDecorators, UseGuards } from '@nestjs/common';
import { SecurityGenerationService } from './sg.service.js';

export function Authenticated() {
  return applyDecorators(
    UseGuards(SecurityGenerationService),
  );
}