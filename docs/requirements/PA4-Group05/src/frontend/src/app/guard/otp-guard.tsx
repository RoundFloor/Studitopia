import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '../../entities/session/auth-store'
import LoadingPage from '../../pages/loading/LoadingPage'
    
function OtpGuard() {
    const status = useAuthStore(state => state.status)

    if (!status || status === 'UNAUTHENTICATED') {
        return <Navigate to="/auth/login" replace />
    }
    
    if (status === 'LOADING') {
        return <LoadingPage/>
    }

    if (status === 'AUTHENTICATED') {
        return <Navigate to="/forum" replace />
    }

    if (status == "PENDING_OTP") {
        return <Outlet />
    }

    return <Navigate to="/auth/login" replace />
}

export { OtpGuard }