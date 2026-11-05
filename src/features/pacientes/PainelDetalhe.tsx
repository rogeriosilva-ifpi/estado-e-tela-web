import { useExibirNome } from
  "../../compartilhado/exibicao/contextos.ts";
import { SeloRisco } from "./SeloRisco.tsx";
import type { Paciente } from "./tipos.ts";

interface Props {
  paciente?: Paciente;
}

export function PainelDetalhe(
  { paciente }: Props,
) {
  const exibir = useExibirNome();
  if (!paciente) {
    return <p>Selecione um paciente.</p>;
  }
  return (
    <dl>
      <dt>Paciente</dt>
      <dd>{exibir(paciente.nome)}</dd>
      <dt>Leito</dt>
      <dd>{paciente.leito}</dd>
      <dt>Risco</dt>
      <dd>
        <SeloRisco risco={paciente.risco} />
      </dd>
      <dt>Prioridade</dt>
      <dd>
        {paciente.prioridade ? "sim" : "não"}
      </dd>
    </dl>
  );
}
