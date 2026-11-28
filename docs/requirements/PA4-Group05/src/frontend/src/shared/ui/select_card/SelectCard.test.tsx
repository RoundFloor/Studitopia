import {describe, it, expect} from 'vitest'
import {screen, render} from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'
import { useState } from 'react'
import SelectCard from './SelectCard'

describe("select card component interaction", () => {
    it("render state when clicked", async () => {
        const user = userEvent.setup()

        function TestComponent() {
            const [selected, setSelected] = useState(false)
            
            return <div> 
                <SelectCard
                    selected={selected}
                    text="Math"
                    onChange={setSelected}
                    />
            </div>
        }
        render(<TestComponent/>)

        await user.click(screen.getByText("Math"))
        expect(screen.getByRole("img")).toBeInTheDocument()
        await user.click(screen.getByText("Math"))
        expect(screen.queryByRole("img")).not.toBeInTheDocument()
    })
})