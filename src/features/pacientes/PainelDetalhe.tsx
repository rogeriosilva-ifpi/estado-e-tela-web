import { SeloRisco } from "./SeloRisco.tsx";
import type { Paciente } from "./tipos.ts";

interface Props {
  paciente?: Paciente;
}

export function PainelDetalhe(
  { paciente }: Props,
) {
  if (!paciente) {
    return <p>Selecione um paciente.</p>;
  }
  return (
    <dl>
      <dt>Paciente</dt>
      <dd>{paciente.nome}</dd>
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
