import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vitest/config'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    port: 8999,
    strictPort: true,
    https: (fs.existsSync(process.env.HTTPS_KEY_PATH || 'certs/server.key') && fs.existsSync(process.env.HTTPS_CERT_PATH || 'certs/server.crt')) ? {
      key: fs.readFileSync(process.env.HTTPS_KEY_PATH || 'certs/server.key'),
      cert: fs.readFileSync(process.env.HTTPS_CERT_PATH || 'certs/server.crt')
    } : undefined,
    fs: {
      strict: true,
      deny: [
        ".env",
        "**/*.md",
        "**/.git/**",
        "**/.gitignore"
      ]
    }
  },
  resolve: {
    alias: {
      '@assets': path.resolve(import.meta.dirname, './src/shared/assets'),
      '@': path.resolve(import.meta.dirname, './src')
    }
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: false,
    clearMocks: true,
    restoreMocks: true,
  },
})
