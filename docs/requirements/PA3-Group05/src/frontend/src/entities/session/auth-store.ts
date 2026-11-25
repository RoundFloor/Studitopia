// import {create} from 'zustand'

import type { AuthStatus } from "./type"

// type AuthStatus = 
//     "LOADING" |
//     "UNAUTHENTICATED" |
//     "PENDING_OTP" |
//     "AUTHENTICATED"
// interface AuthState {
//     status: AuthStatus
//     accessToken: string | null
//     role: string | null
// }

const AuthStore = {
    getStatus() {
        return localStorage.getItem("status")
    },
    getRole() {
        return localStorage.getItem("role")
    },
    getAccessToken() {
        return localStorage.getItem("access")
    },
    setStatus(status: AuthStatus) {
        return localStorage.setItem("status", status)
    },
    setRole(role: string) {
        return localStorage.setItem("role", role)
    },
    setAccessToken(accessToken: string) {
        return localStorage.setItem("access", accessToken)
    },
    clear() {
        localStorage.clear()
    }
}

export {AuthStore}

// interface AuthState {
//     status: AuthStatus
//     accessToken: string | null
//     role: string | null

//     setAuth: (
//         accessToken: string | null,
//         role: string,
//         status: AuthStatus
//     ) => void;

//     setToken: (accessToken: string | null) => void; 

//     setStatus: (status: AuthStatus) => void

//     setState: (status: AuthStatus, role: string | null) => void;

//     logout: () => void
// }

// const useAuthStore = create<AuthState>((set) => ({
//     status: "LOADING",
//     accessToken: null,
//     role: "",

//     setAuth: (accessToken, role, status) => {
//         localStorage.setItem('role', role)
//         localStorage.setItem('status', status)
//         set({
//             accessToken,
//             role,
//             status,
//         })
//     },

//     setToken: (accessToken) => set({ accessToken }),

//     setStatus: (status) => set({status}),

//     setState: (status, role) => set({ status, role }),

//     logout: () =>
//         set({
//             status: "UNAUTHENTICATED",
//             accessToken: null,
//             role: null,
//         }),
// }));

// export {useAuthStore, type AuthStatus}