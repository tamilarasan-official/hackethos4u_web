import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { deferCssPlugin } from "./vite-plugin-defer-css";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && deferCssPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2015',
    minify: 'esbuild', // Use esbuild - safer and faster than terser for React
    cssMinify: 'esbuild',
    esbuild: {
      drop: ['console', 'debugger'],
      legalComments: 'none',
      treeShaking: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split heavy vendor libraries into separate chunks for better caching
          if (id.includes('node_modules')) {
            // React core libraries
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'react-vendor';
            }
            // React Router
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            // React Query
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor';
            }
            // UI libraries (Radix UI, etc.)
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            // Firebase
            if (id.includes('firebase') || id.includes('@firebase')) {
              return 'firebase-vendor';
            }
            // Form libraries
            if (id.includes('react-hook-form') || id.includes('zod')) {
              return 'form-vendor';
            }
            // Other vendor libraries
            return 'vendor';
          }
        },
        // Optimize asset file names with content hash for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 500, // Reduce to 500kb to encourage smaller chunks
    cssCodeSplit: true, // Split CSS into separate chunks
    sourcemap: false, // Disable sourcemaps in production for smaller size
    reportCompressedSize: false, // Faster builds
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
}));
