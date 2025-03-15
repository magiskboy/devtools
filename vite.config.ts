import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [
      TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
      react(),
    ],
  }

  if (mode === 'development') {
    config.plugins?.push(analyzer())
  }

  return config;
});

