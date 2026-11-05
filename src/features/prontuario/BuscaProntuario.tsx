import { useState } from "react";
import { Aviso }
  from "../../compartilhado/Aviso.tsx";
import { BarraBusca }
  from "../../compartilhado/BarraBusca.tsx";
import { iniciais }
  from "../../compartilhado/nome.ts";
import { useBuscaPacientes }
  from "./useBuscaPacientes.ts";

// Busca pacientes de todo o hospital, no
// servidor, a cada tecla.
export function BuscaProntuario(
  { discreto }: { discreto: boolean },
) {
  const [termo, setTermo] = useState("");
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
          <li key={a.id}>
            {discreto
              ? iniciais(a.nome) : a.nome}
          </li>
        ))}
      </ul>
    </>
  );
}
