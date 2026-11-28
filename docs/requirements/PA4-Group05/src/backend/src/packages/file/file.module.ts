import { Module } from '@nestjs/common';
import { PostgresModule } from '../postgres/pg.module.js';
import { StorageModule } from '../storage/storage.module.js';
import { SecurityGenerationModule } from '../security-generation/sg.module.js';
import { FileController } from './file.controller.js';
import { FileService } from './file.service.js';

@Module({
  imports: [PostgresModule, StorageModule, SecurityGenerationModule],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
