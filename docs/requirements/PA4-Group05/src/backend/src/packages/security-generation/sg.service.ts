import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { createHmac, timingSafeEqual } from "node:crypto";
import { KeyReponse } from "./dto/key-response.dto.js";
import SecretService from "./sg.config.js";

@Injectable()
export class SecurityGenerationService implements CanActivate {
    constructor(
        private readonly secrectService: SecretService
    ) { }
    async createOTP(session_id: number, user_id: number, type: 'active' | 'recover' | 'delete') {
        const hmac = createHmac(this.secrectService.HASH_ALGORITHM, await this.secrectService.OTP_SECRET_KEY)
        const time = Date.now()
        hmac.update(JSON.stringify({
            session_id: session_id,
            user_id: user_id,
            created: time,
            expired: time + this.secrectService.OTP_DURATION,
            type: type
        }))
        const buffer = hmac.digest()
        const offset = (buffer[buffer.length - 1] & 0x7f) % (buffer.length - 4)
        return KeyReponse(session_id, user_id, time, time + this.secrectService.OTP_DURATION, buffer.readUInt32BE(offset).toString().slice(0, 6).padStart(6, '0'), type);
    }
    async validateOTP(dto: KeyReponse): Promise<boolean> {
        if (dto.expired_time <= Date.now()) return false;
        const hmac = createHmac(this.secrectService.HASH_ALGORITHM, await this.secrectService.OTP_SECRET_KEY)
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
    async createRefreshToken(session_id: number, user_id: number) {
        const hmac = createHmac(this.secrectService.HASH_ALGORITHM, await this.secrectService.RF_SECRET_KEY)
        const now = Date.now();
        const data = Buffer.from(JSON.stringify([session_id, user_id, now.toString(), (now + this.secrectService.RF_DURATION).toString(), 'refresh']))
        hmac.update(data)
        const sig = Buffer.from(hmac.digest().toString('base64')).subarray(0, this.secrectService.SIGNATURE_LENGTH)
        return KeyReponse(session_id, user_id, now, now + this.secrectService.RF_DURATION, Buffer.concat([data, sig]).toString('base64'), "refresh")
    }
    async revertRefreshToken(token: string): Promise<KeyReponse> {
        return new Promise(async (resolve, reject) => {
            const buffer = Buffer.from(token, 'base64')
            if (buffer.length <= this.secrectService.SIGNATURE_LENGTH) return reject();
            const sig = buffer.subarray(buffer.length - this.secrectService.SIGNATURE_LENGTH, buffer.length)
            const data = buffer.subarray(0, buffer.length - this.secrectService.SIGNATURE_LENGTH);
            const hmac = createHmac(this.secrectService.HASH_ALGORITHM, await this.secrectService.RF_SECRET_KEY)
            hmac.update(data)
            const sigB = Buffer.from(hmac.digest().toString('base64')).subarray(0, this.secrectService.SIGNATURE_LENGTH)
            if (!timingSafeEqual(sig, sigB)) return reject();
            const arr = JSON.parse(data.toString()) as string[]
            return resolve({
                session_id: Number.parseInt(arr[0]),
                user_id: Number.parseInt(arr[1]),
                created_time: Number.parseInt(arr[2]),
                expired_time: Number.parseInt(arr[3]),
                key: token,
                type: 'refresh'
            })
        })
    }
    async createAcessToken(session_id: number, user_id: number) {
        const hmac = createHmac(this.secrectService.HASH_ALGORITHM, await this.secrectService.AC_SECRET_KEY)
        const now = Date.now()
        const data = Buffer.from(JSON.stringify([session_id, user_id, now.toString(), (now+this.secrectService.AC_DURATION).toString(), 'access']))
        hmac.update(data)
        const sig = Buffer.from(hmac.digest().toString('base64')).subarray(0, this.secrectService.SIGNATURE_LENGTH)
        return KeyReponse(session_id, user_id, now, now + this.secrectService.AC_DURATION, Buffer.concat([data, sig]).toString('base64'), "access")
    }
    async revertAccessToken(token: string): Promise<KeyReponse> {
        return new Promise(async (resolve, reject) => {
            const buffer = Buffer.from(token, 'base64')
            if (buffer.length < this.secrectService.SIGNATURE_LENGTH) return reject();
            const sig = buffer.subarray(buffer.length - this.secrectService.SIGNATURE_LENGTH)
            const data = buffer.subarray(0, buffer.length - this.secrectService.SIGNATURE_LENGTH);
            const hmac = createHmac(this.secrectService.HASH_ALGORITHM, await this.secrectService.AC_SECRET_KEY)
            hmac.update(data)
            const sigB = Buffer.from(hmac.digest().toString('base64')).subarray(0, this.secrectService.SIGNATURE_LENGTH)
            if (!timingSafeEqual(sig, sigB)) return reject();
            const arr = JSON.parse(data.toString()) as string[]
            return resolve({
                session_id: Number.parseInt(arr[0]),
                user_id: Number.parseInt(arr[1]),
                created_time: Number.parseInt(arr[2]),
                expired_time: Number.parseInt(arr[3]),
                key: token,
                type: 'access'
            })
        })
    }
    async crypt(data: string): Promise<string> {
        const hmac = createHmac(this.secrectService.HASH_ALGORITHM, await this.secrectService.CUSTOM_SECRET_KEY)
        let buf = Buffer.from(data)
        hmac.update(data)
        const sig = Buffer.from(hmac.digest().toString('base64')).subarray(0, Math.min(buf.length, this.secrectService.SIGNATURE_LENGTH))
        buf = Buffer.from(buf.map((i, index) => i ^ sig[index % sig.length]))
        buf = Buffer.concat([buf, sig])
        return buf.toString("base64url");
    }
    async decrypt(data: string): Promise<string> {
        let buf = Buffer.from(data, 'base64url')
        const length = Math.min(buf.length/2, this.secrectService.SIGNATURE_LENGTH)
        const sig = buf.subarray(buf.length - length)
        buf = buf.subarray(0, buf.length-length)
        buf = Buffer.from(buf.map((value, index) => value ^ sig[index % sig.length]))
        const hmac = createHmac(this.secrectService.HASH_ALGORITHM, await this.secrectService.CUSTOM_SECRET_KEY)
        hmac.update(buf)
        const sigB = Buffer.from(hmac.digest().toString('base64')).subarray(0, length)
        if (timingSafeEqual(sig, sigB)) {
            return buf.toString()
        }
        return ""
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