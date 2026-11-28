import SecretService from "../sg.config.js";
import { SecurityGenerationService } from "../sg.service.js";

export const SecurityGenerationServiceMock = new SecurityGenerationService(
    {
        AC_DURATION: 60,
        AC_SECRET_KEY: new Promise((resolve) => resolve('123456')),
        HASH_ALGORITHM: 'sha256',
        OTP_DURATION: 60000,
        OTP_SECRET_KEY: new Promise((resolve) => resolve('123455')),
        RF_DURATION: 60 * 24 * 1000,
        RF_SECRET_KEY: new Promise((resolve) => resolve('12345678')),
        CUSTOM_SECRET_KEY: new Promise((resolve) => resolve('123456910')),
        SIGNATURE_LENGTH: 32
    } as any as SecretService)