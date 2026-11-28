export type IdType =
    'university' | 'area' | 'subject' | 'post' | 'post-retrieve' |
    'major' | 'faculty' | 'account' | 'comment' | 'avatar' | 'image' | 'other'

export interface id {
    id: number,
    type: IdType
}
export interface ids {
    session_id: number,
    account_id: number,
    ids: id[]
}
export function id(id: number, type: IdType): id {
    return {id, type}
}

export function ids(session_id: number, account_id: number, ids: id[]): ids {
    return {session_id, account_id, ids}
}