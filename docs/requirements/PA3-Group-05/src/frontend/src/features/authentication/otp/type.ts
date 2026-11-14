interface VerifyOTPRequest {
    created_time: number
    expired_time: number
    key: string
    type: string
}

export type {VerifyOTPRequest}