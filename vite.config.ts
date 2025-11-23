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
    minify: 'terser', // More aggressive minification than esbuild
    cssMinify: 'esbuild', // Minify CSS as well
    terserOptions: {
      compress: {
        drop_console: true, // Remove all console.* calls
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'], // Remove specific console methods
        passes: 2, // Run compression twice for better results
        unsafe: true, // Enable unsafe optimizations for smaller output
        unsafe_comps: true, // Optimize comparisons
        unsafe_math: true, // Optimize math operations
        unsafe_methods: true, // Optimize method calls
        unsafe_proto: true, // Optimize prototype access
        dead_code: true, // Remove dead code
        toplevel: true, // Mangle top-level variable names
        keep_infinity: false, // Replace Infinity with 1/0
      },
      mangle: {
        toplevel: true, // Mangle top-level variable names
        safari10: true, // Safari 10 support
        properties: false, // Don't mangle property names (safer)
      },
      format: {
        comments: false, // Remove all comments
        ecma: 2015, // Use ES2015 syntax
        safari10: true, // Safari 10 compatibility
      },
    },
    esbuild: {
      drop: ['console', 'debugger'], // Fallback for dev mode
      legalComments: 'none', // Remove license comments
    },
    rollupOptions: {
      treeshake: {
        preset: 'recommended', // Safe tree-shaking (not 'smallest')
      },
      output: {
        manualChunks: (id) => {
          // Core React - keep together
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }

          // Firebase - split into smaller chunks loaded on demand
          if (id.includes('firebase/app')) {
            return 'firebase-core';
          }
          if (id.includes('firebase/auth')) {
            return 'firebase-auth'; // Loaded only when auth is needed
          }
          if (id.includes('firebase/firestore')) {
            return 'firebase-firestore'; // Loaded only when firestore is needed
          }
          if (id.includes('firebase/analytics')) {
            return 'firebase-analytics'; // Already lazy loaded
          }
          if (id.includes('firebase')) {
            return 'firebase-other';
          }

          // Radix UI - split by usage
          if (id.includes('@radix-ui/react-dialog') || id.includes('@radix-ui/react-tabs')) {
            return 'ui-admin'; // Only for admin pages
          }
          if (id.includes('@radix-ui')) {
            return 'ui-core'; // Common UI components
          }

          // Form libraries - only for forms
          if (id.includes('react-hook-form') || id.includes('@hookform')) {
            return 'form-vendor';
          }

          // React Query - keep separate
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
