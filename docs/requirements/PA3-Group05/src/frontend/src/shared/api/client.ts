import { AuthStore } from "../../entities/session/auth-store";
import { apiError, type errorType,} from "./error";

const API_BASE_URL = "https://studitopia.wanderlab2414.online/api/v1"

interface apiRequestConfig {
    auth?: boolean
    retryOnUnauthorized?: boolean
}

let refresh: Promise<string> | null = null

async function refreshRequest() {
    if (!refresh) {
        refresh = (async () => {
            try {
                let response: Response;
                try {
                        response = await fetch(`${API_BASE_URL}/auth/login?type=token`, {
                            method: "POST",
                            // credentials: "include",
                            headers: {
                                Accept: "application/json"
                            }
                    })
                } catch {
                    throw Error("Internet connection is interrupted")
                }

                if (!response.ok) {
                    const body: unknown = await response
                        .json().catch(() => undefined)
                    throw new apiError(response.status, body as errorType[] | undefined)
                }

                const data = (await response.json()) 

                if (!data) 
                    throw new Error('No access token is sent')

                AuthStore.setAccessToken(data)

                return data 
            } catch (error) {
                throw error
            }
        })().finally(() => {
            refresh = null 
        })
    }

    return refresh
}

async function apiRequest<T>(
    path: string,
    options: RequestInit = {},
    config: apiRequestConfig = {}
): Promise<T> {
    const {auth = true, retryOnUnauthorized = true} = config

    const token = auth ? AuthStore.getAccessToken() : null

    console.log(token)

    const headers = new Headers(options.headers);

    headers.set("Accept", "application/json");

    if (options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(
        `${API_BASE_URL}${path}`,
        {
            ...options,
            headers,
            // credentials: "include"
        }
    );

    if (!response.ok && response.status == 401 && auth && retryOnUnauthorized) {
        let newToken = AuthStore.getAccessToken()

        if (newToken != "" || newToken == token) {
            try {
                newToken = (await refreshRequest())
            } catch (error) {
                if (error instanceof apiError) {
                    AuthStore.clear()
                }
                throw error
            }
        }

        return apiRequest<T>(
            path, 
            {
                ...options,
                headers: {
                    ...Object.fromEntries(headers.entries()),
                    Authorization: `Bearer ${newToken}`,
                }
            },
            {
                ...config,
                retryOnUnauthorized: false,
            }
        )
    }

    if (!response.ok) {
        const body: unknown = await response
            .json().catch(() => undefined)
        throw new apiError(response.status, body as errorType[] | undefined)
    }

    if (response.status == 204) {
        return undefined as T
    }

    const text = await response.text();

    if (!text) {
        return undefined as T;
    }

    return JSON.parse(text) as T;
}

export {apiRequest,refreshRequest}