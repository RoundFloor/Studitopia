import { useEffect } from "react";
import { useAuthStore, type AuthStatus} from "../../../entities/session/auth-store";
import { configureApiAuth, refreshRequest } from "../../../shared/api/client";
import { useLogout } from "../../../features/auth/logout/logout";


function AuthInitializer() {
    const setToken = useAuthStore((state) => state.setToken);
    const setStatus = useAuthStore((state) => state.setStatus);
    const { mutate: logout } = useLogout();

    useEffect(() => {
        let isMounted = true;

        async function initializeAuth() {
            try {
                const response = await refreshRequest();
                if (!isMounted) return;
                useAuthStore.getState().setAuth(response.access_token, response.role, (response.status == "ACTIVE") ? "AUTHENTICATED": "PENDING_OTP")
            } catch {
                if (!isMounted) return;
                await logout()
            }
        }
        initializeAuth();

        return () => {
            isMounted = false;
        };
    }, [setToken, setStatus]);

    return null;
}

function initApiAuth() {
    configureApiAuth({
        getAccessToken: () => useAuthStore.getState().accessToken,
        setAuth: (token: string, role: string, status: AuthStatus) => useAuthStore.getState().setAuth(token, role, status),
        onUnauthorized: () => useLogout().mutate(),
    });
}

export {AuthInitializer, initApiAuth}