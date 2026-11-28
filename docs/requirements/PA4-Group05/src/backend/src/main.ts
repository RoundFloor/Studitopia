import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { PORT } from './config/app.config.js';
import { ValidationPipe } from '@nestjs/common';
import { exceptionFactory } from './common/exception-factory.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import { HttpCodeInterceptor } from './common/interceptor.js';
import { STORAGE_MAX_FILE_SIZE } from './packages/storage/storage.config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn']
  });

  app.enableCors({
    origin: "https://localhost:8999",
    credentials: true
  })

  app.use(cookieParser());
  app.use(
    '/api/v1/account/me/avatar',
    express.raw({
      type: ['image/*', 'application/octet-stream'],
      limit: STORAGE_MAX_FILE_SIZE,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => exceptionFactory(errors),
    }),
  );

  app.useGlobalInterceptors(new HttpCodeInterceptor());

  await app.listen(PORT);
}
await bootstrap();
