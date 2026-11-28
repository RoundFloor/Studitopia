import { SecurityGenerationServiceMock } from "../decorators/sg.mock.js"
import { KeyReponse } from "../dto/key-response.dto.js"

describe("OTP Generation Test", () => {
    describe("OTP", () => {
        it.each(Array.from({ length: 1000 }, (value, index) => ({ value: index })))("$value", async ({ value }) => {
            const user_id = Number(value.toString() + Math.random().toString())
            const session_id = Number(value.toString() + Math.random().toString())
            const otp = await SecurityGenerationServiceMock.createOTP(session_id, user_id, 'active')
            expect(otp.key.length).toEqual(6)
            expect(SecurityGenerationServiceMock.validateOTP(otp), `${otp.key}`).toBe(true)
            otp.expired_time++
            expect(SecurityGenerationServiceMock.validateOTP(otp), `${otp.key}`).toBe(false)
        })
    })
    describe("Refresh token", () => {
        it.each(Array.from({ length: 1000 }, (value, index) => ({ value: index })))("$value", async ({ value }) => {
            const user_id = Number(value.toString() + Math.random().toString())
            const session_id = Number(value.toString() + Math.random().toString())
            const otp = await SecurityGenerationServiceMock.createRefreshToken(session_id, user_id)
            expect(SecurityGenerationServiceMock.revertRefreshToken(otp.key), `${otp.key}`).satisfies((value: KeyReponse) =>
                (value.session_id == session_id) && (value.user_id == user_id) && (value.expired_time == otp.expired_time) && (value.created_time == otp.created_time) && (value.type == 'refresh')
            )
            otp.key = '.' + otp.key.substring(1)
            expect(SecurityGenerationServiceMock.revertRefreshToken(otp.key), `${otp.key}`).toBe(undefined)
        })
    })
    describe("Access token", () => {
        it.each(Array.from({ length: 1000 }, (value, index) => ({ value: index })))("$value", async ({ value }) => {
            const user_id = Number(value.toString() + Math.random().toString())
            const session_id = Number(value.toString() + Math.random().toString())
            const otp = await SecurityGenerationServiceMock.createAcessToken(session_id, user_id)
            expect(SecurityGenerationServiceMock.revertAccessToken(otp.key), `${otp.key}`).satisfies((value: KeyReponse) =>
                (value.session_id == session_id) && (value.user_id == user_id) && (value.expired_time == otp.expired_time) && (value.created_time == otp.created_time)  && (value.type == 'access')
            )
            otp.key = '.' + otp.key.substring(1)
            expect(SecurityGenerationServiceMock.revertAccessToken(otp.key), `${otp.key}`).toBe(undefined)
        })
    })
})