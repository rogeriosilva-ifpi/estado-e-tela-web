import {
  queryOptions, useMutation, useQueryClient,
} from "@tanstack/react-query";
import {
  finalizar, listarAtendimentos,
  listarPrescricoes, type NovaPrescricao,
  obterAtendimento, prescrever,
} from "../../api/atendimentos.ts";

export const chaves = {
  todos: ["atendimentos"] as const,
  um: (id: string) =>
    ["atendimentos", id] as const,
  prescricoes: (id: string) =>
    ["prescricoes", id] as const,
};

export const consultaAtendimentos =
  queryOptions({
    queryKey: chaves.todos,
    queryFn: ({ signal }) =>
      listarAtendimentos(signal),
  });

export const consultaAtendimento =
  (id: string) => queryOptions({
    queryKey: chaves.um(id),
    queryFn: ({ signal }) =>
      obterAtendimento(id, signal),
  });

export const consultaPrescricoes =
  (id: string) => queryOptions({
    queryKey: chaves.prescricoes(id),
    queryFn: ({ signal }) =>
      listarPrescricoes(id, signal),
  });

// Sem otimismo aqui: prescrição é dado
// clínico, só aparece depois do 201.
export function usePrescrever(id: string) {
  const cliente = useQueryClient();
  return useMutation({
    mutationFn: (p: NovaPrescricao) =>
      prescrever(id, p),
    onSuccess: () =>
      cliente.invalidateQueries({
        queryKey: chaves.prescricoes(id) }),
  });
}

export function useFinalizar(id: string) {
  const cliente = useQueryClient();
  return useMutation({
    mutationFn: () => finalizar(id),
    onSettled: () =>
      cliente.invalidateQueries(
        { queryKey: chaves.todos }),
  });
}
