import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/api";
import type { RegisterRequest, RegisterResponse} from "./type";
import { AuthStore } from "../../../entities/session/auth-store";
import { useNavigate } from "react-router";


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
            AuthStore.setAccessToken(data.access_token)
            AuthStore.setRole(data.role)
            AuthStore.setStatus("PENDING_OTP")
            navigate('/')
        }
    })
}

export { register, useRegister }