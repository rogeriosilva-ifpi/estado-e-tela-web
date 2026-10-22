import { useState } from "react";
import { Painel }
  from "../../compartilhado/Painel.tsx";
import { BarraBusca } from
  "../../compartilhado/BarraBusca.tsx";
import { ConfirmaAlta }
  from "./ConfirmaAlta.tsx";
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
  const [aConfirmar, setAConfirmar] =
    useState<string>();

  const t = busca.toLowerCase();
  const visiveis = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(t));
  const selecionado = pacientes
    .find((p) => p.id === selecionadoId);
  const saindo = pacientes
    .find((p) => p.id === aConfirmar);

  function darAlta(id: string) {
    setPacientes(
      pacientes.filter((p) => p.id !== id));
    setAConfirmar(undefined);
  }

  function alternarPrioridade(id: string) {
    setPacientes(pacientes.map((p) =>
      p.id === id
        ? { ...p, prioridade: !p.prioridade }
        : p));
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
            onAlta={setAConfirmar}
          />
        )}
      </Painel>
      <Painel titulo="Detalhe">
        <PainelDetalhe
          paciente={selecionado} />
      </Painel>
      {saindo && (
        <ConfirmaAlta
          nome={saindo.nome}
          onConfirmar={() => darAlta(saindo.id)}
          onCancelar={() =>
            setAConfirmar(undefined)}
        />
      )}
    </>
  );
}
