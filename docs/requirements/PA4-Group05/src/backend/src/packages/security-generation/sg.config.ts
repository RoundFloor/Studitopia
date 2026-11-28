import { Injectable, Provider } from "@nestjs/common"
import { EnvironmentService } from "../environment/environment.service.js"

@Injectable()
class SecretService {
    HASH_ALGORITHM = 'sha256'
    OTP_DURATION = 60 * 1000
    AC_DURATION = 30 * 60 * 1000
    RF_DURATION = 30 * 24 * 60 * 1000
    SIGNATURE_LENGTH = 32
    OTP_SECRET_KEY: Promise<string>
    RF_SECRET_KEY: Promise<string>
    AC_SECRET_KEY: Promise<string>
    CUSTOM_SECRET_KEY: Promise<string>
    constructor(private readonly env: EnvironmentService) {
        this.OTP_SECRET_KEY = new Promise(async (resolve) => {
            resolve(await env.get('OTP_SECRET_KEY', 'OTP Secret key', '123456'))
        })
        this.RF_SECRET_KEY = new Promise(async (resolve) => {
            resolve(await env.get('RF_SECRET_KEY', 'RF Secret key', '123456'))
        })
        this.AC_SECRET_KEY = new Promise(async (resolve) => {
            resolve(await env.get('AC_SECRET_KEY', 'AC Secret key', '123456'))
        })
        this.CUSTOM_SECRET_KEY = new Promise(async (resolve) => {
            resolve(await env.get('CUSTOM_SECRET_KEY', 'Custom Secret key', '123456'))
        })
    }
}

export default SecretService;