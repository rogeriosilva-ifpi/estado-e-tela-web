import {
  cleanup, screen, within,
} from "@testing-library/react";
import userEvent
  from "@testing-library/user-event";
import {
  afterEach, beforeEach, expect, test,
} from "vitest";
import { consultas }
  from "../api/consultas.ts";
import { apiFalsa, CARLA, SEMENTE }
  from "../teste/api.ts";
import { abrir } from "../teste/rota.tsx";

// por padrão, a Dra. Ana entrou
beforeEach(() => apiFalsa(SEMENTE));
afterEach(cleanup);

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
  abrir("/pacientes?q=ma");
  const campo = await screen.findByLabelText(
    "Buscar no prontuário");
  expect((campo as HTMLInputElement).value)
    .toBe("ma");
  const link = await screen.findByRole("link",
    { name: "Maria Souza" });
  expect(link.getAttribute("href"))
    .toBe("/pacientes/p1?q=ma");
});

test("paciente que não existe", async () => {
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

const lista = () => screen.findByRole("list",
  { name: "Resultados" });
const aberto = () => screen.getByRole(
  "article", { name: "Paciente aberto" });
const abrirPaciente = async (nome: string) =>
  userEvent.click(await within(await lista())
    .findByRole("link", { name: nome }));
const botao = (nome: string) =>
  within(aberto()).getByRole("button",
    { name: nome });

test("a lista mostra o nome editado",
  async () => {
    abrir("/pacientes?q=jo");
    await abrirPaciente("João Lima");
    const nome = await within(await screen
      .findByRole("article")).findByLabelText(
      "Nome");
    await userEvent.clear(nome);
    await userEvent.type(nome,
      "João Lima Neto");
    await userEvent.click(botao("Salvar"));
    expect(await within(await lista())
      .findByRole("link",
        { name: "João Lima Neto" }))
      .toBeTruthy();
  });

test("trocar de paciente troca o detalhe",
  async () => {
    abrir("/pacientes?q=a");
    await abrirPaciente("Maria Souza");
    await screen.findByText(
      "898001234567890");
    await abrirPaciente("João Lima");
    expect(await screen.findByText(
      "898009876543210")).toBeTruthy();
  });

// ---- capítulo 15: sessão e permissão ----

test("sem sessão, vai ao login sem pedir "
  + "o paciente", async () => {
  const { pedidos } = apiFalsa(SEMENTE,
    { usuario: null });
  const router = abrir("/pacientes/p1");
  expect(await screen.findByLabelText(
    "E-mail")).toBeTruthy();
  expect(router.state.location.search)
    .toBe("?volta=%2Fpacientes%2Fp1");
  expect(pedidos).not.toContain(
    "GET /api/patients/p1");
});

test("recepção não vê Inativar", async () => {
  apiFalsa(SEMENTE, { usuario: CARLA });
  abrir("/pacientes/p1");
  await screen.findByText("898001234567890");
  expect(within(aberto()).queryByRole(
    "button", { name: "Inativar" }))
    .toBeNull();
});

test("sessão que cai no meio do trabalho: "
  + "login e volta ao paciente", async () => {
  const api = apiFalsa(SEMENTE);
  const router = abrir("/pacientes/p2?q=jo");
  await screen.findByText("898009876543210");
  api.encerrarSessao();
  await userEvent.click(botao("Salvar"));
  expect(router.state.location.search).toBe(
    "?volta=%2Fpacientes%2Fp2%3Fq%3Djo");
  await userEvent.type(await screen
    .findByLabelText("E-mail"), "a@b.dev");
  await userEvent.type(screen
    .getByLabelText("Senha"), "x");
  await userEvent.click(screen.getByRole(
    "button", { name: "Entrar" }));
  expect(await screen.findByText(
    "898009876543210")).toBeTruthy();
  expect(router.state.location.pathname)
    .toBe("/pacientes/p2");
});

test("403 avisa ali mesmo e não leva ao "
  + "login", async () => {
  const inativar =
    "POST /api/patients/p1/inativar";
  apiFalsa(SEMENTE,
    { recusar: { [inativar]: 403 } });
  const router = abrir("/pacientes/p1");
  await screen.findByText("898001234567890");
  await userEvent.click(botao("Inativar"));
  await userEvent.click(screen.getByRole(
    "button",
    { name: "Confirmar inativação" }));
  expect(await screen.findByText(
    "Seu papel não pode inativar."))
    .toBeTruthy();
  expect(router.state.location.pathname)
    .toBe("/pacientes/p1");
});

test("sair esquece tudo o que a tela viu",
  async () => {
    abrir("/pacientes/p1");
    await screen.findByText(
      "898001234567890");
    await userEvent.click(screen.getByRole(
      "button", { name: "Sair" }));
    expect(await screen.findByLabelText(
      "E-mail")).toBeTruthy();
    expect(consultas.getQueryCache()
      .findAll({ queryKey: ["pacientes"] }))
      .toHaveLength(0);
    expect(screen.queryByRole("button",
      { name: "Sair" })).toBeNull();
  });

// ---- capítulo 16: a rede de verdade ----

test("Próxima mostra a página 2",
async () => {
  const sete = Array.from({ length: 7 },
    (_, i) => ({ id: `x${i + 1}`,
      nome: `Paciente ${i + 1}`,
      cns: String(i), nascimento: "" }));
  apiFalsa(sete);
  abrir("/pacientes?q=paciente");
  const links = async () => within(
    await lista()).findAllByRole("link");
  expect(await links()).toHaveLength(5);
  await userEvent.click(await screen
    .findByRole("button",
      { name: "Próxima" }));
  expect(await screen.findByRole("link",
    { name: "Paciente 6" })).toBeTruthy();
  expect(await links()).toHaveLength(2);
});
