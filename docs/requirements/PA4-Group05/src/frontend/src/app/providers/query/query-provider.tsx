import {useState, type PropsWithChildren} from "react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

function QueryProvider({children}: PropsWithChildren) {
    const [queryClient] = useState(() =>
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 1,
                    refetchOnWindowFocus: false,
                    staleTime: 60*1000,
                }
            }
        })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider