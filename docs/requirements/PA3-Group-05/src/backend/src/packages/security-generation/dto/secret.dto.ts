export interface SecretService {
    OTP_SECRET_KEY: string,
    RF_SECRET_KEY: string,
    AC_SECRET_KEY: string,
    HASH_ALGORITHM: string,
    OTP_DURATION: number,
    RF_DURATION: number,
    AC_DURATION: number,
    SIGNATURE_LENGTH:number
}