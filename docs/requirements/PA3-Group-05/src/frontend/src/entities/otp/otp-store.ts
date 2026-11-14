import type { OTP } from "./type";


const OTPStore = {
    get(type: string) {
        const raw = sessionStorage.getItem(`otp_${type}`)
        console.log('Checkpoint')
        if (!raw) {
            console.log("Data is missed")
            return null
        }
        try {
            let data = JSON.parse(raw)
            return {
                created_time: data.created_time,
                expired_time: data.expired_time
            }
        } catch {
            return null
        }
    },
    save(otp: OTP, type: string) {
        const data = {
            created_time: otp.created_time, 
            expired_time: otp.expired_time
        }
        sessionStorage.setItem(`otp_${type}`, JSON.stringify(data))
    },
    clear(type: string) {
        sessionStorage.removeItem(`otp_${type}`)
    }
}

export {OTPStore}