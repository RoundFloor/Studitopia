import { useEffect } from "react";
import { AuthStore} from "../../../entities/session/auth-store";
import { refreshRequest } from "../../../shared/api/client";


function AuthInitializer() {
    useEffect(() => {
        let isMounted = true;

        async function initializeAuth() {
            try {
                const response = await refreshRequest();

                if (!isMounted) return;

                AuthStore.setAccessToken(response);
                AuthStore.setStatus("AUTHENTICATED");
            } catch {
                if (!isMounted) return;

                AuthStore.setAccessToken("");
                AuthStore.setStatus("UNAUTHENTICATED");
            }
        }

        initializeAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    return null;
}

export {AuthInitializer}