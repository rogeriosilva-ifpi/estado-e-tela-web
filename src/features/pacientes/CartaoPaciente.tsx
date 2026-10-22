import css from "./CartaoPaciente.module.css";
import { Botao }
  from "../../compartilhado/Botao.tsx";
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
      <Botao variante="texto"
        onClick={() => onSelecionar(id)}>
        {nome}
      </Botao>
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
      <Botao variante="secundaria"
        aria-pressed={paciente.prioridade}
        onClick={() => onPrioridade(id)}>
        Prioridade
      </Botao>
      <Botao variante="secundaria"
        onClick={() => onAlta(id)}>
        Alta
      </Botao>
    </li>
  );
}
