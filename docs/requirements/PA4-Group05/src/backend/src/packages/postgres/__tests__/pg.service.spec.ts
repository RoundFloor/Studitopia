vi.mock('pg', () => ({
  DatabaseError: vi.fn(),
  Pool: vi.fn(function () {
    return {
      query: (query: string, params: unknown[]) =>
        PoolMock.query(query, params),
      connect: vi.fn(),
      end: vi.fn(),
    };
  }),
}));

vi.mock('pg-protocol', async (importOriginal) => {
  const actual = await importOriginal<typeof import('pg-protocol')>();

  return {
    ...actual,
    DatabaseError: vi.fn(function (code: number) {
      return Object.assign(new Error(''), {
        code: code,
      });
    }),
  };
});

import { RESPONSE_CODE, ResponseCode } from '../../../common/response-code/code.config.js';
import { username_test } from '../../authentication/__tests__/auth.testcase.js';
import { EnvironmentService } from '../../environment/environment.service.js';
import { PostgresService } from '../pg.service.js';
import { register_testcase } from './pg.register.testcases.js';
import { PoolMock } from './pool.mock.js';
import { email_testcase } from './pg.testcases.js';
import { PostgresServiceMock } from './pg.service.mock.js';

describe('Postgres', () => {
  let service: PostgresService;

  const expectValidation = async (promise: Promise<void>, result: ResponseCode) => {
    if (result === RESPONSE_CODE.SUCCESS)
      await expect(promise).resolves.toBeUndefined();
    else
      await expect(promise).rejects.toEqual(result);
  };

  beforeAll(() => {
    const env = {
      get: async <T>(_name: string, _description: string, fallback: T) => fallback,
    } as unknown as EnvironmentService;
    service = new PostgresService(env);
  });
  describe('Email validation', () => {
    it.each(email_testcase)('[$email, $result]', async ({ email, result }) => {
      await expectValidation(
        PostgresServiceMock.validate_email(email),
        result,
      );
      await expectValidation(service.validate_email(email), result);
    });
  });
  describe('Username validation', () => {
    it.each(username_test)(
      '[$username, $result]',
      async ({ username, result }) => {
        await expectValidation(
          PostgresServiceMock.validate_username(username),
          result,
        );
        await expectValidation(service.validate_username(username), result);
      },
    );
  });
  describe('Resgister validation', () => {
    describe('Real object', () => {
      it.each(register_testcase)(
        '[$username, $email, $displayname, $password, $result]',
        async ({ username, email, displayname, password, result }) => {
          const promise = service.register(displayname, username, email, password);
          if (result.length === 0)
            await expect(promise).resolves.toBeDefined();
          else
            await expect(promise).rejects.toBeOneOf(result);
        },
      );
    });
    // describe("Mock object", () => {
    //   it.each(register_testcase)("[$username, $email, $displayname, $password, $result]",
    //     async ({ username, email, displayname, password, result }) => {
    //       expect((await PostgresServiceMock.register(displayname, username, email, password)).code).toBeOneOf(result)
    //     })
    // })
  });
});
