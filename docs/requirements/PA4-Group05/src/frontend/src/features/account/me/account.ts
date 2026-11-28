import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/api";
import type { AccountResponse } from "./type";


function account(): Promise<AccountResponse> {
    return apiRequest<AccountResponse>('/account/me', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}


function useAccount() {
    return useQuery({
        queryKey: ["account"],
        queryFn: account,
        staleTime: 15*60*1000
    })
}

export {useAccount}