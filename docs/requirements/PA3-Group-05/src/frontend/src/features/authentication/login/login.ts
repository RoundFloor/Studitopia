import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/api";
import type { LoginParameter, LoginResponse} from "./type";
import { AuthStore } from "../../../entities/session/auth-store";
import { useNavigate } from "react-router";

function login(
    {type, data}: LoginParameter
): Promise<LoginResponse> {
    if (type != 'username' && type != 'email') 
        throw new Error(`Login type must be username or email, not ${type}`)
    return apiRequest<LoginResponse>(`/auth/login?type=${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        },
        {
            auth: false,
            retryOnUnauthorized: false
        }
    );
}

function useLogin() {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            AuthStore.setAccessToken(data.access_token)
            AuthStore.setRole(data.role)
            AuthStore.setStatus(data.status === "ACTIVE" ? "AUTHENTICATED" : "PENDING_OTP")
            navigate("/")
        }
    })
}

export {login, useLogin}