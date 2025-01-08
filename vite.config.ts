import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Allow connections from any device on the network
    port: 3000,       // You can change the port if needed
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
