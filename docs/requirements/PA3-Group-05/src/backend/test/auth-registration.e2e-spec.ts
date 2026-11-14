import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { RESPONSE_CODE } from '../src/common/response-code/code.config.js';
import { HttpCodeInterceptor } from '../src/common/interceptor.js';
import { exceptionFactory } from '../src/common/exception-factory.js';
import { GLOBAL_PREFIX } from '../src/config/app.config.js';
import { PostgresService } from '../src/packages/postgres/pg.service.js';
import { PostgresServiceMock } from '../src/packages/postgres/__tests__/pg.service.mock.js';
import { storage } from '../src/packages/postgres/__tests__/pg.testcases.js';
import { SecurityGenerationService } from '../src/packages/security-generation/sg.service.js';
import { SecurityGenerationServiceMock } from '../src/packages/security-generation/decorators/sg.mock.js';
import { AppModule } from '../src/app.module.js';

describe('Auth registration (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PostgresService)
      .useValue(PostgresServiceMock)
      .overrideProvider(SecurityGenerationService)
      .useValue(SecurityGenerationServiceMock)
      .compile();

    storage.clean();
    app = module.createNestApplication();
    app.setGlobalPrefix(GLOBAL_PREFIX);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: (errors) => exceptionFactory(errors),
      }),
    );
    app.useGlobalInterceptors(new HttpCodeInterceptor());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('registers a valid account and rejects duplicate credentials', async () => {
    const payload = {
      displayname: 'Student AB',
      username: 'student.ab',
      email: 'student.ab@student.hcmus.edu.vn',
      password: 'Secure@123456',
    };

    const created = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send(payload)
      .expect(201);
    expect(created.body.access_token).toBeTruthy();
    expect(created.body.role).toBe('STUDENT');
    expect(created.body.status).toBe('INACTIVE');
    expect(created.headers['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringContaining('refresh_token=')]),
    );

    const duplicate = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send(payload)
      .expect(409);
    expect(duplicate.body).toEqual(
      expect.arrayContaining([
        RESPONSE_CODE.DUPLICATED_USERNAME,
        RESPONSE_CODE.DUPLICATED_EMAIL,
      ]),
    );
  });

  it('rejects registration with multiple invalid fields without creating an account', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({
        displayname: 'short',
        username: 'Bad.Name',
        email: 'bad-email',
        password: 'weak',
      })
      .expect(422);

    expect(response.body).toEqual(
      expect.arrayContaining([
        RESPONSE_CODE.INVALID_DISPLAYNAME,
        RESPONSE_CODE.INVALID_USERNAME,
        RESPONSE_CODE.INVALID_EMAIL,
        RESPONSE_CODE.INVALID_PASSWORD,
      ]),
    );
    expect(storage.sessions).toHaveLength(0);
  });
});
