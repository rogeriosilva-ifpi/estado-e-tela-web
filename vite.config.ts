/// <reference types="vitest/config" />
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset }
  from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// O Vite serve a tela em :5173 e repassa para
// a API em :3000 tudo que começa com /api.
// Para o navegador, é tudo uma origem só.
export default defineConfig({
  plugins: [
    react(),
    // React Compiler 1.0: memoiza componentes
    // e hooks no build (capítulo 16)
    babel(
      { presets: [reactCompilerPreset()] }),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/health": "http://localhost:3000",
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["src/teste/dialogo.ts",
      "src/teste/rede.ts"],
    // a jornada E2E roda no Playwright
    exclude: ["e2e/**", "node_modules/**"],
  },
});
