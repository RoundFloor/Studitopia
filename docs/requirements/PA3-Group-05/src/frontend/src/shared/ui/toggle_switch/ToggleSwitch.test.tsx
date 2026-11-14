import {describe, it, expect} from 'vitest'
import {screen, render} from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'
import { useState } from 'react'
import ToggleSwitch from './ToggleSwitch'

describe("toggle switch component interaction", () => {
    it("render state when clicked", async () => {
        const user = userEvent.setup()

        function TestComponent() {
            const [toggled, setToggled] = useState(false)
            
            return <div> 
                {toggled && <p>The switch is toggled</p>}
                <ToggleSwitch
                    role='test'
                    toggled={toggled}
                    onChange={setToggled}
                />
            </div>
        }
        render(<TestComponent/>)

        await user.click(screen.getByRole("test"))
        expect(screen.getByText("The switch is toggled")).toBeInTheDocument()
        await user.click(screen.getByRole("test"))
        expect(screen.queryByText("The switch is toggled")).not.toBeInTheDocument()
    })
})