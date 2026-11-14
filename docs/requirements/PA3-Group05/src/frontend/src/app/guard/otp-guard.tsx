import { Navigate, Outlet } from 'react-router'
import { AuthStore } from '../../entities/session/auth-store'

function OtpGuard() {
    const status = AuthStore.getStatus()

    if (!status || status === 'UNAUTHENTICATED') {
        return <Navigate to="/auth/login" replace />
    }
    
    if (status === 'LOADING') {
        return <div>Loading...</div>
    }

    if (status === 'AUTHENTICATED') {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export { OtpGuard }