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
