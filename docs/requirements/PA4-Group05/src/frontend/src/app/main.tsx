import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { initApiAuth } from './providers/auth/auth-initializer'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element is missing')
}

initApiAuth();

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
