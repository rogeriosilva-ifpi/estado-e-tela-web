import { Link } from "react-router";
import type { Atendimento }
  from "../../api/atendimentos.ts";
import { STATUS } from "./textos.ts";

interface Props {
  itens: Atendimento[];
  nomeDe: (pacienteId: string) => string;
}

// Apresentação pura: recebe a lista pronta.
export function ListaAtendimentos(
  { itens, nomeDe }: Props,
) {
  if (itens.length === 0) {
    return <p>Nenhum atendimento.</p>;
  }
  return (
    <ul aria-label="Atendimentos">
      {itens.map((a) => (
        <li key={a.id}>
          <Link to={`/atendimentos/${a.id}`}>
            {nomeDe(a.pacienteId)}</Link>
          {" · "}{STATUS[a.status]}
        </li>
      ))}
    </ul>
  );
}
