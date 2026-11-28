import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../shared/api";
import type { TagResponse } from "./type";

function tag(tagID: string): Promise<TagResponse[]> {
    return apiRequest<TagResponse[]>(`/forum/${tagID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

function useTag(tagID: string, category: string) {
    return useQuery({
        queryKey: [category, tagID],
        queryFn: () => tag(tagID),
        staleTime: 10*60*1000,
        enabled: !!tagID
    })
}

export {useTag}