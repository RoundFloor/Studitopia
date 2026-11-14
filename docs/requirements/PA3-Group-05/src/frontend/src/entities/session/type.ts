type AuthStatus = 
    "LOADING" |
    "UNAUTHENTICATED" |
    "PENDING_OTP" |
    "AUTHENTICATED"
// interface AuthState {
//     status: AuthStatus
//     role: string | null
// }
export {type AuthStatus}