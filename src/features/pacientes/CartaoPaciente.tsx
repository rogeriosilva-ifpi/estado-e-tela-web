import type { Paciente } from "./tipos.ts";

interface Props {
  paciente: Paciente;
  onAlta: (id: string) => void;
}

export function CartaoPaciente(
  { paciente, onAlta }: Props,
) {
  const { id, nome, leito } = paciente;
  return (
    <li>
      <b>{nome}</b> {leito}
      <input
        aria-label={`Anotação de ${nome}`}
        placeholder="anotação"
      />
      <button onClick={() => onAlta(id)}>
        Alta
      </button>
    </li>
  );
}
