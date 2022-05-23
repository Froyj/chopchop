import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@api': path.resolve(__dirname, './src/api'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@customTypes': path.resolve(__dirname, './src/customTypes'),
      '@reducers': path.resolve(__dirname, './src/reducers'),
    },
  },
});
