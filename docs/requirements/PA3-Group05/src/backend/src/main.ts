import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { PORT } from './config/app.config.js';
import { ValidationPipe } from '@nestjs/common';
import { exceptionFactory } from './common/exception-factory.js';
import cookieParser from 'cookie-parser';
import { HttpCodeInterceptor } from './common/interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => exceptionFactory(errors),
  }))
  app.useGlobalInterceptors(new HttpCodeInterceptor())

  await app.listen(PORT);
}
await bootstrap();
