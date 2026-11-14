import {describe, it, expect} from 'vitest'
import {screen, render} from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'
import { useState } from 'react'
import TickBox from './TickBox'

describe("tickBox component interaction", () => {
    it("render state when clicked", async () => {
        const user = userEvent.setup()

        function TestComponent() {
            const [checked, setChecked] = useState(false)
            
            return <div> 
                <TickBox
                    role='test'
                    checked={checked}
                    onChange={setChecked}
                    />
            </div>
        }
        render(<TestComponent/>)

        await user.click(screen.getByRole("test"))
        expect(screen.getByRole("img")).toBeInTheDocument()
        await user.click(screen.getByRole("test"))
        expect(screen.queryByRole("img")).not.toBeInTheDocument()
    })
})