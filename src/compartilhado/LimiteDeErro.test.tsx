import {
  cleanup, render, screen,
} from "@testing-library/react";
import userEvent
  from "@testing-library/user-event";
import { afterEach, expect, test, vi }
  from "vitest";
import { Painel } from "./Painel.tsx";

afterEach(cleanup);

let quebrar = true;
function Instavel() {
  if (quebrar) throw new Error("dado torto");
  return <p>Pronto.</p>;
}

test("painel quebrado não derruba vizinho",
  async () => {
    // o React registra o erro capturado
    vi.spyOn(console, "error")
      .mockImplementation(() => {});
    render(
      <>
        <Painel titulo="Busca">
          <Instavel />
        </Painel>
        <Painel titulo="Admissão">
          <p>Formulário</p>
        </Painel>
      </>,
    );
    expect(screen.getByRole("alert")
      .textContent).toContain("Busca");
    expect(screen.getByText("Formulário"))
      .toBeTruthy();

    quebrar = false;
    await userEvent.click(screen.getByRole(
      "button", { name: "Tentar de novo" }));
    expect(screen.getByText("Pronto."))
      .toBeTruthy();
  });
