import { Module } from '@nestjs/common';
import { PostgresModule } from '../postgres/pg.module.js';
import { EmailSenderModule } from '../email-sender/email-sender.module.js';
import { AuthController } from './auth.controller.js';
import { AuthenticationService } from './auth.service.js';
import { SecurityGenerationModule } from '../security-generation/sg.module.js';

@Module({
  imports: [PostgresModule, EmailSenderModule, SecurityGenerationModule],
  controllers: [AuthController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthModule {}
