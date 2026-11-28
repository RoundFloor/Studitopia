import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '../../entities/session/auth-store'
import LoadingPage from '../../pages/loading/LoadingPage'

function PublicOnly() {
    const status = useAuthStore((state) => state.status);

    if (status === 'AUTHENTICATED') {
        return <Navigate to="/forum" replace />
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

export { PublicOnly }