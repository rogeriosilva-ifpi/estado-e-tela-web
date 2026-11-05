import { pedir } from "./cliente.ts";

// O contrato da API de pacientes, do lado
// da tela. Referência: docs/API.md.
export interface Paciente {
  id: string;
  nome: string;
  cns: string;
  nascimento: string;
  telefone?: string;
  responsavel?: string;
  ativo?: boolean;
}
export interface Pagina<T> {
  itens: T[];
  total: number;
  pagina: number;
  porPagina: number;
}
export type Edicao = Partial<Pick<Paciente,
  "nome" | "telefone" | "responsavel">>;

export const POR_PAGINA = 5;

export function buscarPacientes(
  q: string, pagina: number,
  sinal?: AbortSignal,
) {
  // nomes em inglês, como as rotas da API
  const p = new URLSearchParams({ q,
    page: String(pagina),
    perPage: String(POR_PAGINA) });
  // ?atraso= do laboratório, se houver
  const atraso = new URLSearchParams(
    location.search).get("atraso");
  if (atraso) p.set("atraso", atraso);
  return pedir<Pagina<Paciente>>(
    `/api/patients?${p}`, { sinal });
}

export function obterPaciente(
  id: string, sinal?: AbortSignal,
) {
  return pedir<Paciente>(
    `/api/patients/${id}`, { sinal });
}

export function editarPaciente(
  id: string, dados: Edicao,
) {
  return pedir<Paciente>(
    `/api/patients/${id}`,
    { metodo: "PATCH", corpo: dados });
}

export function inativarPaciente(id: string) {
  return pedir<Paciente>(
    `/api/patients/${id}/inativar`,
    { metodo: "POST" });
}
