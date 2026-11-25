import { SecurityGenerationService } from "../sg.service.js";

export const SecurityGenerationServiceMock = new SecurityGenerationService({
    AC_DURATION: 60,
    AC_SECRET_KEY: '123456',
    HASH_ALGORITHM: 'sha256',
    OTP_DURATION: 60000,
    OTP_SECRET_KEY: '123455',
    RF_DURATION: 60 * 24 * 1000,
    RF_SECRET_KEY: '12345678',
    SIGNATURE_LENGTH: 32
})