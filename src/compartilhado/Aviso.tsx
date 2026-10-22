import type { ReactNode } from "react";
import css from "./Aviso.module.css";

interface Props {
  tom: "info" | "erro";
  children: ReactNode;
}

// erro: role="alert", o leitor de tela
// interrompe e lê. info: role="status",
// lido quando o leitor fica livre.
export function Aviso(
  { tom, children }: Props,
) {
  const papel = tom === "erro"
    ? "alert" : "status";
  return (
    <p className={css.aviso} data-tom={tom}
      role={papel}>
      {children}
    </p>
  );
}
