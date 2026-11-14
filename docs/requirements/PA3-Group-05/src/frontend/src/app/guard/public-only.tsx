import { Navigate, Outlet } from 'react-router'
import { AuthStore } from '../../entities/session/auth-store'

function PublicOnly() {
    const status = AuthStore.getStatus()

    if (!status) return

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

    if (status === 'AUTHENTICATED') {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export { PublicOnly }