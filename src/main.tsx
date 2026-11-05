import { QueryClientProvider }
  from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter }
  from "react-router";
import { RouterProvider }
  from "react-router/dom";
import "./estilo/tokens.css";
import "./estilo/base.css";
import { consultas }
  from "./api/consultas.ts";
import { rotas } from "./app/rotas.tsx";

// Criado uma vez, fora da árvore do React.
const router = createBrowserRouter(rotas);

createRoot(document.getElementById("root")!)
  .render(
    <StrictMode>
      <QueryClientProvider client={consultas}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
