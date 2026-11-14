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

import { username_test } from '../../authentication/__tests__/auth.testcase.js';
import { PostgresService } from '../pg.service.js';
import { register_testcase } from './pg.register.testcases.js';
import { PoolMock } from './pool.mock.js';
import { email_testcase } from './pg.testcases.js';
import { PostgresServiceMock } from './pg.service.mock.js';

describe('Postgres', () => {
  let service: PostgresService;
  beforeAll(() => {
    service = new PostgresService();
  });
  describe('Email validation', () => {
    it.each(email_testcase)('[$email, $result]', async ({ email, result }) => {
      expect(
        await PostgresServiceMock.validate_email(email),
        'Failed to check mock object!',
      ).toEqual(result);
      expect(
        await service.validate_email(email),
        'Failed to check real object!',
      ).toEqual(result);
    });
  });
  describe('Username validation', () => {
    it.each(username_test)(
      '[$username, $result]',
      async ({ username, result }) => {
        expect(
          await PostgresServiceMock.validate_username(username),
          'Failed to check mock object!',
        ).toEqual(result);
        expect(
          await service.validate_username(username),
          'Failed to check real object!',
        ).toEqual(result);
      },
    );
  });
  describe('Resgister validation', () => {
    describe('Real object', () => {
      it.each(register_testcase)(
        '[$username, $email, $displayname, $password, $result]',
        async ({ username, email, displayname, password, result }) => {
          expect(
            (await service.register(displayname, username, email, password))
              .code,
          ).toBeOneOf(result);
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
