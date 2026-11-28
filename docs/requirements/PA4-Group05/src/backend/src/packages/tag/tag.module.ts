import { Module } from '@nestjs/common';
import { PostgresModule } from '../postgres/pg.module.js';
import { SecurityGenerationModule } from '../security-generation/sg.module.js';
import { TagController } from './tag.controller.js';
import { TagService } from './tag.service.js';

@Module({
  imports: [PostgresModule, SecurityGenerationModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
