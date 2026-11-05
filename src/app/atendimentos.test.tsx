import {
  cleanup, screen, within,
} from "@testing-library/react";
import userEvent
  from "@testing-library/user-event";
import {
  afterEach, beforeEach, expect, test,
} from "vitest";
import { apiFalsa, CARLA, SEMENTE }
  from "../teste/api.ts";
import { abrir } from "../teste/rota.tsx";

// Critérios A1 a A6 de docs/PLANO-cap19.md.
// Por padrão, a Dra. Ana (u2) entrou; ela é
// a autora do atendimento e1.
beforeEach(() => apiFalsa(SEMENTE));
afterEach(cleanup);

const ficha = () => screen.findByRole(
  "article", { name: "Atendimento" });

test("A1: o painel lista e leva à ficha",
  async () => {
    abrir("/atendimentos");
    const lista = await screen.findByRole(
      "list", { name: "Atendimentos" });
    await userEvent.click(await within(lista)
      .findByRole("link",
        { name: "Maria Souza" }));
    expect(within(await ficha())
      .getByText("Dor torácica"))
      .toBeTruthy();
  });

test("A2: quem não é autor vê sem o motivo",
  async () => {
    apiFalsa(SEMENTE, { usuario: CARLA });
    abrir("/atendimentos/e1");
    const f = await ficha();
    expect(within(f).getByText(
      /Motivo visível só para o/))
      .toBeTruthy();
  });

test("A3: recepção não vê Prescrever",
  async () => {
    apiFalsa(SEMENTE, { usuario: CARLA });
    abrir("/atendimentos/e1");
    await ficha();
    expect(screen.queryByRole("form",
      { name: "Nova prescrição" }))
      .toBeNull();
  });

test("A4: a prescrição aparece na ficha",
  async () => {
    abrir("/atendimentos/e1");
    const form = await screen.findByRole(
      "form", { name: "Nova prescrição" });
    await userEvent.type(within(form)
      .getByLabelText("Medicamento"),
      "AAS 100 mg");
    await userEvent.type(within(form)
      .getByLabelText("Posologia"),
      "1x ao dia");
    await userEvent.click(within(form)
      .getByRole("button",
        { name: "Prescrever" }));
    const lista = await screen.findByRole(
      "list", { name: "Prescrições" });
    expect(within(lista).getByText(
      /AAS 100 mg/)).toBeTruthy();
  });

test("A5: 403 da API vira aviso no lugar",
  async () => {
    const rx =
      "POST /api/encounters/e1/medication-"
      + "requests";
    apiFalsa(SEMENTE,
      { recusar: { [rx]: 403 } });
    const router = abrir("/atendimentos/e1");
    const form = await screen.findByRole(
      "form", { name: "Nova prescrição" });
    await userEvent.type(within(form)
      .getByLabelText("Medicamento"), "AAS");
    await userEvent.type(within(form)
      .getByLabelText("Posologia"), "1x");
    await userEvent.click(within(form)
      .getByRole("button",
        { name: "Prescrever" }));
    expect(await screen.findByText(
      /A API recusou a prescrição/))
      .toBeTruthy();
    expect(router.state.location.pathname)
      .toBe("/atendimentos/e1");
  });

test("A6: finalizar fecha a prescrição",
  async () => {
    abrir("/atendimentos/e1");
    await userEvent.click(await screen
      .findByRole("button",
        { name: "Finalizar atendimento" }));
    await userEvent.click(screen.getByRole(
      "button", { name: "Confirmar" }));
    expect(await within(await ficha())
      .findByText("Finalizado")).toBeTruthy();
    expect(screen.queryByRole("form",
      { name: "Nova prescrição" }))
      .toBeNull();
  });
