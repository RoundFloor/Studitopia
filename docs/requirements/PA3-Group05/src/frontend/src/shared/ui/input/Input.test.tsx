import {describe, it, expect} from 'vitest'
import {screen, render} from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'
import { Input } from './Input'
import { useState } from 'react'

describe("input component interaction", () => {
    it("update text when user inputs", async () => {
        const user = userEvent.setup()

        function TestComponent() {
            const [username, setUsername] = useState("")
            
            return <div>
                {username != "" && <p>Username: {username}</p>} 
                <Input value={username} 
                    placeholder='Please input username' 
                    type='text' 
                    onChange={(event) => setUsername(event.target.value)}>
                </Input>
            </div>
        }
        render(<TestComponent/>)
        const input = screen.getByRole("textbox")

        await user.type(input, "Anonymous")
        expect(screen.getByText("Username: Anonymous")).toBeInTheDocument()
        expect(screen.getByRole("textbox")).toHaveValue("Anonymous")
    })

    it("can't update when disabled", async () => {
        const user = userEvent.setup()

        function TestComponent() {
            const [username, setUsername] = useState("")
            
            return <div>
                {username != "" && <p>Username: {username}</p>} 
                <Input value={username} 
                    placeholder='Please input username' 
                    type='text' 
                    disabled={true}
                    onChange={(event) => setUsername(event.target.value)}>
                </Input>
            </div>
        }
        render(<TestComponent/>)
        const input = screen.getByRole("textbox")

        await user.type(input, "Anonymous")
        expect(screen.queryByText("Username: Anonymous")).not.toBeInTheDocument()
        expect(screen.getByRole("textbox")).not.toHaveValue("Anonymous")
    })
})