import {
  cleanup, render, screen, within,
} from "@testing-library/react";
import userEvent
  from "@testing-library/user-event";
import {
  afterEach, expect, test,
} from "vitest";
import { Ala } from "./Ala.tsx";

afterEach(cleanup);

type Campo = HTMLInputElement;
const nota = (nome: string) =>
  screen.getByLabelText(
    `Anotação de ${nome}`) as Campo;
const buscar = (texto: string) =>
  userEvent.type(
    screen.getByLabelText("Buscar paciente"),
    texto);

async function darAlta(nome: string) {
  const li = nota(nome).closest("li")!;
  await userEvent.click(
    within(li).getByRole("button",
      { name: "Alta" }));
}

test("anotação acompanha o paciente",
  async () => {
    render(<Ala />);
    await userEvent.type(
      nota("João Lima"), "ver febre");
    await darAlta("Maria Souza");
    expect(nota("João Lima").value)
      .toBe("ver febre");
  });

test("alto risco cai na alta", async () => {
  render(<Ala />);
  await darAlta("Maria Souza");
  expect(screen.getByText(/alto risco: 1/))
    .toBeTruthy();
});

test("anotação sobrevive à busca",
  async () => {
    render(<Ala />);
    await userEvent.type(
      nota("João Lima"), "ver febre");
    await buscar("o");
    expect(nota("João Lima").value)
      .toBe("ver febre");
  });

test("busca vazia avisa", async () => {
  render(<Ala />);
  await buscar("xyz");
  expect(screen.getByText(
    "Nenhum paciente encontrado.",
  )).toBeTruthy();
});
