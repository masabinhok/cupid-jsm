import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  base: './', // Add this if needed for relative paths
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true, // Enable WebSocket proxying
        changeOrigin: true, // Ensures proper handling of origin headers
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
