import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  build: {
    // Increase the warning limit if needed (default is 500 KB)
    chunkSizeWarningLimit: 1000, // 1 MB warning threshold
    
    // Use manualChunks to split specific libraries or chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Example: Split vendor libraries into their own chunk
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'; // Create a separate chunk for React
            }
            // You can add more conditions for other libraries here
          }
        },
      },
    },
  },
});
