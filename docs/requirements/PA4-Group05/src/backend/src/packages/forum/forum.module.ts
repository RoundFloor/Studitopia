import { Module } from '@nestjs/common';
import { PostgresModule } from '../postgres/pg.module.js';
import { SecurityGenerationModule } from '../security-generation/sg.module.js';
import { ForumController } from './forum.controller.js';
import { ForumService } from './forum.service.js';

@Module({
  imports: [PostgresModule, SecurityGenerationModule],
  controllers: [ForumController],
  providers: [ForumService],
  exports: [ForumService],
})
export class ForumModule {}
