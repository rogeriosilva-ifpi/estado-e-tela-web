// Paciente como a API devolve.
export interface PacienteApi {
  id: string;
  nome: string;
  cns: string;
  nascimento: string;
  telefone?: string;
  responsavel?: string;
}
