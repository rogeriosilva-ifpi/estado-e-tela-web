export type Risco =
  "baixo" | "médio" | "alto";

export interface Paciente {
  id: string;
  nome: string;
  leito: string;
  risco: Risco;
  prioridade: boolean;
}
