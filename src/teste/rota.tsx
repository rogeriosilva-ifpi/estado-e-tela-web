import { render }
  from "@testing-library/react";
import { createMemoryRouter }
  from "react-router";
import { RouterProvider }
  from "react-router/dom";
import { rotas } from "../app/rotas.tsx";

// Abre a aplicação inteira numa URL, com as
// rotas de verdade e o histórico em memória.
export function abrir(url: string) {
  const router = createMemoryRouter(rotas,
    { initialEntries: [url] });
  render(<RouterProvider router={router} />);
  return router;
}
