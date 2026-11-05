import {
  cleanup, render, screen,
} from "@testing-library/react";
import userEvent
  from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import {
  afterEach, expect, test, vi,
} from "vitest";
import { BuscaProntuario }
  from "./Busca.tsx";
import { useBusca } from "./consultas.ts";

// Isola o componente: sem rede, sem cache,
// sem atraso. O hook devolve o que o teste
// mandar.
vi.mock("./consultas.ts", () => ({
  AVISO: {},
  useBusca: vi.fn(),
}));

const itens = ["Ana", "Bia", "Caio", "Davi",
  "Edu"].map((nome, i) => ({ id: `p${i}`,
  nome, cns: "", nascimento: "" }));

afterEach(cleanup);

test("Próxima pede a página 2", async () => {
  vi.mocked(useBusca).mockReturnValue({
    data: { itens, total: 7, pagina: 1,
      porPagina: 5 },
    error: null,
  } as unknown as ReturnType<typeof useBusca>);
  render(<MemoryRouter
    initialEntries={["/?q=a"]}>
    <BuscaProntuario /></MemoryRouter>);
  expect(screen.getByText(/Página 1 de 2/))
    .toBeTruthy();
  await userEvent.click(screen.getByRole(
    "button", { name: "Próxima" }));
  expect(useBusca)
    .toHaveBeenLastCalledWith("a", 2);
});
