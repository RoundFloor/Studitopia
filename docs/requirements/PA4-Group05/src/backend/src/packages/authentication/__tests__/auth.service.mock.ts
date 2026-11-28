import { RESPONSE_CODE, ResponseCode } from "../../../common/response-code/code.config.js";
import { PostgresServiceMock } from "../../postgres/__tests__/pg.service.mock.js";
import { AuthenticationService } from "../auth.service.js";
import { validate_displayname, validate_password } from "../../postgres/__tests__/pool.mock.js";
import { RegisterDto } from "../dto/register.dto.js";
import { SecurityGenerationServiceMock } from "../../security-generation/decorators/sg.mock.js";

export const AuthenticationServiceMock = {
    register: vi.fn(async (dto: RegisterDto) => {
      try {
        const codes: ResponseCode[] = []
        if (!validate_displayname(dto.displayname)) codes.push(RESPONSE_CODE.INVALID_DISPLAYNAME);
        if (!validate_password(dto.password)) codes.push(RESPONSE_CODE.INVALID_PASSWORD);
        await Promise.all([
          PostgresServiceMock.validate_username(dto.username).catch((code: ResponseCode) => {
            codes.push(code);
          }),
          PostgresServiceMock.validate_email(dto.email).catch((code: ResponseCode) => {
            codes.push(code);
          })
        ])
        if (codes.length) throw codes;

        return await PostgresServiceMock.register(dto.displayname, dto.username, dto.email, dto.password).then(
          value => ({
            refresh_token: SecurityGenerationServiceMock.createRefreshToken(value.session_id, value.user_id),
            access_token: SecurityGenerationServiceMock.createAcessToken(value.session_id, value.user_id),
            role: value.role,
            status: value.status
          }),
          (code: ResponseCode) => { throw code; },
        );
      } catch (error) {
        throw Array.isArray(error) ? error : error as ResponseCode;
      }
    })
} as any as AuthenticationService;
