interface AccountResponse {
    avatar: string | null,
    displayname: string,
    university_id: string | null,
    university_name: string | null,
    faculty_id: string | null,
    faculty_name: string | null,
    major_id: string | null,
    major_name: string | null,
    role: string,
    status: string,
    create_time: Date
}

export { type AccountResponse }