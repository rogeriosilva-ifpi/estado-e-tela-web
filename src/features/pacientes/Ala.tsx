import { useState } from "react";
import { Painel }
  from "../../compartilhado/Painel.tsx";
import { BarraBusca } from "./BarraBusca.tsx";
import { ALA_B } from "./dados.ts";
import { ListaPacientes }
  from "./ListaPacientes.tsx";
import { ResumoAla } from "./ResumoAla.tsx";

// Coordena: guarda o estado, calcula o que
// é derivado e compõe a tela com as peças.
export function Ala() {
  const [busca, setBusca] = useState("");
  const [pacientes, setPacientes] =
    useState(ALA_B);

  const t = busca.toLowerCase();
  const visiveis = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(t));

  function darAlta(id: string) {
    setPacientes(
      pacientes.filter((p) => p.id !== id));
  }

  return (
    <>
      <Painel titulo="Resumo">
        <ResumoAla pacientes={pacientes} />
      </Painel>
      <Painel titulo="Pacientes">
        <BarraBusca
          valor={busca}
          onMudar={setBusca}
        />
        {visiveis.length === 0 ? (
          <p>Nenhum paciente encontrado.</p>
        ) : (
          <ListaPacientes
            pacientes={visiveis}
            onAlta={darAlta}
          />
        )}
      </Painel>
    </>
  );
}
