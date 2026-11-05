import { useQuery }
  from "@tanstack/react-query";
import { consultaSessao }
  from "../api/sessao.ts";

// undefined: ainda perguntando ao servidor.
// null: ninguém entrou.
export function useSessao() {
  return useQuery(consultaSessao).data;
}

// Esconder um botão é cortesia com quem não
// pode usá-lo. Quem proíbe é a API (403).
export function usePode(permissao: string) {
  return useSessao()?.permissoes
    .includes(permissao) ?? false;
}
