import {useRouteError, isRouteErrorResponse} from "react-router"

function RouteErrorPage() {
    const error = useRouteError()

    let message = "Something happened wrong! Please try again"
    console.log(error)
    if (isRouteErrorResponse(error)) {
        message = (error.status == 404) ? "Page not found" : error.statusText || message
    } else if (error instanceof Error) {
        message = error.message
    }

    return (
        <main className="route_error">
            <h1>Something happened wrong!</h1>
            <p className="alert" role="alert">{message}</p>
        </main>
    )
}

export default RouteErrorPage