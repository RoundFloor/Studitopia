import { Module } from '@nestjs/common';
import { PostgresModule } from '../postgres/pg.module.js';
import { SecurityGenerationModule } from '../security-generation/sg.module.js';
import { StorageModule } from '../storage/storage.module.js';
import { AccountController } from './account.controller.js';
import { AccountService } from './account.service.js';

@Module({
  imports: [PostgresModule, SecurityGenerationModule, StorageModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
