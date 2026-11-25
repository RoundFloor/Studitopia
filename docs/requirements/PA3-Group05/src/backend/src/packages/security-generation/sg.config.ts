import { Provider } from "@nestjs/common"
import { SecretService } from "./dto/secret.dto.js"

export const secretService: SecretService = {
    HASH_ALGORITHM: 'sha256',
    OTP_SECRET_KEY: process.env.SECRERT_KEY!,
    AC_SECRET_KEY: process.env.SECRERT_KEY!,
    RF_SECRET_KEY: process.env.SECRERT_KEY!,
    OTP_DURATION: 60 * 1000,
    AC_DURATION: 30 * 60 * 1000,
    RF_DURATION: 30 * 24 * 60 * 1000,
    SIGNATURE_LENGTH: 32
}

export const SecretProvider: Provider = {
    provide: "SecretService",
    useValue: secretService
}