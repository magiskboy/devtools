import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path';

const onCI = process.env['CI'] === 'true';

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  test: {
    watch: !onCI,
    browser: {
      headless: onCI,
      enabled: true,
      provider: 'playwright',
      instances: [
        { browser: 'chromium' },
      ],
    },
  },
})
