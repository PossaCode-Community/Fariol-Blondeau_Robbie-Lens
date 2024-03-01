// vite.config.js
import path from "path";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "nested/about.html"),
        portfolio: resolve(__dirname, "nested/portfolio.html"),
        tarifs: resolve(__dirname, "nested/tarifs.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
