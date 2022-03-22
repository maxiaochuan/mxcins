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
      '@mxcins/components': `${path.resolve(process.cwd(), 'packages', 'components')}/`,
      '@mxcins/libs': `${path.resolve(process.cwd(), 'packages', 'libs')}/`,
      '@/': `${path.resolve(process.cwd(), 'src')}/`
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
              index: true,
              component: '@/pages/home',
            }
          ]
        }
      ]
    })
  ],
});
