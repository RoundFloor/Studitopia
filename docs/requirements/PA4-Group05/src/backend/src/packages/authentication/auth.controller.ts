import { Body, Controller, Get, HttpStatus, Post, Query } from "@nestjs/common";
import { AuthenticationService } from "./auth.service.js";
import { SessionData } from "./auth.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { Authenticated } from "../security-generation/sg.guard.js";
import { KeySession } from "../security-generation/decorators/token-bearer.decorators.js";
import { KeyReponse } from "../security-generation/dto/key-response.dto.js";
import { OTPRequest } from "./dto/otp-response.dto.js";
import { RESPONSE_CODE, ResponseCode } from "../../common/response-code/code.config.js";
import { Response } from "../../common/response.dto.js";
import SecretService from "../security-generation/sg.config.js";

@Controller("api/v1/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly security: SecretService
  ) { }

  private refreshCookie(value: string, maxAge: number) {
    return {
      name: "refresh_token",
      value,
      options: {
        path: `/api/v1/auth`,
        httpOnly: true,
        secure: true,
        sameSite: "none" as const,
        maxAge,
        partitioned: true,
      }
    }
  }

  private sessionResponse(data: SessionData) {
    return new Response(HttpStatus.CREATED, {
      access_token: data.access_token.key,
      role: data.role,
      status: data.status
    }, [
      this.refreshCookie(data.refresh_token.key, this.security.RF_DURATION)
    ])
  }

  private toCodes(error: unknown): ResponseCode[] {
    return Array.isArray(error) ? error as ResponseCode[] : [error as ResponseCode];
  }

  @Post("register")
  async register(@Body() dto: RegisterDto): Promise<Response> {
    return await this.authService.register(dto).then(
      data => this.sessionResponse(data),
      (error: unknown) => new Response(HttpStatus.CONFLICT, this.toCodes(error))
    );
  }

  @Get("otp")
  @Authenticated()
  async createOtp(
    @KeySession({ type: "access", force: true }) key: KeyReponse,
    @Query("type") type: "active" | "recover" | "delete"
  ): Promise<Response> {
    if (!["active", "recover", "delete"].includes(type))
      return new Response(HttpStatus.BAD_REQUEST, [RESPONSE_CODE.VALIDATION_ERROR])
    return await this.authService.createOtp(key, type).then(
      otp => new Response(HttpStatus.OK, otp),
      (code: ResponseCode) => new Response(HttpStatus.BAD_REQUEST, [code])
    );
  }

  @Post("activate")
  @Authenticated()
  async activateAccount(
    @KeySession({ type: "access", force: true }) key: KeyReponse,
    @Body() otpRequest: OTPRequest
  ): Promise<Response> {
    if (otpRequest.type != "active")
      return new Response(HttpStatus.CONFLICT, [RESPONSE_CODE.INVALID_OTP])
    return await this.authService.validateOtp(
      KeyReponse(key.session_id, key.user_id, otpRequest.created_time, otpRequest.expired_time, otpRequest.key, otpRequest.type)
    ).then(
      () => new Response(HttpStatus.ACCEPTED),
      (code: ResponseCode) => {
        if (code == RESPONSE_CODE.INVALID_OTP)
          return new Response(HttpStatus.CONFLICT, [code])
        if (code == RESPONSE_CODE.INVALID_SESSION)
          return new Response(HttpStatus.UNAUTHORIZED, [code])
        return new Response(HttpStatus.INTERNAL_SERVER_ERROR, [code])
      }
    );
  }

  @Post("login")
  @Authenticated()
  async login(
    @KeySession({ type: "refresh", force: false }) refresh_token: KeyReponse | undefined,
    @Query("type") type: "username" | "email" | "token",
    @Body() request: { identifier: string, password: string }
  ): Promise<Response> {
    if (type == "token") {
      if (!refresh_token)
        return new Response(HttpStatus.UNAUTHORIZED, [RESPONSE_CODE.INVALID_REFRESH_TOKEN])
      return await this.authService.refresh(refresh_token).then(
        access => new Response(HttpStatus.CREATED, access),
        () => new Response(HttpStatus.UNAUTHORIZED, [RESPONSE_CODE.INVALID_REFRESH_TOKEN])
      );
    }
    if (type != "username" && type != "email")
      return new Response(HttpStatus.BAD_REQUEST, [RESPONSE_CODE.VALIDATION_ERROR])

    return await this.authService.login({ identifier: request.identifier, password: request.password, type: type }).then(
      data => this.sessionResponse(data),
      (code: ResponseCode) => new Response(HttpStatus.CONFLICT, [code])
    );
  }

  @Post("logout")
  @Authenticated()
  async logout(
    @KeySession({ type: "refresh", force: true }) key: KeyReponse
  ): Promise<Response> {
    return await this.authService.logout(key).then(
      () => new Response(HttpStatus.OK, undefined, [this.refreshCookie("", 0)]),
      (code: ResponseCode) => new Response(HttpStatus.UNAUTHORIZED, [code])
    );
  }
}
