import {
  act, cleanup, render, screen, waitFor,
} from "@testing-library/react";
import userEvent
  from "@testing-library/user-event";
import {
  afterEach, expect, test, vi,
} from "vitest";
import { MemoryRouter } from "react-router";
import { AssistenteAdmissao as Original }
  from "./Assistente.tsx";

// o assistente tem links: precisa de rota
const AssistenteAdmissao = () => (
  <MemoryRouter><Original /></MemoryRouter>);

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  sessionStorage.clear();
});

const botao = (nome: string | RegExp) =>
  screen.getByRole("button", { name: nome });
const valor = (rotulo: string) =>
  (screen.getByLabelText(rotulo) as
    HTMLInputElement).value;
const passo = () =>
  screen.getByRole("heading").textContent;

async function identificar() {
  const u = userEvent;
  await u.type(screen.getByLabelText("Nome"),
    "Rosa Amaral");
  await u.type(screen.getByLabelText("CNS"),
    "898001112223334");
  await u.type(
    screen.getByLabelText("Nascimento"),
    "1971-05-20");
}
async function ateConfirmacao() {
  await identificar();
  await userEvent.click(botao("Avançar"));
  await userEvent.click(botao("Avançar"));
}
const admitir = () =>
  userEvent.click(botao(/Admitir|Enviando/));

// servidor que só responde quando mandarmos
function servidorLento() {
  let responder = (_r: Response) => {};
  const f = vi.fn(() => new Promise<Response>(
    (ok) => { responder = ok; }));
  vi.stubGlobal("fetch", f);
  return { f, ok: () => responder(Response
    .json({ id: "p101" }, { status: 201 })) };
}

test("valida antes de enviar", async () => {
  const f = vi.fn();
  vi.stubGlobal("fetch", f);
  render(<AssistenteAdmissao />);
  await userEvent.click(botao("Avançar"));
  expect(screen.getByText(
    "CNS tem 15 dígitos.")).toBeTruthy();
  expect(f).not.toHaveBeenCalled();
});

test("não envia duas vezes", async () => {
  const s = servidorLento();
  render(<AssistenteAdmissao />);
  await ateConfirmacao();
  await admitir();
  await admitir();
  expect(s.f).toHaveBeenCalledTimes(1);
  s.ok();
});

test("dois cliques no mesmo instante",
  async () => {
    const s = servidorLento();
    render(<AssistenteAdmissao />);
    await ateConfirmacao();
    const b = botao("Admitir");
    // sem esperar o React redesenhar
    act(() => { b.click(); b.click(); });
    await waitFor(() =>
      expect(s.f).toHaveBeenCalled());
    expect(s.f).toHaveBeenCalledTimes(1);
    s.ok();
  });

test("mostra o que o servidor recusou",
  async () => {
    const corpo = { error: "Dados inválidos.",
      campos: ["cns"] };
    vi.stubGlobal("fetch", vi.fn(async () =>
      Response.json(corpo, { status: 400 })));
    render(<AssistenteAdmissao />);
    await ateConfirmacao();
    await admitir();
    expect(await screen.findByText(
      "Recusado pelo servidor."))
      .toBeTruthy();
    expect(valor("Nome")).toBe("Rosa Amaral");
  });

test("CNS repetido no servidor", async () => {
  const msg =
    "Já existe paciente com este CNS.";
  vi.stubGlobal("fetch", vi.fn(async () =>
    Response.json({ error: msg },
      { status: 409 })));
  render(<AssistenteAdmissao />);
  await ateConfirmacao();
  await admitir();
  const alerta = await screen.findByRole(
    "alert");
  expect(alerta.textContent).toBe(msg);
  expect(passo()).toContain("Identificação");
});

test("rascunho sobrevive a recarregar",
  async () => {
    const tela =
      render(<AssistenteAdmissao />);
    await userEvent.type(
      screen.getByLabelText("Nome"), "Rosa");
    tela.unmount();
    render(<AssistenteAdmissao />);
    expect(valor("Nome")).toBe("Rosa");
  });

test("voltar durante o envio não sai da "
  + "confirmação", async () => {
  const s = servidorLento();
  render(<AssistenteAdmissao />);
  await ateConfirmacao();
  await admitir();
  await userEvent.click(botao("Voltar"));
  expect(passo()).toContain("Confirmação");
  s.ok();
});

test("nova admissão começa limpa",
  async () => {
    vi.stubGlobal("fetch", vi.fn(async () =>
      Response.json({ id: "p101" },
        { status: 201 })));
    render(<AssistenteAdmissao />);
    await ateConfirmacao();
    await admitir();
    await userEvent.click(
      await screen.findByRole("button",
        { name: "Nova admissão" }));
    expect(screen.queryByText(/admitido/))
      .toBeNull();
    expect(passo())
      .toContain("Identificação");
    expect(valor("Nome")).toBe("");
  });
