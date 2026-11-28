import { Injectable } from '@nestjs/common';
import { RESPONSE_CODE, ResponseCode } from '../../common/response-code/code.config.js';
import { PostgresService } from '../postgres/pg.service.js';
import { EmailSenderService } from '../email-sender/email-sender.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { KeyReponse } from '../security-generation/dto/key-response.dto.js';
import { SecurityGenerationService } from '../security-generation/sg.service.js';
import { OTPResponse } from './dto/otp-response.dto.js';
import { LoginDto } from './dto/login.dto.js';

export interface SessionData {
  refresh_token: KeyReponse;
  access_token: KeyReponse;
  role: string;
  status: string;
}

export interface RefreshData {
  access_token: string;
  role: string;
  status: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly postgres: PostgresService,
    private readonly emailSender: EmailSenderService,
    private readonly securityService: SecurityGenerationService
  ) {}

  private async createSession(session_id: number, user_id: number, role: string, status: string): Promise<SessionData> {
    return {
      refresh_token: await this.securityService.createRefreshToken(session_id, user_id),
      access_token: await this.securityService.createAcessToken(session_id, user_id),
      role,
      status
    }
  }

  async register(dto: RegisterDto): Promise<SessionData> {
    const codes: ResponseCode[] = []
    await Promise.all([
      this.postgres.validate_email(dto.email).then(undefined, (code: ResponseCode) => {
        codes.push(code)
      }),
      this.postgres.validate_username(dto.username).then(undefined, (code: ResponseCode) => {
        codes.push(code)
      })
    ])
    if (codes.length) return Promise.reject(codes)

    return this.postgres.register(dto.displayname, dto.username, dto.email, dto.password).then(
      value => this.createSession(value.session_id, value.user_id, value.role, value.status)
    );
  }

  async createOtp(user: KeyReponse, type: 'active' | 'recover' | 'delete'): Promise<OTPResponse> {
    const otp = await this.securityService.createOTP(user.session_id, user.user_id, type)
    await this.postgres.saveOtp(user.session_id, user.user_id, Number(otp.key))
    const email = await this.postgres.getEmail(user.session_id, user.user_id)

    const sent = await this.emailSender.sendOtp({
      to: email,
      otp: otp.key,
      purpose: type == 'recover' ? 'recover_password' : 'register'
    })
    if (!sent.success) return Promise.reject(RESPONSE_CODE.EMAIL_SENDER_UNVAILABLE)
    return new OTPResponse(otp.created_time, otp.expired_time)
  }

  async validateOtp(token: KeyReponse): Promise<void> {
    if (!this.securityService.validateOTP(token))
      return Promise.reject(RESPONSE_CODE.INVALID_OTP)

    const stored = await this.postgres.getOtp(token.session_id, token.user_id)
    if (stored === null || stored !== Number(token.key))
      return Promise.reject(RESPONSE_CODE.INVALID_OTP)

    return token.type == 'active'
      ? this.postgres.activeAccount(token.session_id, token.user_id)
      : this.postgres.removeOtp(token.session_id, token.user_id);
  }

  async login(dto: LoginDto): Promise<SessionData> {
    const user = (dto.type == 'email') ?
      await this.postgres.loginByEmail(dto.identifier, dto.password) :
      await this.postgres.loginByUsername(dto.identifier, dto.password);
    return this.createSession(user.session_id, user.user_id, user.role, user.status)
  }

  async refresh(refresh_token: KeyReponse): Promise<RefreshData> {
    if (refresh_token.expired_time <= Date.now())
      return Promise.reject(RESPONSE_CODE.INVALID_REFRESH_TOKEN)

    const account = (await this.postgres.getAccountById(refresh_token.user_id))[0]
    if (!account)
      return Promise.reject(RESPONSE_CODE.INVALID_REFRESH_TOKEN)

    const access_token = await this.securityService.createAcessToken(refresh_token.session_id, refresh_token.user_id)
    return {
      access_token: access_token.key,
      role: account.role,
      status: account.status,
    }
  }

  logout(token: KeyReponse): Promise<void> {
    return this.postgres.logout(token.session_id, token.user_id)
  }
}
