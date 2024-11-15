import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        '@fortawesome/fontawesome-svg-core', // Externalize FontAwesome
        'chart.js', // Externalize chart.js if needed to avoid bundling
      ]
    }
  },
});
