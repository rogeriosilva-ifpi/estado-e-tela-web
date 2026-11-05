import { useState } from "react";
import { Aviso }
  from "../../compartilhado/Aviso.tsx";
import { BarraBusca }
  from "../../compartilhado/BarraBusca.tsx";
import { useExibirNome } from
  "../../compartilhado/exibicao/contextos.ts";
import { useBuscaPacientes }
  from "./useBuscaPacientes.ts";

// Busca pacientes de todo o hospital, no
// servidor, a cada tecla.
export function BuscaProntuario() {
  const [termo, setTermo] = useState("");
  const exibir = useExibirNome();
  const { achados, aviso } =
    useBuscaPacientes(termo);
  const total = achados.length; // derivado

  return (
    <>
      <BarraBusca
        rotulo="Buscar no prontuário"
        dica="nome do paciente"
        valor={termo}
        onMudar={setTermo}
      />
      {aviso ? (
        <Aviso tom="info">{aviso}</Aviso>
      ) : (
        <p>{total} encontrado(s) para
          “{termo}”</p>
      )}
      <ul aria-label="Resultados">
        {achados.map((a) => (
          <li key={a.id}>{exibir(a.nome)}</li>
        ))}
      </ul>
    </>
  );
}
