import { Navigate, Outlet } from 'react-router'
import { AuthStore } from '../../entities/session/auth-store'

function AuthGuard() {
    const status = AuthStore.getStatus()

    if (!status || status === 'UNAUTHENTICATED') {
        return <Navigate to="/auth/login" replace />
    }

    if (status === 'LOADING') {
        return <div>Loading...</div>
    }

    if (status === 'PENDING_OTP') {
        return <Navigate to="/auth/verify_otp" replace
            state={{
                purpose: "active"
            }}
        />
    }

    return <Outlet />
}

export { AuthGuard }