import { RESPONSE_CODE, ResponseCode } from "../../../common/response-code/code.config.js";
import { PostgresServiceMock } from "../../postgres/__tests__/pg.service.mock.js";
import { AuthenticationService } from "../auth.service.js";
import { validate_displayname, validate_password } from "../../postgres/__tests__/pool.mock.js";
import { RegisterDto } from "../dto/register.dto.js";
import { SecurityGenerationService } from "../../security-generation/sg.service.js";

const securityService = new SecurityGenerationService({
    HASH_ALGORITHM: 'sha256',
    OTP_SECRET_KEY: 'test-otp-secret',
    AC_SECRET_KEY: 'test-access-secret',
    RF_SECRET_KEY: 'test-refresh-secret',
    OTP_DURATION: 60 * 1000,
    AC_DURATION: 30 * 60 * 1000,
    RF_DURATION: 30 * 24 * 60 * 1000,
    SIGNATURE_LENGTH: 32
});

export const AuthenticationServiceMock = {
    register: vi.fn(async (dto: RegisterDto) => {
      let result: ResponseCode[] = []
      if (!validate_displayname(dto.displayname)) result.push(RESPONSE_CODE.INVALID_DISPLAYNAME);
      if (!validate_password(dto.password)) result.push(RESPONSE_CODE.INVALID_PASSWORD);
      let [uc, ec] = await Promise.all([
        PostgresServiceMock.validate_username(dto.username),
        PostgresServiceMock.validate_email(dto.email)
      ])
      if (uc != RESPONSE_CODE.SUCCESS) result.push(uc);
      if (ec != RESPONSE_CODE.SUCCESS) result.push(ec);
      if (result.length != 0) return { codes: result };
      return await PostgresServiceMock.register(dto.displayname, dto.username, dto.email, dto.password).then(value => {
        if (value.code != RESPONSE_CODE.SUCCESS || !value.data) return { codes: [value.code] };
        return {
          codes: [],
          data: {
            refresh_token: securityService.createRefreshToken(value.data.session_id, value.data.user_id),
            access_token: securityService.createAcessToken(value.data.session_id, value.data.user_id),
            role: value.data.role,
            status: value.data.status
          }
        }
      })
    })
} as any as AuthenticationService;
