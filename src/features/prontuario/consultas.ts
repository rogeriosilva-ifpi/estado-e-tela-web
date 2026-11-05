import {
  keepPreviousData, queryOptions,
  useMutation, useQuery, useQueryClient,
} from "@tanstack/react-query";
import { ErroHttp }
  from "../../api/cliente.ts";
import {
  buscarPacientes, editarPaciente,
  type Edicao, inativarPaciente,
  obterPaciente,
} from "../../api/pacientes.ts";

// Chaves em árvore: invalidar ["pacientes"]
// alcança todas as buscas e os detalhes.
export const chaves = {
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
    queryKey: chaves.um(id),
    queryFn: ({ signal }) =>
      obterPaciente(id, signal),
  });

// Erro esperado vira aviso; o resto sobe ao
// LimiteDeErro do painel (UI-10). O 401 não
// chega aqui como aviso: leva ao login.
export const AVISO: Record<number, string> = {
  401: "Sua sessão terminou.",
  403: "Seu papel não pode buscar.",
};
const esperado = (e: Error) =>
  e instanceof ErroHttp && e.status in AVISO;
// 403: sem permissão. Avisa ali mesmo; não
// é caso de login (UI-21).
export const negado = (e: Error | null) =>
  e instanceof ErroHttp && e.status === 403;

export function useBusca(
  q: string, pagina: number,
) {
  return useQuery({
    queryKey: chaves.busca(q, pagina),
    queryFn: ({ signal }) =>
      buscarPacientes(q, pagina, signal),
    enabled: q !== "",
    // a página velha fica na tela até a
    // nova chegar, sem piscar vazio
    placeholderData: keepPreviousData,
    throwOnError: (e) => !esperado(e),
  });
}

export function useEditarPaciente(
  id: string,
) {
  const cliente = useQueryClient();
  const chave = chaves.um(id);
  return useMutation({
    mutationFn: (dados: Edicao) =>
      editarPaciente(id, dados),
    // Otimista: a tela muda antes da
    // resposta.
    onMutate: async (dados) => {
      await cliente.cancelQueries(
        { queryKey: chave });
      const antes =
        cliente.getQueryData(chave);
      cliente.setQueryData(chave,
        (p) => p && { ...p, ...dados });
      return { antes };
    },
    // Deu errado: volta ao que era.
    onError: (_e, _dados, ctx) =>
      cliente.setQueryData(chave, ctx?.antes),
    // Certo ou errado: o servidor tem a
    // palavra final, em todas as buscas.
    onSettled: () =>
      cliente.invalidateQueries(
        { queryKey: chaves.todos }),
  });
}

export function useInativarPaciente(
  id: string,
) {
  const cliente = useQueryClient();
  return useMutation({
    mutationFn: () => inativarPaciente(id),
    onSettled: () =>
      cliente.invalidateQueries(
        { queryKey: chaves.todos }),
  });
}
