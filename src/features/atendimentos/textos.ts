import type { Atendimento }
  from "../../api/atendimentos.ts";

export const STATUS: Record<
  Atendimento["status"], string> = {
  aberto: "Aberto",
  finalizado: "Finalizado",
};

// Sem motivo na resposta: a pessoa não é a
// autora (a API só manda dado clínico ao
// autor). A tela diz isso, não um vazio.
export const motivo = (a: Atendimento) =>
  a.motivo ?? "Motivo visível só para o "
    + "profissional responsável.";
