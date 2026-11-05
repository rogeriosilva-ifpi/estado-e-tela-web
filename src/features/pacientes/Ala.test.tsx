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

async function pedirAlta(nome: string) {
  const li = nota(nome).closest("li")!;
  await userEvent.click(
    within(li).getByRole("button",
      { name: "Alta" }));
}
async function darAlta(nome: string) {
  await pedirAlta(nome);
  await userEvent.click(screen.getByRole(
    "button", { name: "Confirmar alta" }));
}

test("anotação acompanha o paciente",
  async () => {
    render(<Ala discreto={false} />);
    await userEvent.type(
      nota("João Lima"), "ver febre");
    await darAlta("Maria Souza");
    expect(nota("João Lima").value)
      .toBe("ver febre");
  });

test("alto risco cai na alta", async () => {
  render(<Ala discreto={false} />);
  await darAlta("Maria Souza");
  expect(screen.getByText(/alto risco: 1/))
    .toBeTruthy();
});

test("anotação sobrevive à busca",
  async () => {
    render(<Ala discreto={false} />);
    await userEvent.type(
      nota("João Lima"), "ver febre");
    await buscar("o");
    expect(nota("João Lima").value)
      .toBe("ver febre");
  });

test("busca vazia avisa", async () => {
  render(<Ala discreto={false} />);
  await buscar("xyz");
  expect(screen.getByText(
    "Nenhum paciente encontrado.",
  )).toBeTruthy();
});

const detalhe = () => within(
  screen.getByRole("heading",
    { name: "Detalhe" }).parentElement!);
const cartao = (nome: string) =>
  within(nota(nome).closest("li")!);

test("selecionar mostra o detalhe",
  async () => {
    render(<Ala discreto={false} />);
    const joao = cartao("João Lima");
    await userEvent.click(joao.getByRole(
      "button", { name: "João Lima" }));
    expect(detalhe().getByText("102"))
      .toBeTruthy();
  });

test("prioridade no cartão e no detalhe",
  async () => {
    render(<Ala discreto={false} />);
    const joao = cartao("João Lima");
    await userEvent.click(joao.getByRole(
      "button", { name: "João Lima" }));
    await userEvent.click(joao.getByRole(
      "button", { name: "Prioridade" }));
    expect(joao.getByLabelText("prioridade"))
      .toBeTruthy();
    expect(detalhe().getByText("sim"))
      .toBeTruthy();
  });

test("alta pede confirmação num diálogo",
  async () => {
    render(<Ala discreto={false} />);
    await pedirAlta("Maria Souza");
    const dialogo = screen.getByRole("dialog",
      { name: "Dar alta a Maria Souza?" });
    await userEvent.click(within(dialogo)
      .getByRole("button",
        { name: "Cancelar" }));
    expect(nota("Maria Souza")).toBeTruthy();
  });
