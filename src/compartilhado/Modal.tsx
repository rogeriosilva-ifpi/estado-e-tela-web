import { useEffect, useId, useRef }
  from "react";
import type { ReactNode } from "react";
import css from "./Modal.module.css";

interface Props {
  aberto: boolean;
  titulo: string;
  onFechar: () => void;
  children: ReactNode;
}

// <dialog> aberto com showModal(): o
// navegador põe o foco dentro, fecha no Esc,
// deixa o fundo inerte e, ao fechar, devolve
// o foco a quem abriu.
export function Modal({
  aberto, titulo, onFechar, children,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const idTitulo = useId();

  // Sincroniza o estado do React com a API
  // imperativa do <dialog>: efeito legítimo.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (aberto && !d.open) d.showModal();
    if (!aberto && d.open) d.close();
  }, [aberto]);

  return (
    <dialog ref={ref} className={css.modal}
      aria-labelledby={idTitulo}
      onClose={onFechar}>
      <h2 id={idTitulo}>{titulo}</h2>
      {children}
    </dialog>
  );
}
