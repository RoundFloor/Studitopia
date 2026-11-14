import {describe, it, expect} from "vitest"
import {useQueryClient} from "@tanstack/react-query"
import QueryProvider from './query-provider'
import {fireEvent, render, screen} from '@testing-library/react'
import { useState } from "react"

describe("query provider", () => {
    it("provide a query client to children", () => {
        function TestComponent() {
            const queryClient = useQueryClient()
            return (
                <p>
                    {queryClient ? "Query client is available" : "Query client is missing"}
                </p>
            )
        }

        render(
            <QueryProvider>
                <TestComponent/>
            </QueryProvider>
        )

        expect(screen.getByText("Query client is available")).toBeInTheDocument()
    })

    it("keep the same client when children rerender", () => {
        const clients: ReturnType<typeof useQueryClient>[] = []

        function TestComponent() {
            const queryClient = useQueryClient()
            const [count, setCount] = useState(0)
            clients.push(queryClient)

            return <button onClick={() => setCount((current) => current + 1)}>
                Count: {count}
            </button>
        }

        render(
            <QueryProvider>
                <TestComponent/>
            </QueryProvider>
        )

        fireEvent.click(screen.getByRole("button", {name: "Count: 0"}))
        expect(screen.getByRole("button", {name: "Count: 1"})).toBeInTheDocument()
        expect(clients[0]).toBe(clients[1])
    })
})

