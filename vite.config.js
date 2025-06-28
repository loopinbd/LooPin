// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: ".", // Ensure Vite looks in the project root
  build: {
    outDir: "dist", // Default build output directory
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Optional: allow @ as alias for /src
    },
  },
  server: {
    port: 3000,
  },
});
