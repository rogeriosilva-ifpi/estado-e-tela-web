import { queryOptions }
  from "@tanstack/react-query";
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
  // os nomes que a API lê (docs/API.md); a
  // API ignora parâmetro que não conhece
  const p = new URLSearchParams({ q,
    pagina: String(pagina),
    porPagina: String(POR_PAGINA) });
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

// Chaves em árvore: invalidar ["pacientes"]
// alcança todas as buscas e os detalhes.
// Moram aqui porque mais de uma feature lê
// paciente (prontuário e atendimentos).
export const chavesPacientes = {
  todos: ["pacientes"] as const,
  busca: (q: string, p: number) =>
    ["pacientes", "busca", q, p] as const,
  um: (id: string) =>
    ["pacientes", "um", id] as const,
};

// A mesma receita serve ao loader da rota e
// ao componente: um pedido, um lugar no
// cache.
export const consultaPaciente =
  (id: string) => queryOptions({
    queryKey: chavesPacientes.um(id),
    queryFn: ({ signal }) =>
      obterPaciente(id, signal),
  });
