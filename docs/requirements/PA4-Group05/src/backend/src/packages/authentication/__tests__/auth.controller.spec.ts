import { describe, it, beforeEach } from 'vitest';
import { AuthController } from '../auth.controller.js';
import { AuthenticationService } from '../auth.service.js';
import { AuthenticationServiceMock } from './auth.service.mock.js';
import { register_testcase } from '../../postgres/__tests__/pg.register.testcases.js';
import { PostgresModule } from '../../postgres/pg.module.js';
import { PostgresService } from '../../postgres/pg.service.js';
import { PostgresServiceMock } from '../../postgres/__tests__/pg.service.mock.js';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import resquest from 'supertest';
import { Test } from '@nestjs/testing';
import { EmailSenderModule } from '../../email-sender/email-sender.module.js';
import { EmailSenderService } from '../../email-sender/email-sender.service.js';
import { exceptionFactory } from '../../../common/exception-factory.js';
import { ResponseCode } from '../../../common/response-code/code.config.js';
import { HttpCodeInterceptor } from '../../../common/interceptor.js';
import { SecurityGenerationModule } from '../../security-generation/sg.module.js';
import { SecurityGenerationService } from '../../security-generation/sg.service.js';
import { SecurityGenerationServiceMock } from '../../security-generation/decorators/sg.mock.js';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(() => {
    controller = new AuthController(AuthenticationServiceMock);
  });

  describe('E2E Test', () => {
    let app: INestApplication;
    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [PostgresModule, EmailSenderModule, SecurityGenerationModule],
        controllers: [AuthController],
        providers: [AuthenticationService, PostgresService, EmailSenderService],
      })
        .overrideProvider(PostgresService)
        .useValue(PostgresServiceMock)
        .overrideProvider(SecurityGenerationService)
        .useValue(SecurityGenerationServiceMock)
        .compile();
      app = module.createNestApplication();
      app.useGlobalPipes(
        new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
          exceptionFactory: (errors) => exceptionFactory(errors),
        }),
      )
      app.useGlobalInterceptors(new HttpCodeInterceptor())

      await app.init();
    });
    afterEach(async () => {
      await app?.close();
    });

    describe('GET /auth/register', () => {
      it.each(register_testcase)(
        'GET /auth/register; [$displayname, $username, $email, $result]',
        async ({ displayname, username, email, password, result }) => {
          let code = 201
          if (result.length > 0) {
            if (result.every(value => (value > 46000 && value < 48000))) code = 409
            else code = 422
          }
          const response = await resquest(app.getHttpServer())
            .post(`/auth/register`)
            .send({
              displayname: displayname,
              username: username,
              email: email,
              password: password,
            })
            .expect(code);
          if (code != 201) {
            const body = response.body as ResponseCode[];
            expect(body, `Return ${JSON.stringify(body)}`).satisfies(
              (value: ResponseCode[]) =>
                value.every((i) => (result as ResponseCode[]).includes(i)),
            );
          }
          
        },
      );
    });
  });
});
