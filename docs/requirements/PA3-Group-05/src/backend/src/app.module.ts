import { Module } from '@nestjs/common';
import { AuthModule } from './packages/authentication/auth.module.js';
import { EmailSenderModule } from './packages/email-sender/email-sender.module.js';
import { WebModule } from './packages/web/web.module.js';

@Module({
  imports: [AuthModule, EmailSenderModule, WebModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
