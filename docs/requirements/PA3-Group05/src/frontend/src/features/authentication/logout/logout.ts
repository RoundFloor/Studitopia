import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/api";
import { AuthStore} from "../../../entities/session/auth-store";
import { useNavigate } from "react-router";

function logout(): Promise<void> {
    return apiRequest<void>(`/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

function useLogout() {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            AuthStore.clear()
            navigate("/login")
        }
    })
}

export {logout, useLogout}