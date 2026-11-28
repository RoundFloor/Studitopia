import { PostgresServiceMock } from '../../postgres/__tests__/pg.service.mock.js';
import { EmailSenderServiceMock } from '../../email-sender/__tests__/email-sender.service.mock.js';
import { AuthenticationService } from '../auth.service.js';
import { AuthenticationServiceMock } from './auth.service.mock.js';
import {
  displayname_test,
  generateRandomDisplayName,
  generateRandomPassword,
  generateRandomUsername,
  password_test,
  username_test,
} from './auth.testcase.js';
import { register_testcase } from '../../postgres/__tests__/pg.register.testcases.js';
import { SecurityGenerationService } from '../../security-generation/sg.service.js';

describe('Authentication Service', () => {
  let service: AuthenticationService;
  beforeAll(() => {
    service = new AuthenticationService(
      PostgresServiceMock,
      EmailSenderServiceMock, 
      new SecurityGenerationService({
        HASH_ALGORITHM: 'sha256',
        OTP_SECRET_KEY: 'test-otp-secret',
        AC_SECRET_KEY: 'test-access-secret',
        RF_SECRET_KEY: 'test-refresh-secret',
        OTP_DURATION: 60 * 1000,
        AC_DURATION: 30 * 60 * 1000,
        RF_DURATION: 30 * 24 * 60 * 1000,
        SIGNATURE_LENGTH: 32
      })
    );
    // vi.spyOn(service, "validate_displayname").mockImplementation()
  });
  describe('Register', () => {
    it.each(register_testcase)(
      '[$displayname, $username, $email, $password, $result]',
      async ({ displayname, username, email, password, result }) => {
        const promise = service.register({
          displayname,
          username,
          email,
          password,
        });
        if (result.length === 0)
          await expect(promise).resolves.toBeDefined();
        else {
          const codes = await promise.catch((error: unknown) => error);
          expect(result).toEqual(expect.arrayContaining(Array.isArray(codes) ? codes : [codes]));
        }
      },
    );
  });
});
