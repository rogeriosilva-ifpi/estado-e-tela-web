import { useEffect, useState } from "react";

export interface Achado {
  id: string;
  nome: string;
}

// Mantém os achados em sincronia com o termo.
// A limpeza cancela o pedido do termo velho:
// a resposta dele nunca chega à tela.
export function useBuscaPacientes(
  termo: string,
) {
  const [achados, setAchados] =
    useState<Achado[]>([]);

  useEffect(() => {
    if (!termo) return;
    const ctrl = new AbortController();
    const url = "/api/patients?q="
      + encodeURIComponent(termo)
      + location.search.replace("?", "&");
    fetch(url, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((dados) => setAchados(dados))
      .catch((e: Error) => {
        // cancelado de propósito: não é erro
        if (e.name !== "AbortError") throw e;
      });
    return () => ctrl.abort();
  }, [termo]);

  return termo ? achados : [];
}
