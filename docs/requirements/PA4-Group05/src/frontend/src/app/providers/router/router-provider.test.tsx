import {describe, it, expect} from 'vitest'
import {render, screen} from "@testing-library/react"
import { createMemoryRouter, RouterProvider} from 'react-router';
import {routes} from "./router-provider"

describe("app router", () => {
    it("render home page at /", () => {
        const router = createMemoryRouter(routes, 
        {
            initialEntries: ["/forum"]
        })
        render(<RouterProvider router={router}/>)
        expect(screen.getByRole("heading", {name: "Studitopia"})).toBeInTheDocument()
    });
})