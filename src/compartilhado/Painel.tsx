import type { ReactNode } from "react";
import { LimiteDeErro }
  from "./LimiteDeErro.tsx";
import css from "./Painel.module.css";

interface Props {
  titulo: string;
  children: ReactNode;
}

// Moldura com título. Não sabe o que mostra,
// mas contém a falha do que mostra: o título
// fica, e o resto da tela também.
export function Painel(
  { titulo, children }: Props,
) {
  return (
    <section className={css.painel}>
      <h2 className={css.titulo}>{titulo}</h2>
      <LimiteDeErro area={titulo}>
        {children}
      </LimiteDeErro>
    </section>
  );
}
