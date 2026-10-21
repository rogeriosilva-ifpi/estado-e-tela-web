import type { Risco } from "./tipos.ts";

export function SeloRisco(
  { risco }: { risco: Risco },
) {
  return (
    <span className="selo" data-risco={risco}>
      {risco}
    </span>
  );
}
