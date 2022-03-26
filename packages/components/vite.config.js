import { defineConfig } from 'vite';
import packageJSON from './package.json';

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@ant-design/icons',
        ...Object.keys(packageJSON.dependencies)
      ],
    }
  }
})