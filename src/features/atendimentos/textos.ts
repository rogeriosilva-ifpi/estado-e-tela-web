import type { Atendimento }
  from "../../api/atendimentos.ts";

export const STATUS: Record<
  Atendimento["status"], string> = {
  aberto: "Aberto",
  finalizado: "Finalizado",
};
