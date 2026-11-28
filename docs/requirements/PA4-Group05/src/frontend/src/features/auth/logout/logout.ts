import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/api";
import { useAuthStore } from "../../../entities/session/auth-store";
// import { useNavigate } from "react-router";
import router from "../../../app/providers/router";

function logout(): Promise<void> {
    useAuthStore.getState().setStatus("LOADING")
    return apiRequest<void>(`/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

function useLogout() {
    return useMutation({
        mutationFn: logout,
        onSettled: () => {
            useAuthStore.getState().logout()
            router.navigate("/auth/login", { replace: true });
        }
    })
}

export {logout, useLogout}