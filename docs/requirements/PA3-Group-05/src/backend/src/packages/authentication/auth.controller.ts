import { Body, Controller, Get, HttpStatus, Post, Query } from "@nestjs/common";
import { AuthenticationService } from "./auth.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { Authenticated } from "../security-generation/sg.guard.js";
import { KeySession } from "../security-generation/decorators/token-bearer.decorators.js";
import { KeyReponse } from "../security-generation/dto/key-response.dto.js";
import { OTPRequest, OTPResponse } from "./dto/otp-response.dto.js";
import { RESPONSE_CODE } from "../../common/response-code/code.config.js";
import { Response } from "../../common/response.dto.js";
import { secretService } from "../security-generation/sg.config.js";

@Controller("api/v1/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthenticationService
  ) { }

  private refreshCookie(value: string, maxAge: number) {
    return {
      name: "refresh_token",
      value,
      options: {
        path: `/api/v1/auth/login`,
        httpOnly: true,
        secure: true,
        sameSite: "none" as const,
        maxAge,
        partitioned: true,
      }
    }
  }

  private sessionResponse(data: {
    access_token: { key: string },
    refresh_token: { key: string },
    role: string,
    status: string
  }) {
    return new Response(HttpStatus.CREATED, {
      access_token: data.access_token.key,
      role: data.role,
      status: data.status
    }, [
      this.refreshCookie(data.refresh_token.key, secretService.RF_DURATION)
    ])
  }

  @Post("register")
  async register(@Body() dto: RegisterDto): Promise<Response> {
    const result = await this.authService.register(dto);
    if (result.codes.length != 0)
      return new Response(HttpStatus.CONFLICT, result.codes)
    return this.sessionResponse(result.data)
  }

  @Get("otp")
  @Authenticated()
  async createOtp(
    @KeySession({ type: "access", force: true }) key: KeyReponse,
    @Query("type") type: "active" | "recover" | "delete"
  ): Promise<Response> {
    console.log(type)
    if (!["active", "recover", "delete"].includes(type))
      return new Response(HttpStatus.BAD_REQUEST, [RESPONSE_CODE.VALIDATION_ERROR])
    const result = await this.authService.createOtp(key, type)
    if (result instanceof OTPResponse)
      return new Response(HttpStatus.OK, result)
    return new Response(HttpStatus.BAD_REQUEST, [result])
  }

  @Post("activate")
  @Authenticated()
  async activateAccount(
    @KeySession({ type: "access", force: true }) key: KeyReponse,
    @Body() otpRequest: OTPRequest
  ): Promise<Response> {
    if (otpRequest.type != "active")
      return new Response(HttpStatus.CONFLICT, [RESPONSE_CODE.INVALID_OTP])
    const response = await this.authService.validateOtp(
      KeyReponse(key.session_id, key.user_id, otpRequest.created_time, otpRequest.expired_time, otpRequest.key, otpRequest.type)
    )
    if (response == RESPONSE_CODE.INVALID_OTP)
      return new Response(HttpStatus.CONFLICT, [response])
    if (response == RESPONSE_CODE.INVALID_SESSION)
      return new Response(HttpStatus.UNAUTHORIZED, [response])
    if (response != RESPONSE_CODE.SUCCESS)
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, [response])
    return new Response(HttpStatus.ACCEPTED)
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
      const access = this.authService.refresh(refresh_token)
      if (!access)
        return new Response(HttpStatus.UNAUTHORIZED, [RESPONSE_CODE.INVALID_REFRESH_TOKEN])
      return new Response(HttpStatus.CREATED, { access_token: access.key })
    }
    if (type != "username" && type != "email")
      return new Response(HttpStatus.BAD_REQUEST, [RESPONSE_CODE.VALIDATION_ERROR])

    const result = await this.authService.login({ identifier: request.identifier, password: request.password, type: type })
    if (result.code != RESPONSE_CODE.SUCCESS || !result.data)
      return new Response(HttpStatus.CONFLICT, [result.code])

    return this.sessionResponse(result.data)
  }

  @Post("logout")
  @Authenticated()
  async logout(
    @KeySession({ type: "access", force: true }) key: KeyReponse
  ): Promise<Response> {
    const result = await this.authService.logout(key)
    if (result != RESPONSE_CODE.SUCCESS)
      return new Response(HttpStatus.UNAUTHORIZED, [result])
    return new Response(HttpStatus.OK, undefined, [this.refreshCookie("", 0)])
  }
}
