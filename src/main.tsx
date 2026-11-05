import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter }
  from "react-router";
import { RouterProvider }
  from "react-router/dom";
import "./estilo/tokens.css";
import "./estilo/base.css";
import { rotas } from "./app/rotas.tsx";

// Criado uma vez, fora da árvore do React.
const router = createBrowserRouter(rotas);

createRoot(document.getElementById("root")!)
  .render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
