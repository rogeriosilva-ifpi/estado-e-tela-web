import css from "./SeloRisco.module.css";
import type { Risco } from "./tipos.ts";

export function SeloRisco(
  { risco }: { risco: Risco },
) {
  return (
    <span className={css.selo}
      data-risco={risco}>
      {risco}
    </span>
  );
}
