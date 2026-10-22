import { useEffect, useState } from "react";
import { ErroHttp, pedir }
  from "../../api/cliente.ts";

export interface Achado {
  id: string;
  nome: string;
}
interface Busca {
  achados: Achado[];
  aviso?: string;
  falha?: unknown;
}

// Erro esperado vira aviso na tela.
const AVISO: Record<number, string> = {
  401: "Entre para buscar no prontuário.",
  403: "Seu papel não pode buscar.",
};
const VAZIA: Busca = { achados: [] };

export function useBuscaPacientes(
  termo: string,
) {
  const [busca, setBusca] =
    useState<Busca>(VAZIA);

  useEffect(() => {
    if (!termo) return;
    const ctrl = new AbortController();
    const url = "/api/patients?q="
      + encodeURIComponent(termo)
      + location.search.replace("?", "&");
    const sinal = ctrl.signal;
    pedir<Achado[]>(url, { sinal })
      .then((achados) =>
        setBusca({ achados }))
      .catch((e: unknown) => {
        if (sinal.aborted) return;
        const aviso = e instanceof ErroHttp
          ? AVISO[e.status] : undefined;
        setBusca(aviso
          ? { achados: [], aviso }
          : { achados: [], falha: e });
      });
    return () => ctrl.abort();
  }, [termo]);

  if (!termo) return VAZIA;
  // Inesperado sobe para o LimiteDeErro.
  if (busca.falha) throw busca.falha;
  return busca;
}
