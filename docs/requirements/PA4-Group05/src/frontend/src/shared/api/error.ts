const errorCode = {
    'SUCCESS': 0,
    'UNKNOWN_ERROR': 2002,
    'UNKNOWN_DATABASE_ERROR': 45000,
    'INVALID_DISPLAYNAME': 45001,
    'INVALID_EMAIL': 45002,
    'INVALID_USERNAME': 45003,
    'INVALID_PASSWORD': 45004,
    'UNREGISTERED_EMAIL_DOMAIN': 46001,
    'DUPLICATED_EMAIL': 47001,
    'DUPLICATED_USERNAME': 47002,
    'VALIDATION_ERROR': 40001, 
    'INVALID_CREDENTIALS': 18456,
    'INVALID_ACCESS_TOKEN': 40004,
    'INVALID_OTP': 40002,
    'INVALID_SESSION': 45005
} as const

type errorType = typeof errorCode[keyof typeof errorCode]

class apiError extends Error {
    public statusCode: number
    public errorCode?: errorType[]

    constructor(
        statusCode: number,
        errorCode?: errorType[],
    ) {
        super(`API Error: ${statusCode}`)
        this.name = "apiError"
        this.statusCode = statusCode
        this.errorCode = errorCode
    }
}

export {errorCode, type errorType, apiError}

