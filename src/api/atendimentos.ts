import { pedir } from "./cliente.ts";

// O contrato de atendimentos e prescrições,
// do lado da tela. Referência: docs/API.md.
export interface Atendimento {
  id: string;
  pacienteId: string;
  profissionalId: string;
  status: "aberto" | "finalizado";
  // dado clínico: só vem para o autor
  motivo?: string;
}

export interface Prescricao {
  id: string;
  atendimentoId: string;
  profissionalId: string;
  medicamento: string;
  posologia: string;
}

export type NovaPrescricao = Pick<
  Prescricao, "medicamento" | "posologia">;

export const listarAtendimentos =
  (sinal?: AbortSignal) =>
    pedir<Atendimento[]>("/api/encounters",
      { sinal });

export const obterAtendimento = (
  id: string, sinal?: AbortSignal,
) => pedir<Atendimento>(
  `/api/encounters/${id}`, { sinal });

export function listarPrescricoes(
  id: string, sinal?: AbortSignal,
) {
  const q = new URLSearchParams(
    { encounterId: id });
  return pedir<Prescricao[]>(
    `/api/medication-requests?${q}`,
    { sinal });
}

export const prescrever = (
  id: string, p: NovaPrescricao,
) => pedir<Prescricao>(
  `/api/encounters/${id}/medication-requests`,
  { metodo: "POST", corpo: p });

export const finalizar = (id: string) =>
  pedir<Atendimento>(`/api/encounters/${id}`,
    { metodo: "PATCH",
      corpo: { status: "finalizado" } });
