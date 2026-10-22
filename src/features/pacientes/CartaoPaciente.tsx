import css from "./CartaoPaciente.module.css";
import { SeloRisco } from "./SeloRisco.tsx";
import type { Paciente } from "./tipos.ts";

interface Props {
  paciente: Paciente;
  selecionado: boolean;
  onSelecionar: (id: string) => void;
  onPrioridade: (id: string) => void;
  onAlta: (id: string) => void;
}

export function CartaoPaciente({
  paciente, selecionado,
  onSelecionar, onPrioridade, onAlta,
}: Props) {
  const { id, nome, leito, risco } = paciente;
  const atual = selecionado || undefined;
  return (
    <li className={css.cartao}
      aria-current={atual}>
      <button className={css.nome}
        onClick={() => onSelecionar(id)}>
        {nome}
      </button>{" "}
      <span className={css.leito}>
        leito {leito}</span>
      <SeloRisco risco={risco} />
      {paciente.prioridade && (
        <span aria-label="prioridade">★</span>
      )}
      <input
        aria-label={`Anotação de ${nome}`}
        placeholder="anotação"
      />
      <button
        aria-pressed={paciente.prioridade}
        onClick={() => onPrioridade(id)}
      >
        Prioridade
      </button>
      <button onClick={() => onAlta(id)}>
        Alta
      </button>
    </li>
  );
}
