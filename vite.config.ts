import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize build output
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
      },
    },
    // Chunk size configuration
    rollupOptions: {
      output: {
        manualChunks: {
          "framer-motion": ["framer-motion"],
        },
      },
    },
    // Report compressed size
    reportCompressedSize: true,
    // CSS code splitting
    cssCodeSplit: true,
    // Source maps for debugging (optional)
    sourcemap: false,
  },
  // Optimization untuk development
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion"],
  },
});
