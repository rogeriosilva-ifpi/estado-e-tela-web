import { Renderometro }
  from "../../lab/Renderometro.tsx";
import { CartaoPaciente }
  from "./CartaoPaciente.tsx";
import css from "./ListaPacientes.module.css";
import type { Paciente } from "./tipos.ts";

interface Props {
  pacientes: Paciente[];
  discreto: boolean;
  selecionadoId?: string;
  onSelecionar: (id: string) => void;
  onPrioridade: (id: string) => void;
  onAlta: (id: string) => void;
}

export function ListaPacientes({
  pacientes, selecionadoId, discreto,
  ...acoes
}: Props) {
  return (
    <ul className={css.lista}>
      {pacientes.map((p) => (
        <Renderometro key={p.id} id={p.nome}>
          <CartaoPaciente
            paciente={p}
            discreto={discreto}
            selecionado={
              p.id === selecionadoId}
            {...acoes}
          />
        </Renderometro>
      ))}
    </ul>
  );
}
