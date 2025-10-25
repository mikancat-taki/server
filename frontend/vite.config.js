import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../node/public", // Expressが読み込む場所
  },
  server: {
    port: 5173
  }
});
