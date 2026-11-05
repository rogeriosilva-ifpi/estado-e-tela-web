import { useQuery, useSuspenseQuery }
  from "@tanstack/react-query";
import { useParams } from "react-router";
import { consultaPaciente }
  from "../../api/pacientes.ts";
import { useExibirNome } from
  "../../compartilhado/exibicao/contextos.ts";
import {
  consultaAtendimento, consultaPrescricoes,
} from "./consultas.ts";
import { FichaAtendimento }
  from "./FichaAtendimento.tsx";

export function FichaDaRota() {
  const { id = "" } = useParams();
  const { data: a } = useSuspenseQuery(
    consultaAtendimento(id));
  const { data: prescricoes } =
    useSuspenseQuery(consultaPrescricoes(id));
  const paciente = useQuery(
    consultaPaciente(a.pacienteId)).data;
  const exibir = useExibirNome();
  return (
    <FichaAtendimento atendimento={a}
      paciente={paciente
        ? exibir(paciente.nome)
        : `Paciente ${a.pacienteId}`}
      prescricoes={prescricoes} />
  );
}
