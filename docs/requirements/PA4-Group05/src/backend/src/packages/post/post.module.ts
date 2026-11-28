import { Module } from '@nestjs/common';
import { PostgresModule } from '../postgres/pg.module.js';
import { SecurityGenerationModule } from '../security-generation/sg.module.js';
import { PostController } from './post.controller.js';
import { PostService } from './post.service.js';

@Module({
  imports: [PostgresModule, SecurityGenerationModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
