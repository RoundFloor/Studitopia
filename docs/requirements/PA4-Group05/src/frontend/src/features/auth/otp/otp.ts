import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/api";
import { OTPStore } from "../../../entities/otp/otp-store";
import type { OTP } from "../../../entities/otp/type";
import type { VerifyOTPRequest } from "./type";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../../entities/session/auth-store";


function createOTP(type: string): Promise<OTP> {
    return apiRequest<OTP>(`/auth/otp?type=${type}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

function useCreateOTP() {
    return useMutation({
        mutationFn: createOTP,
        onSuccess: (data, variables) => {
            OTPStore.save(data, variables)
        }
    })
}

async function verifyOTP(data: VerifyOTPRequest): Promise<void> {
    const response =  await apiRequest<void>(`/auth/activate`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return response 
}

function useVerifyOTP() {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: verifyOTP,
        onSuccess: (_, variables) => {
            OTPStore.clear(variables.type) 
            useAuthStore.getState().setStatus("AUTHENTICATED")
            navigate('/')
        }
    })
}

export {useCreateOTP, useVerifyOTP}