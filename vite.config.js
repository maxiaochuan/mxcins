import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import routes from './packages/vite-plugin-routes';

export default defineConfig({
  build: {
    minify: false,
  },
  resolve: {
    alias: {
      '@mxcins/components': `${path.resolve(process.cwd(), 'packages', 'components', 'src')}/`,
      '@mxcins/webapi': `${path.resolve(process.cwd(), 'packages', 'webapi')}/`,
      '@/': `${path.resolve(process.cwd(), 'src')}/`,
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [],
      },
    }),
    routes({
      routes: [
        {
          path: '/',
          component: '@/layouts',
          routes: [
            {
              path: '/components/button',
              component: '@/pages/components/button',
            },
            {
              path: '/components/divider',
              component: '@/pages/components/divider',
            },
            {
              path: '/components/grid',
              component: '@/pages/components/grid',
            },
            {
              path: '/components/layout',
              component: '@/pages/components/layout',
            },
            {
              path: '/components/space',
              component: '@/pages/components/space',
            },
            {
              path: '/components/input',
              component: '@/pages/components/input',
            },
            {
              path: '/components/tooltip',
              component: '@/pages/components/tooltip',
            },
            {
              path: '/components/card',
              component: '@/pages/components/card',
            },
            {
              path: '/components/form',
              component: '@/pages/components/form',
            },
            {
              path: '/colors',
              component: '@/pages/colors',
            },
            {
              index: true,
              component: '@/pages/home',
            },
          ],
        },
      ],
    }),
  ],
});
