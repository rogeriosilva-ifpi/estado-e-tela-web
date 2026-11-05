import { useEffect, useMemo, useState }
  from "react";
import type { ReactNode } from "react";
import {
  AcoesContext, DiscretoContext, TemaContext,
  type Tema,
} from "./contextos.ts";

// Guarda as preferências e as entrega por
// contexto. Recebe a tela pronta como
// children: quando uma preferência muda, só
// quem lê aquele contexto renderiza.
export function ProvedorExibicao(
  { children }: { children: ReactNode },
) {
  const [discreto, setDiscreto] =
    useState(false);
  const [tema, setTema] =
    useState<Tema>("sistema");

  // O tema mora fora do React, no <html>.
  useEffect(() => {
    const html = document.documentElement;
    html.style.colorScheme = tema === "claro"
      ? "light"
      : tema === "escuro" ? "dark" : "";
  }, [tema]);

  // Os setters do useState são estáveis; o
  // objeto que os junta precisa ser também.
  const acoes = useMemo(
    () => ({ setDiscreto, setTema }), []);

  return (
    <AcoesContext value={acoes}>
      <TemaContext value={tema}>
        <DiscretoContext value={discreto}>
          {children}
        </DiscretoContext>
      </TemaContext>
    </AcoesContext>
  );
}
