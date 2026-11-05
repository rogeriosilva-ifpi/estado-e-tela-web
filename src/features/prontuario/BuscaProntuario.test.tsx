import {
  act, cleanup, render, screen, within,
} from "@testing-library/react";
import userEvent
  from "@testing-library/user-event";
import {
  afterEach, expect, test, vi,
} from "vitest";
import { BuscaProntuario }
  from "./BuscaProntuario.tsx";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

type Pendente = {
  url: string; responder: () => void;
};

// fetch falso: cada pedido espera a vez,
// e o teste decide a ordem das respostas.
function redeControlada(
  dados: Record<string, string[]>,
) {
  const fila: Pendente[] = [];
  const f = vi.fn((url: string,
    o?: RequestInit) =>
    new Promise<Response>((ok, falha) => {
      const q = new URL(url, "http://x")
        .searchParams.get("q") ?? "";
      o?.signal?.addEventListener("abort",
        () => falha(new DOMException(
          "abortado", "AbortError")));
      const corpo = (dados[q] ?? []).map(
        (nome, i) => ({ id: q + i, nome }));
      fila.push({ url, responder: () =>
        ok(Response.json(corpo)) });
    }));
  vi.stubGlobal("fetch", f);
  return fila;
}

const nomes = () => within(
  screen.getByRole("list",
    { name: "Resultados" }))
  .queryAllByRole("listitem")
  .map((li) => li.textContent);

test("resposta velha não sobrescreve a nova",
  async () => {
    const fila = redeControlada({
      ma: ["Maria Souza", "João Lima"],
      mar: ["Maria Souza"],
    });
    render(
      <BuscaProntuario discreto={false} />);
    const campo = screen.getByLabelText(
      "Buscar no prontuário");
    await userEvent.type(campo, "ma");
    await userEvent.type(campo, "r");
    // "mar" responde primeiro; "ma", depois
    const porTermo = (t: string) => fila.find(
      (p) => p.url.includes(`q=${t}&`)
        || p.url.endsWith(`q=${t}`))!;
    await act(async () =>
      porTermo("mar").responder());
    await act(async () =>
      porTermo("ma").responder());

    expect(nomes())
      .toEqual(["Maria Souza"]);
    expect(screen.getByText(/1 encontrado/))
      .toBeTruthy();
  });

test("sem login, avisa em vez de quebrar",
  async () => {
    vi.stubGlobal("fetch", vi.fn(async () =>
      Response.json(
        { error: "Não autenticado." },
        { status: 401 })));
    render(
      <BuscaProntuario discreto={false} />);
    const campo = screen.getByLabelText(
      "Buscar no prontuário");
    await userEvent.type(campo, "ma");
    expect(await screen.findByText(
      "Entre para buscar no prontuário."))
      .toBeTruthy();
  });
