import { Module } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service.js';
import { EnvironmentService } from '../environment/environment.service.js';
import { EnvironmentModule } from '../environment/environment.module.js';

@Module({
  imports: [EnvironmentModule, EnvironmentModule],
  providers: [EmailSenderService],
  exports: [EmailSenderService],
})
export class EmailSenderModule {}
