import { createBrowserRouter } from "react-router";
import RouteErrorPage from "../../../pages/route_error/RouteErrorPage";
import { AuthGuard } from "../../guard/auth-guard";
import { PublicOnly } from "../../guard/public-only";
import { OtpGuard } from "../../guard/otp-guard";
import { lazy } from "react";
const ForumLayout = lazy(() => import("../../layouts/forum/ForumLayout"));
const AuthLayout = lazy(() => import("../../layouts/auth/AuthLayout"));
export const routes = [
    {
        element: <PublicOnly/>,
        errorElement: <RouteErrorPage/>,
        children: [
            {
                element: <AuthLayout/>, 
                children: [
                    {
                        path: '/auth/login',
                        lazy: () => import("../../../pages/auth/login/LoginPage").then(module => ({ Component: module.default })),
                    },
                    {
                        path: '/auth/register',
                        lazy: () => import("../../../pages/auth/register/RegisterPage").then(module => ({ Component: module.default })),
                    },
                    {
                        path: '/auth/recover_password',
                        lazy: () => import("../../../pages/auth/recover_password/RecoverPasswordPage").then(module => ({ Component: module.default }))
                    },
                    {
                        path: '/auth/recover_otp',
                        lazy: () => import("../../../pages/auth/otp/OtpPage").then(module => ({ Component: module.default }))
                    },
                    {
                        path: '/auth/set_password',
                        lazy: () => import("../../../pages/auth/set_password/SetPassword").then(module => ({ Component: module.default }))
                    }
                ]  
            }            
        ]
    },
    {
        element: <OtpGuard/>,
        errorElement: <RouteErrorPage/>,
        children: [
            {
                element: <AuthLayout/>, 
                children: [
                    {
                        path: '/auth/verify_otp',
                        lazy: () => import("../../../pages/auth/otp/OtpPage").then(module => ({ Component: module.default }))
                    }
                ] 
            }    
        ]
        
    },
    {
        element: <AuthGuard/>,
        errorElement: <RouteErrorPage/>,
        children: [
            {
                element: <ForumLayout/>,
                children: [
                    {
                        path: `/forum`,
                        lazy: () => import("../../../pages/forums/ForumPage").then(module => ({ Component: module.default }))
                    }
                ]
            }
        ]    
    }
]

const router = createBrowserRouter(routes)

export default router;