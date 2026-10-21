import type { ReactNode } from "react";

interface Props {
  titulo: string;
  children: ReactNode;
}

// Moldura com título. Não sabe o que mostra:
// quem a usa decide, pelos children.
export function Painel(
  { titulo, children }: Props,
) {
  return (
    <section className="painel">
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}
