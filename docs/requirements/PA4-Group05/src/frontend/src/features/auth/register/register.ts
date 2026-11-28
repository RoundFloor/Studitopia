import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/api";
import type { RegisterRequest, RegisterResponse} from "./type";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../../entities/session/auth-store";


function register( data: RegisterRequest
): Promise<RegisterResponse> {
    return apiRequest<RegisterResponse>(`/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

function useRegister() {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            useAuthStore.getState().setToken(data.access_token)
            useAuthStore.getState().setState("PENDING_OTP", data.role)
            navigate('/')
        }
    })
}

export { register, useRegister }