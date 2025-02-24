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


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   build: {
//     target: "es2015",
//     minify: "esbuild",
//     sourcemap: false,
//     chunkSizeWarningLimit: 500, // Reduced chunk size limit
//     assetsInlineLimit: 8192, // Inline small assets
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes("node_modules")) {
//             if (id.includes("react")) return "react-vendor";
//             if (id.includes("recharts")) return "charts-vendor";
//             if (id.includes("lodash")) return "lodash-vendor";
//             if (id.includes("axios") || id.includes("jspdf")) return "utils-vendor";
//             return "vendor";
//           }
//         },
//       },
//     },
//   },
//   optimizeDeps: {
//     exclude: ["recharts", "jspdf", "lodash"], // Exclude large libraries from pre-bundling
//   },
// });


