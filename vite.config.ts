import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { analyzer } from 'vite-bundle-analyzer';
import { generateSitemap } from 'tanstack-router-sitemap';
import { ROUTE_CONFIG } from './src/routes.config';
import path from 'node:path';


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const siteUrl = 'https://devtools.nkthanh.dev'
  const routes = ROUTE_CONFIG.reduce((prev, curr) => ({
    ...prev,
    [curr.path]: {
      changeFrequency: 'daily'
    }
  }), {});

  const config: UserConfig = {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      generateSitemap({
        siteUrl,
        defaultPriority: 0.5,
        routes,
      }),
      TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
      react(),
    ],
  }

  if (mode === 'development') {
    config.plugins?.push(analyzer())
  }

  return config;
});

