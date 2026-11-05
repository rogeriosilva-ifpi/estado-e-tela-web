import { QueryClientProvider }
  from "@tanstack/react-query";
import { render }
  from "@testing-library/react";
import { createMemoryRouter }
  from "react-router";
import { RouterProvider }
  from "react-router/dom";
import { consultas }
  from "../api/consultas.ts";
import { rotas } from "../app/rotas.tsx";

// Abre a aplicação inteira numa URL, com as
// rotas de verdade, o histórico em memória e
// o cache zerado.
export function abrir(url: string) {
  consultas.clear();
  const router = createMemoryRouter(rotas,
    { initialEntries: [url] });
  render(
    <QueryClientProvider client={consultas}>
      <RouterProvider router={router} />
    </QueryClientProvider>);
  return router;
}
