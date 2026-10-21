import { Profiler } from "react";
import type { ReactNode } from "react";
import { registros } from "./registros.ts";

interface Props {
  id: string;
  children: ReactNode;
}

// Usa o <Profiler> do React: a cada commit em
// que algo desta subárvore renderizou, anota
// quem foi, em que fase e quanto tempo levou.
export function Renderometro(
  { id, children }: Props,
) {
  return (
    <Profiler
      id={id}
      onRender={(quem, fase, ms) => {
        const linha = `${quem} · ${fase}`
          + ` · ${ms.toFixed(2)} ms`;
        registros.push(linha);
        console.log(`[render] ${linha}`);
      }}
    >
      {children}
    </Profiler>
  );
}
