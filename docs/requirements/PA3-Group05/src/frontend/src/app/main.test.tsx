import {vi, describe, beforeEach, it, expect} from "vitest"
import {StrictMode} from "react";
import App from './App'

const { createRootMock, renderMock } = vi.hoisted(() => ({
    createRootMock: vi.fn(),
    renderMock: vi.fn()
}))

vi.mock("react-dom/client", () => ({
    createRoot: createRootMock
}))

vi.mock("./App", () => ({
    default: () => null
}))

describe("application bootstrap", () => {
    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        createRootMock.mockReturnValue({
            render: renderMock
        })
    })

    it("mount the application into the root element", async () => {
        document.body.innerHTML = '<div id="root"></div>'
        await import("./main")

        expect(createRootMock).toHaveBeenCalledWith(
            document.getElementById('root')
        )

        expect(renderMock).toHaveBeenCalledOnce()

        const renderedElement = renderMock.mock.calls[0][0]
        expect(renderedElement.type).toBe(StrictMode) 
        expect(renderedElement.props.children.type).toBe(App)
    })

    it("throw error when the root element is missing", async () => {
        document.body.innerHTML = ''

        await expect(import('./main')).rejects.toThrow(
            'Root element is missing'
        )

        expect(createRootMock).not.toHaveBeenCalled()
    })
});