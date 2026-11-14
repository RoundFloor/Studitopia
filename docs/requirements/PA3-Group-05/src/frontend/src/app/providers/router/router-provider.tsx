import { createBrowserRouter} from "react-router";
import RouteErrorPage from "../../../pages/route_error/RouteErrorPage";
import AuthLayout from "../../layouts/auth/AuthLayout";
import { AuthGuard } from "../../guard/auth-guard";
import { PublicOnly } from "../../guard/public-only";

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
                        path: 'auth/set_password',
                        lazy: () => import("../../../pages/auth/set_password/SetPassword").then(module => ({ Component: module.default }))

                    }
                ]  
            }            
        ]
    },
    {
        element: <AuthLayout/>, 
        errorElement: <RouteErrorPage/>,
        children: [
            {
                path: '/auth/verify_otp',
                lazy: () => import("../../../pages/auth/otp/OtpPage").then(module => ({ Component: module.default }))
            }
        ]  
    },
    {
        element: <AuthGuard/>,
        errorElement: <RouteErrorPage/>,
        children: [
            {
                path: '/',
                lazy: () => import("../../../pages/home/HomePage").then(module => ({ Component: module.default }))
            }
        ]    
    }
]

const router = createBrowserRouter(routes)

export default router;