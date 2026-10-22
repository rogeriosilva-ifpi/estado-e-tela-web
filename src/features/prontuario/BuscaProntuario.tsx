import { useState } from "react";
import { BarraBusca }
  from "../pacientes/BarraBusca.tsx";
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
      <BarraBusca
        rotulo="Buscar no prontuário"
        dica="nome do paciente"
        valor={termo}
        onMudar={setTermo}
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
