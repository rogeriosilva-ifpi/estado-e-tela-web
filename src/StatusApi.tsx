import { useState } from "react";

type Status = "ocioso" | "ok" | "fora do ar";

// O verificador do capítulo 2, agora num
// componente próprio.
export function StatusApi() {
  const [status, setStatus] =
    useState<Status>("ocioso");

  async function verificar() {
    try {
      const r = await fetch("/health");
      setStatus(r.ok ? "ok" : "fora do ar");
    } catch {
      setStatus("fora do ar");
    }
  }

  return (
    <p>
      API: <strong>{status}</strong>{" "}
      <button onClick={verificar}>
        Verificar API
      </button>
    </p>
  );
}
