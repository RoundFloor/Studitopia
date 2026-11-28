interface RegisterRequest {
    displayname: string,
    username: string,
    email: string,
    password: string
}

type RegisterResponse = {
    access_token: string;
    role: string;
    status: string;
}

export type {RegisterRequest, RegisterResponse}