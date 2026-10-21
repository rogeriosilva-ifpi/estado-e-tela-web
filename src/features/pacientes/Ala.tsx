import { useState } from "react";
import { Painel }
  from "../../compartilhado/Painel.tsx";
import { BarraBusca } from "./BarraBusca.tsx";
import { ALA_B } from "./dados.ts";
import { ListaPacientes }
  from "./ListaPacientes.tsx";
import { PainelDetalhe }
  from "./PainelDetalhe.tsx";
import { ResumoAla } from "./ResumoAla.tsx";

// Coordena: guarda o estado, calcula o que
// é derivado e compõe a tela com as peças.
export function Ala() {
  const [busca, setBusca] = useState("");
  const [pacientes, setPacientes] =
    useState(ALA_B);
  const [selecionadoId, setSelecionadoId] =
    useState<string>();

  const t = busca.toLowerCase();
  const visiveis = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(t));
  const selecionado = pacientes
    .find((p) => p.id === selecionadoId);

  function darAlta(id: string) {
    setPacientes(
      pacientes.filter((p) => p.id !== id));
  }

  function alternarPrioridade(id: string) {
    const p = pacientes
      .find((x) => x.id === id)!;
    p.prioridade = !p.prioridade;
    setPacientes(pacientes);
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
            selecionadoId={selecionadoId}
            onSelecionar={setSelecionadoId}
            onPrioridade={alternarPrioridade}
            onAlta={darAlta}
          />
        )}
      </Painel>
      <Painel titulo="Detalhe">
        <PainelDetalhe
          paciente={selecionado} />
      </Painel>
    </>
  );
}
