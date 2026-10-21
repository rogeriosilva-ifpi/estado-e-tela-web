import { useState } from "react";

type Status = "ocioso" | "ok" | "fora do ar";

export default function App() {
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
    <main>
      <h1>Mini-Prontuário</h1>
      <p>API: <strong>{status}</strong></p>
      <button onClick={verificar}>
        Verificar API
      </button>
    </main>
  );
}
