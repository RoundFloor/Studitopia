export interface KeyReponse {
    session_id: string,
    user_id: string,
    created_time: number,
    expired_time: number,
    key: string,
    type: 'active' | 'recover' | 'delete' | 'refresh' | 'access'
};
export function KeyReponse(session_id: string, user_id: string, created_time: number, expired_time: number, key: string, type: 'active' | 'recover' | 'delete' | 'refresh' | 'access') {
    return {
        session_id,
        user_id,
        created_time,
        expired_time,
        key,
        type
    }
}