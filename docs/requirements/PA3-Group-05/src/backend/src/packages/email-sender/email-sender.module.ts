import { Module } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service.js';

@Module({
  providers: [EmailSenderService],
  exports: [EmailSenderService],
})
export class EmailSenderModule {}
