import type { AuthStatus } from "../../entities/session/auth-store";
import type { LoginResponse } from "../../features/auth/login/type";
import { apiError, type errorType,} from "./error";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

interface apiRequestConfig {
    auth?: boolean
    retryOnUnauthorized?: boolean
}

export interface ApiAuthHandlers {
    getAccessToken: () => string | null;
    setAuth: (token: string, role: string, status: AuthStatus) => void;
    onUnauthorized: () => void;
}

let authHandlers: ApiAuthHandlers = {
    getAccessToken: () => null,
    setAuth: () => {},
    onUnauthorized: () => {},
};

export function configureApiAuth(handlers: ApiAuthHandlers) {
    authHandlers = handlers;
}

let refresh: Promise<LoginResponse> | null = null

async function refreshRequest() {
    if (!refresh) {
        refresh = (async () => {
            try {
                let response: Response;
                try {
                    response = await fetch(`${API_BASE_URL}/auth/login?type=token`, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                        },
                        credentials: "include"
                    })
                } catch {
                    throw Error("Internet connection is interrupted")
                }

                if (!response.ok) {
                    const body: unknown = await response
                        .json().catch(() => undefined)
                    throw new apiError(response.status, body as errorType[] | undefined)
                }

                const data = (await response.json().catch(() => undefined)) as LoginResponse; 

                if (!data.access_token) {
                    throw new Error("No access token is sent");
                }

                authHandlers.setAuth(data.access_token, data.role, (data.status == "ACTIVE") ? "AUTHENTICATED": "PENDING_OTP");

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

    const token = auth ? authHandlers.getAccessToken() : null;

    const headers = new Headers(options.headers);

    headers.set("Accept", "application/json");

    if (options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    
    try {
        const response = await fetch(
            `${API_BASE_URL}${path}`,
            {
                ...options,
                headers,
                credentials: "include"
            }
        );

        if (!response.ok && response.status == 401 && auth && retryOnUnauthorized) {
            let newToken = authHandlers.getAccessToken();

            if (newToken != "" || newToken == token) {
                try {
                    newToken = (await refreshRequest()).access_token
                } catch (error) {
                    console.log("Begin")
                    if (error instanceof apiError) {
                        authHandlers.onUnauthorized();
                    }
                    console.log("End")
                    throw error
                }
            }

            if (!newToken) {
                throw new apiError(401, undefined);
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
    } catch (error) {
        throw error
    }
}

export {apiRequest,refreshRequest}