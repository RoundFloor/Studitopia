import { Injectable } from '@nestjs/common';
import { RESPONSE_CODE, ResponseCode } from '../../common/response-code/code.config.js';
import { PostgresService } from '../postgres/pg.service.js';
import { EmailSenderService } from '../email-sender/email-sender.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { KeyReponse } from '../security-generation/dto/key-response.dto.js';
import { SecurityGenerationService } from '../security-generation/sg.service.js';
import { OTPResponse } from './dto/otp-response.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly postgres: PostgresService,
    private readonly emailSender: EmailSenderService,
    private readonly securityService: SecurityGenerationService
  ) {}

  private createSession(session_id: string, user_id: string, role: string, status: string) {
    return {
      refresh_token: this.securityService.createRefreshToken(session_id, user_id),
      access_token: this.securityService.createAcessToken(session_id, user_id),
      role,
      status
    }
  }

  async register(dto: RegisterDto): Promise<{ codes: ResponseCode[], data?: any }> {
    const result = [] as ResponseCode[]
    const [ve, vu] = await Promise.all([
      this.postgres.validate_email(dto.email),
      this.postgres.validate_username(dto.username)
    ])
    if (ve != RESPONSE_CODE.SUCCESS)
      result.push(ve)
    if (vu != RESPONSE_CODE.SUCCESS)
      result.push(vu)
    if (result.length) return { codes: result };
    const value = await this.postgres.register(dto.displayname, dto.username, dto.email, dto.password)
    if (value.code != RESPONSE_CODE.SUCCESS || !value.data)
      return {
        codes: [
          value.code != RESPONSE_CODE.SUCCESS
            ? (value.code as ResponseCode)
            : RESPONSE_CODE.DATABASE_ERROR
        ]
      }
    return {
      codes: [],
      data: this.createSession(value.data.session_id, value.data.user_id, value.data.role, value.data.status)
    }
  }

  async createOtp(user: KeyReponse, type: 'active' | 'recover' | 'delete') {
    const otp = this.securityService.createOTP(user.session_id, user.user_id, type)
    const saved = await this.postgres.saveOtp(user.session_id, user.user_id, Number(otp.key))
    if (saved != RESPONSE_CODE.SUCCESS)
      return saved
    const email = await this.postgres.getEmail(user.session_id, user.user_id);
    if (email.code != RESPONSE_CODE.SUCCESS)
      return email.code
    const sent = await this.emailSender.sendOtp({
      to: email.data!,
      otp: otp.key,
      purpose: type == 'recover' ? 'recover_password' : 'register'
    })
    if (sent.success)
      return new OTPResponse(otp.created_time, otp.expired_time)
    return RESPONSE_CODE.EMAIL_SENDER_UNVAILABLE
  }

  async validateOtp(token: KeyReponse): Promise<ResponseCode> {
    if (!this.securityService.validateOTP(token))
      return RESPONSE_CODE.INVALID_OTP

    const stored = await this.postgres.getOtp(token.session_id, token.user_id)
    if (stored.code != RESPONSE_CODE.SUCCESS)
      return stored.code
    if (stored.data === null || stored.data !== Number(token.key))
      return RESPONSE_CODE.INVALID_OTP

    if (token.type == 'active')
      return await this.postgres.activeAccount(token.session_id, token.user_id)

    return await this.postgres.removeOtp(token.session_id, token.user_id)
  }

  async login(dto: LoginDto) {
    const response = (dto.type == 'email') ?
      await this.postgres.loginByEmail(dto.identifier, dto.password) :
      await this.postgres.loginByUsername(dto.identifier, dto.password);
    if (response.code != RESPONSE_CODE.SUCCESS)
      return { code: response.code }
    const user = response.data!
    return {
      code: RESPONSE_CODE.SUCCESS,
      data: this.createSession(user.session_id, user.user_id, user.role, user.status)
    }
  }

  refresh(refresh_token: KeyReponse): KeyReponse | undefined {
    if (refresh_token.expired_time <= Date.now())
      return undefined
    return this.securityService.createAcessToken(refresh_token.session_id, refresh_token.user_id)
  }

  async logout(token: KeyReponse): Promise<ResponseCode> {
    return await this.postgres.logout(token.session_id, token.user_id)
  }
}
