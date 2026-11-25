import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import App from "./App"

describe("application render", () => {
    it("render application entry content", () => {
        render(<App/>)
        expect(screen.getByRole("main")).toBeInTheDocument()
        expect(screen.getByRole("heading", {name: "Studitopia"})).toBeInTheDocument()
    })
})
