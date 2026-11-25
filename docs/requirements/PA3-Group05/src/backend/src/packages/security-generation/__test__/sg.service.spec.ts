import { KeyReponse } from "../dto/key-response.dto.js"
import { secretService } from "../sg.config.js"
import { SecurityGenerationService } from "../sg.service.js"

describe("OTP Generation Test", () => {
    let service: SecurityGenerationService
    beforeAll(() => {
        const sk = {
            HASH_ALGORITHM: 'sha256',
            OTP_SECRET_KEY: (Math.random() * 1000).toString(),
            AC_SECRET_KEY: (Math.random() * 1000).toString(),
            RF_SECRET_KEY: (Math.random() * 1000).toString(),
            OTP_DURATION: 60 * 1000,
            AC_DURATION: 30 * 60 * 1000,
            RF_DURATION: 30 * 24 * 60 * 1000,
            SIGNATURE_LENGTH: 32
        }
        
        service = new SecurityGenerationService(sk)
    })
    describe("OTP", () => {
        it.each(Array.from({ length: 1000 }, (value, index) => ({ value: index })))("$value", ({ value }) => {
            const user_id = value.toString() + Math.random().toString()
            const session_id = value.toString() + Math.random().toString()
            const otp = service.createOTP(session_id, user_id, 'active')
            expect(otp.key.length).toEqual(6)
            expect(service.validateOTP(otp), `${otp.key}`).toBe(true)
            otp.expired_time++
            expect(service.validateOTP(otp), `${otp.key}`).toBe(false)
        })
    })
    describe("Refresh token", () => {
        it.each(Array.from({ length: 1000 }, (value, index) => ({ value: index })))("$value", ({ value }) => {
            const user_id = value.toString() + Math.random().toString()
            const session_id = value.toString() + Math.random().toString()
            const otp = service.createRefreshToken(session_id, user_id)
            expect(service.revertRefreshToken(otp.key), `${otp.key}`).satisfies((value: KeyReponse) =>
                (value.session_id == session_id) && (value.user_id == user_id) && (value.expired_time == otp.expired_time) && (value.created_time == otp.created_time) && (value.type == 'refresh')
            )
            otp.key = '.' + otp.key.substring(1)
            expect(service.revertRefreshToken(otp.key), `${otp.key}`).toBe(undefined)
        })
    })
    describe("Access token", () => {
        it.each(Array.from({ length: 1000 }, (value, index) => ({ value: index })))("$value", ({ value }) => {
            const user_id = value.toString() + Math.random().toString()
            const session_id = value.toString() + Math.random().toString()
            const otp = service.createAcessToken(session_id, user_id)
            expect(service.revertAccessToken(otp.key), `${otp.key}`).satisfies((value: KeyReponse) =>
                (value.session_id == session_id) && (value.user_id == user_id) && (value.expired_time == otp.expired_time) && (value.created_time == otp.created_time)  && (value.type == 'access')
            )
            otp.key = '.' + otp.key.substring(1)
            expect(service.revertAccessToken(otp.key), `${otp.key}`).toBe(undefined)
        })
    })
})