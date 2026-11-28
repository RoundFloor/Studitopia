import { Module } from '@nestjs/common';
import { AuthModule } from './packages/authentication/auth.module.js';
import { EmailSenderModule } from './packages/email-sender/email-sender.module.js';
import { WebModule } from './packages/web/web.module.js';
import { ForumModule } from './packages/forum/forum.module.js';
import { PostModule } from './packages/post/post.module.js';
import { TagModule } from './packages/tag/tag.module.js';
import { FileModule } from './packages/file/file.module.js';
import { AccountModule } from './packages/account/account.module.js';

@Module({
  imports: [
    AuthModule,
    EmailSenderModule,
    ForumModule,
    PostModule,
    TagModule,
    FileModule,
    AccountModule,
    WebModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
