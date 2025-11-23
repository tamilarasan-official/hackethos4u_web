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
    target: 'es2015', // Modern browsers only for smaller bundle
    minify: 'esbuild', // Use esbuild - safer than terser for React
    cssMinify: 'esbuild', // Minify CSS as well
    esbuild: {
      drop: ['console', 'debugger'], // Remove console and debugger
      legalComments: 'none', // Remove license comments
      minifyIdentifiers: true, // Safe minification
      minifySyntax: true, // Safe syntax minification
      minifyWhitespace: true, // Remove whitespace
      treeShaking: true, // Tree shake unused code
    },
    rollupOptions: {
      treeshake: {
        preset: 'recommended', // Safe tree-shaking (not 'smallest')
        moduleSideEffects: 'no-external', // Preserve side effects for external modules
      },
      output: {
        // Ensure proper module format for better compatibility
        format: 'es',
        // Preserve module structure to avoid breaking React
        preserveModules: false,
        // Generate interop helpers for better compatibility
        interop: 'auto',
        manualChunks: (id) => {
          // Core React - MUST be together and loaded first
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'react-core';
          }

          // React Router - separate but depends on react-core
          if (id.includes('node_modules/react-router')) {
            return 'react-router';
          }

          // Firebase - split into smaller chunks loaded on demand
          if (id.includes('firebase/app')) {
            return 'firebase-core';
          }
          if (id.includes('firebase/auth')) {
            return 'firebase-auth';
          }
          if (id.includes('firebase/firestore')) {
            return 'firebase-firestore';
          }
          if (id.includes('firebase/analytics')) {
            return 'firebase-analytics';
          }
          if (id.includes('firebase')) {
            return 'firebase-other';
          }

          // Radix UI - split by usage
          if (id.includes('@radix-ui/react-dialog') || id.includes('@radix-ui/react-tabs')) {
            return 'ui-admin';
          }
          if (id.includes('@radix-ui')) {
            return 'ui-core';
          }

          // Form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform')) {
            return 'form-vendor';
          }

          // React Query
          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor';
          }

          // Other large dependencies
          if (id.includes('node_modules')) {
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
    chunkSizeWarningLimit: 1000, // Increase limit to 1000kb to reduce warnings
    cssCodeSplit: true, // Split CSS into separate chunks
    sourcemap: false, // Disable sourcemaps in production for smaller size
    reportCompressedSize: false, // Faster builds
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
}));
