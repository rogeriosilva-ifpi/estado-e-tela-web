import { defineConfig }
  from "@playwright/test";

// Jornada E2E contra a API de verdade, que
// roda à parte em :3000 (estado-e-tela-api,
// tag cap15). Só o Vite sobe por aqui.
export default defineConfig({
  testDir: "e2e",
  use: {
    baseURL: "http://localhost:5173",
    // outro Chromium, se preciso
    launchOptions: { executablePath:
      process.env.PW_CHROMIUM || undefined },
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});
