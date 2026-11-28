export class OTPResponse {
    constructor(
        public readonly created_time: number,
        public readonly expired_time: number
    ) {}
}
export interface OTPRequest {
    created_time: number,
    expired_time: number,
    key: string,
    type: "active" | "recover" | "delete"
}
export function OTPRequest(created_time: number, expired_time: number, key: string, type: "active" | "recover" | "delete") {
    return {created_time, expired_time, key, type}
}