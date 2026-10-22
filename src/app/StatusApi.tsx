import { useState } from "react";
import { pedir } from "../api/cliente.ts";

type Status = "ocioso" | "ok" | "fora do ar";

// O verificador do capítulo 2, agora pela
// porta única da rede.
export function StatusApi() {
  const [status, setStatus] =
    useState<Status>("ocioso");

  async function verificar() {
    try {
      await pedir("/health");
      setStatus("ok");
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
