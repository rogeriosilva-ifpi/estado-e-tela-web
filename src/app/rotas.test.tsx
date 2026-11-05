import {
  cleanup, screen, within,
} from "@testing-library/react";
import userEvent
  from "@testing-library/user-event";
import {
  afterEach, expect, test, vi,
} from "vitest";
import { abrir } from "../teste/rota.tsx";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

// API falsa: responde pelo caminho pedido.
function api(rotas: Record<string,
  [number, unknown]>) {
  vi.stubGlobal("fetch", vi.fn(
    async (url: string) => {
      const { pathname } =
        new URL(url, "http://x");
      const [status, corpo] =
        rotas[pathname] ?? [404, {}];
      return Response.json(corpo, { status });
    }));
}

test("modo discreto não mostra nome inteiro",
  async () => {
    abrir("/");
    await userEvent.click(
      screen.getByLabelText(/Modo discreto/));
    expect(document.body.textContent)
      .not.toContain("Maria Souza");

    // abrir a alta da primeira paciente
    const cartao = screen.getByText("M. S.")
      .closest("li")!;
    await userEvent.click(within(cartao)
      .getByRole("button", { name: "Alta" }));
    expect(screen.getByRole("dialog",
      { name: "Dar alta a M. S.?" }))
      .toBeTruthy();
  });

test("a busca mora na URL", async () => {
  api({ "/api/patients": [200,
    [{ id: "p1", nome: "Maria Souza" }]] });
  abrir("/pacientes?q=ma");
  const campo = screen.getByLabelText(
    "Buscar no prontuário");
  expect((campo as HTMLInputElement).value)
    .toBe("ma");
  const link = await screen.findByRole("link",
    { name: "Maria Souza" });
  expect(link.getAttribute("href"))
    .toBe("/pacientes/p1");
});

test("paciente que não existe", async () => {
  api({});
  abrir("/pacientes/p999");
  expect(await screen.findByText(
    "Paciente não encontrado.")).toBeTruthy();
  expect(screen.getByRole("navigation"))
    .toBeTruthy();
});

test("rota desconhecida fica no layout",
  async () => {
    abrir("/nada-aqui");
    expect(await screen.findByText(
      "Página não encontrada.")).toBeTruthy();
    expect(screen.getByRole("navigation"))
      .toBeTruthy();
  });

test("sem login, o detalhe leva ao login",
  async () => {
    api({ "/api/patients/p1": [401,
      { error: "Não autenticado." }] });
    const router = abrir("/pacientes/p1");
    expect(await screen.findByLabelText(
      "E-mail")).toBeTruthy();
    expect(router.state.location.search)
      .toBe("?volta=%2Fpacientes%2Fp1");
  });
