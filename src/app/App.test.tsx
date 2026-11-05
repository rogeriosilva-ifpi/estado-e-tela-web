import {
  cleanup, render, screen, within,
} from "@testing-library/react";
import userEvent
  from "@testing-library/user-event";
import { afterEach, expect, test }
  from "vitest";
import App from "./App.tsx";

afterEach(cleanup);

test("modo discreto não mostra nome inteiro",
  async () => {
    render(<App />);
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
