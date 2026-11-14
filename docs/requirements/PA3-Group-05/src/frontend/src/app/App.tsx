import { RouterProvider } from "react-router"
import QueryProvider from "./providers/query"
import router from "./providers/router"
import { AuthInitializer } from "./providers/auth/auth-initializer"

function App() {
  return (
    <QueryProvider>
      <AuthInitializer />
      <RouterProvider router={router}/>
    </QueryProvider>
  )
}

export default App
