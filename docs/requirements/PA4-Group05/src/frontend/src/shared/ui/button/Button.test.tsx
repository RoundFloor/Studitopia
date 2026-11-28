import {expect, describe, it} from "vitest"
import {screen, render} from "@testing-library/react"
import {userEvent} from "@testing-library/user-event"
import { useState } from "react"
import Button from "./Button"

describe("button component interaction", () => {
    it("implement a certain function when it is clicked", async () => {
        const user = userEvent.setup()

        function TestComponent() {
            const [result, setResult] = useState("")
            return(<div>
                {result != "" && <p>{result}</p>}    
                <Button onClick={() => setResult("Button has clicked")}/>
            </div>)
        }
        
        render(<TestComponent/>)       
        
        await user.click(screen.getByRole("button"))

        expect(await screen.findByText("Button has clicked")).toBeInTheDocument()
    })

    it("don't activate any function when it is disabled", async () => {
        const user = userEvent.setup()

        function TestComponent() {
            const [result, setResult] = useState("")
            return(<div>
                {result != "" && <p>{result}</p>}    
                <Button disabled={true} onClick={() => setResult("The certain function is implemented")}/>
            </div>)
        }
        
        render(<TestComponent/>)       
        
        await user.click(screen.getByRole("button"))

        expect(screen.queryByText("Button has clicked")).not.toBeInTheDocument()
    })
})