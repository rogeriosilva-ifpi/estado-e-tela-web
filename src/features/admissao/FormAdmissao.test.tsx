import {
  cleanup, render, screen,
} from "@testing-library/react";
import userEvent
  from "@testing-library/user-event";
import {
  afterEach, expect, test, vi,
} from "vitest";
import { FormAdmissao }
  from "./FormAdmissao.tsx";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

async function preencher() {
  const u = userEvent;
  await u.type(screen.getByLabelText("Nome"),
    "Rosa Amaral");
  await u.type(screen.getByLabelText("CNS"),
    "898001112223334");
  await u.type(
    screen.getByLabelText("Nascimento"),
    "1971-05-20");
}
const admitir = () => userEvent.click(
  screen.getByRole("button",
    { name: /Admitir|Enviando/ }));

test("valida antes de enviar", async () => {
  const f = vi.fn();
  vi.stubGlobal("fetch", f);
  render(<FormAdmissao />);
  await admitir();
  expect(screen.getByText(
    "CNS tem 15 dígitos.")).toBeTruthy();
  expect(f).not.toHaveBeenCalled();
});

test("não envia duas vezes", async () => {
  // servidor lento: só responde no fim
  let responder = (_r: Response) => {};
  const f = vi.fn(() => new Promise<Response>(
    (ok) => { responder = ok; }));
  vi.stubGlobal("fetch", f);
  render(<FormAdmissao />);
  await preencher();
  await admitir();
  await admitir();
  expect(f).toHaveBeenCalledTimes(1);
  responder(Response.json({ id: "p101" },
    { status: 201 }));
});

test("mostra o que o servidor recusou",
  async () => {
    const corpo = { error: "Dados inválidos.",
      campos: ["cns"] };
    vi.stubGlobal("fetch", vi.fn(async () =>
      Response.json(corpo, { status: 400 })));
    render(<FormAdmissao />);
    await preencher();
    await admitir();
    expect(await screen.findByText(
      "Recusado pelo servidor."),
    ).toBeTruthy();
    expect(
      (screen.getByLabelText("Nome") as
        HTMLInputElement).value,
    ).toBe("Rosa Amaral");
  });
