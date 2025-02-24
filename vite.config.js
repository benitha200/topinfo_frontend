import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2015', // Ensure compatibility with modern JavaScript
    minify: 'esbuild', // Use esbuild for fast minification (default)
    sourcemap: false, // Disable sourcemaps for production builds
    chunkSizeWarningLimit: 1024, // Increase chunk size warning limit
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split vendor dependencies into a separate chunk
            return 'vendor';
          }
        },
      },
    },
  },
});


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   build: {
//     target: 'es2015',
//     minify: 'esbuild',
//     sourcemap: false,
//     chunkSizeWarningLimit: 2000, // Increase limit to 2MB
//     assetsInlineLimit: 4096,
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
//             if (id.includes('@radix-ui')) return 'radix-vendor';
//             if (id.includes('lodash')) return 'lodash-vendor';
//             if (id.includes('recharts')) return 'recharts-vendor'; // Separate Recharts
//             if (id.includes('@shadcn')) return 'shadcn-vendor'; // Separate ShadCN UI
//             if (id.includes('react-select')) return 'react-select-vendor'; // Separate React Select
//             return 'vendor';
//           }
//         },
//       },
//     },
//   },
// });

