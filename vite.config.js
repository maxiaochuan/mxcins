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
              index: true,
              component: '@/pages/home',
            }
          ]
        }
      ]
    })
  ],
});
