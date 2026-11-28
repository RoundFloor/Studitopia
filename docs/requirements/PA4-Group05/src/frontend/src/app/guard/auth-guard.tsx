import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '../../entities/session/auth-store'
import LoadingPage from '../../pages/loading/LoadingPage'

function AuthGuard() {
    
    const status = useAuthStore((state) => state.status);
    
    if (!status || status === 'UNAUTHENTICATED') {
        return <Navigate to="/auth/login" replace />
    }

    if (status === 'LOADING') {
        return <LoadingPage/>
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