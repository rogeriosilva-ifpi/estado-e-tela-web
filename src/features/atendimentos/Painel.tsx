import { useQueries, useSuspenseQuery }
  from "@tanstack/react-query";
import { consultaPaciente }
  from "../../api/pacientes.ts";
import { useExibirNome } from
  "../../compartilhado/exibicao/contextos.ts";
import { consultaAtendimentos }
  from "./consultas.ts";
import { ListaAtendimentos }
  from "./ListaAtendimentos.tsx";

export function PainelAtendimentos() {
  const { data: itens } = useSuspenseQuery(
    consultaAtendimentos);
  const exibir = useExibirNome();
  // um pedido por paciente, no cache que o
  // prontuário também usa
  const ids = [...new Set(
    itens.map((a) => a.pacienteId))];
  const pacientes = useQueries({ queries:
    ids.map((id) => consultaPaciente(id)) });
  const nomes = new Map(ids.map((id, i) =>
    [id, pacientes[i]?.data?.nome]));
  return (
    <ListaAtendimentos itens={itens}
      nomeDe={(id) => {
        const nome = nomes.get(id);
        return nome ? exibir(nome)
          : `Paciente ${id}`;
      }} />
  );
}
