interface LoginRequest {
    identifier: string
    password: string
}

type LoginParameter = {
    type: string;
    data?: LoginRequest;
};

type LoginResponse = {
    access_token: string;
    role: string;
    status: string;
}

export type {LoginRequest, LoginParameter, LoginResponse}