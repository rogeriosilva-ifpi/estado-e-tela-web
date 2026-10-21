import { useState } from "react";
import { useBuscaPacientes }
  from "./useBuscaPacientes.ts";

// Busca pacientes de todo o hospital, no
// servidor, a cada tecla.
export function BuscaProntuario() {
  const [termo, setTermo] = useState("");
  const achados = useBuscaPacientes(termo);
  const total = achados.length; // derivado

  return (
    <>
      <input
        aria-label="Buscar no prontuário"
        placeholder="nome do paciente"
        value={termo}
        onChange={(e) =>
          setTermo(e.target.value)}
      />
      <p>{total} encontrado(s) para
        “{termo}”</p>
      <ul aria-label="Resultados">
        {achados.map((a) => (
          <li key={a.id}>{a.nome}</li>
        ))}
      </ul>
    </>
  );
}
