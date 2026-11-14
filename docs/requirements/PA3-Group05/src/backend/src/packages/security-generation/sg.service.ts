import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { createHmac, timingSafeEqual } from "node:crypto";
import { KeyReponse } from "./dto/key-response.dto.js";
import type { SecretService } from "./dto/secret.dto.js";

@Injectable()
export class SecurityGenerationService implements CanActivate {
    constructor(
        @Inject('SecretService') private readonly otpService: SecretService
    ) { }
    createOTP(session_id: string, user_id: string, type: 'active' | 'recover' | 'delete') {
        const hmac = createHmac(this.otpService.HASH_ALGORITHM, this.otpService.OTP_SECRET_KEY)
        const time = Date.now()
        hmac.update(JSON.stringify({
            session_id: session_id,
            user_id: user_id,
            created: time,
            expired: time + this.otpService.OTP_DURATION,
            type: type
        }))
        const buffer = hmac.digest()
        const offset = (buffer[buffer.length - 1] & 0x7f) % (buffer.length - 4)
        return KeyReponse(session_id, user_id, time, time + this.otpService.OTP_DURATION, buffer.readUInt32BE(offset).toString().slice(0, 6).padStart(6, '0'), type);
    }
    validateOTP(dto: KeyReponse): boolean {
        if (dto.expired_time <= Date.now()) return false;
        const hmac = createHmac(this.otpService.HASH_ALGORITHM, this.otpService.OTP_SECRET_KEY)
        hmac.update(JSON.stringify({
            session_id: dto.session_id,
            user_id: dto.user_id,
            created: dto.created_time,
            expired: dto.expired_time,
            type: dto.type
        }))
        const buffer = hmac.digest()
        const offset = (buffer[buffer.length - 1] & 0x7f) % (buffer.length - 4)
        const sig2 = buffer.readUInt32BE(offset).toString().slice(0, 6).padStart(6, '0')
        const key = dto.key.padStart(6, '0').slice(0, 6)
        return timingSafeEqual(Buffer.from(sig2), Buffer.from(key));
    }
    createRefreshToken(session_id: string, user_id: string) {
        const hmac = createHmac(this.otpService.HASH_ALGORITHM, this.otpService.RF_SECRET_KEY)
        const now = Date.now();
        const data = Buffer.from(JSON.stringify([session_id, user_id, now.toString(), (now + this.otpService.RF_DURATION).toString(), 'refresh']))
        hmac.update(data)
        const sig = Buffer.from(hmac.digest().toString('base64')).subarray(0, this.otpService.SIGNATURE_LENGTH)
        return KeyReponse(session_id, user_id, now, now + this.otpService.RF_DURATION, Buffer.concat([data, sig]).toString('base64'), "refresh")
    }
    revertRefreshToken(token: string): KeyReponse | undefined {
        const buffer = Buffer.from(token, 'base64')
        if (buffer.length <= this.otpService.SIGNATURE_LENGTH) return undefined;
        const sig = buffer.subarray(buffer.length - this.otpService.SIGNATURE_LENGTH, buffer.length)
        const data = buffer.subarray(0, buffer.length - this.otpService.SIGNATURE_LENGTH);
        const hmac = createHmac(this.otpService.HASH_ALGORITHM, this.otpService.RF_SECRET_KEY)
        hmac.update(data)
        const sigB = Buffer.from(hmac.digest().toString('base64')).subarray(0, this.otpService.SIGNATURE_LENGTH)
        if (!timingSafeEqual(sig, sigB)) return undefined;
        const arr = JSON.parse(data.toString()) as string[]
        return {
            session_id: arr[0],
            user_id: arr[1],
            created_time: Number.parseInt(arr[2]),
            expired_time: Number.parseInt(arr[3]),
            key: token,
            type: 'refresh'
        }
    }
    createAcessToken(session_id: string, user_id: string) {
        const hmac = createHmac(this.otpService.HASH_ALGORITHM, this.otpService.AC_SECRET_KEY)
        const now = Date.now()
        const data = Buffer.from(JSON.stringify([session_id, user_id, now.toString(), (now+this.otpService.AC_DURATION).toString(), 'access']))
        hmac.update(data)
        const sig = Buffer.from(hmac.digest().toString('base64')).subarray(0, this.otpService.SIGNATURE_LENGTH)
        return KeyReponse(session_id, user_id, now, now + this.otpService.AC_DURATION, Buffer.concat([data, sig]).toString('base64'), "access")
    }
    revertAccessToken(token: string): KeyReponse | undefined {
        const buffer = Buffer.from(token, 'base64')
        if (buffer.length < this.otpService.SIGNATURE_LENGTH) return undefined;
        const sig = buffer.subarray(buffer.length - this.otpService.SIGNATURE_LENGTH)
        const data = buffer.subarray(0, buffer.length - this.otpService.SIGNATURE_LENGTH);
        const hmac = createHmac(this.otpService.HASH_ALGORITHM, this.otpService.AC_SECRET_KEY)
        hmac.update(data)
        const sigB = Buffer.from(hmac.digest().toString('base64')).subarray(0, this.otpService.SIGNATURE_LENGTH)
        if (!timingSafeEqual(sig, sigB)) return undefined;
        const arr = JSON.parse(data.toString()) as string[]
        return {
            session_id: arr[0],
            user_id: arr[1],
            created_time: Number.parseInt(arr[2]),
            expired_time: Number.parseInt(arr[3]),
            key: token,
            type: 'access'
        }
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        const authorization = request.headers.authorization;
        if (authorization && authorization.startsWith('Bearer ')) {
            const token = authorization.substring(7);
            request.user = this.revertAccessToken(token);
        }
        const isLoginRefresh = request.originalUrl?.split('?')[0].endsWith('/auth/login')
            && request.query?.type === 'token';
        const refresh = isLoginRefresh ? request.cookies?.['refresh_token'] : undefined;
        if (refresh) {
            request.refresh = this.revertRefreshToken(refresh)
        }
      
        return true;
    }
}