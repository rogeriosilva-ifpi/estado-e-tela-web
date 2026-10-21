/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// O Vite serve a tela em :5173 e repassa para
// a API em :3000 tudo que começa com /api.
// Para o navegador, é tudo uma origem só.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/health": "http://localhost:3000",
    },
  },
  test: { environment: "jsdom" },
});
