import type { ReactNode } from "react";
import { Link } from "react-router";
import type { Atendimento, Prescricao }
  from "../../api/atendimentos.ts";
import { STATUS } from "./textos.ts";

interface Props {
  atendimento: Atendimento;
  paciente: string;
  prescricoes: Prescricao[];
  // ações que a rota decide mostrar
  children?: ReactNode;
}

export function FichaAtendimento({
  atendimento: a, paciente, prescricoes,
  children,
}: Props) {
  return (
    <article aria-label="Atendimento">
      <h3>
        <Link
          to={`/pacientes/${a.pacienteId}`}>
          {paciente}</Link>
      </h3>
      <dl>
        <dt>Status</dt>
        <dd>{STATUS[a.status]}</dd>
        <dt>Motivo</dt>
        <dd>{a.motivo}</dd>
      </dl>
      <h4>Prescrições</h4>
      {prescricoes.length === 0
        ? <p>Nenhuma prescrição.</p>
        : (
          <ul aria-label="Prescrições">
            {prescricoes.map((m) => (
              <li key={m.id}>{m.medicamento}
                {" · "}{m.posologia}</li>
            ))}
          </ul>
        )}
      {children}
    </article>
  );
}
