import {
  cleanup, screen, within,
} from "@testing-library/react";
import userEvent
  from "@testing-library/user-event";
import {
  afterEach, beforeEach, expect, test, vi,
} from "vitest";
import { esquecer, lembrar }
  from "../compartilhado/sessao.ts";
import { apiFalsa, SEMENTE }
  from "../teste/api.ts";
import { abrir } from "../teste/rota.tsx";

beforeEach(() => lembrar(
  { nome: "Dra. Ana", papel: "profissional" }));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  localStorage.clear();
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
  apiFalsa(SEMENTE);
  abrir("/pacientes?q=ma");
  const campo = screen.getByLabelText(
    "Buscar no prontuário");
  expect((campo as HTMLInputElement).value)
    .toBe("ma");
  const link = await screen.findByRole("link",
    { name: "Maria Souza" });
  expect(link.getAttribute("href"))
    .toBe("/pacientes/p1?q=ma");
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
    esquecer();
    api({ "/api/patients/p1": [401,
      { error: "Não autenticado." }] });
    const router = abrir("/pacientes/p1");
    expect(await screen.findByLabelText(
      "E-mail")).toBeTruthy();
    expect(router.state.location.search)
      .toBe("?volta=%2Fpacientes%2Fp1");
  });

const lista = () => screen.getByRole("list",
  { name: "Resultados" });
const aberto = () => screen.getByRole(
  "article", { name: "Paciente aberto" });
const abrirPaciente = async (nome: string) =>
  userEvent.click(await within(lista())
    .findByRole("link", { name: nome }));

test("a lista mostra o nome editado",
  async () => {
    apiFalsa(SEMENTE);
    abrir("/pacientes?q=jo");
    await abrirPaciente("João Lima");
    const nome = await within(await screen
      .findByRole("article")).findByLabelText(
      "Nome");
    await userEvent.clear(nome);
    await userEvent.type(nome,
      "João Lima Neto");
    await userEvent.click(within(aberto())
      .getByRole("button",
        { name: "Salvar" }));
    expect(await within(lista()).findByRole(
      "link", { name: "João Lima Neto" }))
      .toBeTruthy();
  });

test("trocar de paciente troca o detalhe",
  async () => {
    apiFalsa(SEMENTE);
    abrir("/pacientes?q=a");
    await abrirPaciente("Maria Souza");
    await screen.findByText(
      "898001234567890");
    await abrirPaciente("João Lima");
    expect(await screen.findByText(
      "898009876543210")).toBeTruthy();
  });

test("recepção não vê Inativar", async () => {
  lembrar({ nome: "Carla", papel: "recepcao" });
  apiFalsa(SEMENTE);
  abrir("/pacientes/p1");
  await screen.findByText("898001234567890");
  expect(within(aberto()).queryByRole(
    "button", { name: "Inativar" })).toBeNull();
});
