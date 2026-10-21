import { Renderometro }
  from "../../lab/Renderometro.tsx";
import { CartaoPaciente }
  from "./CartaoPaciente.tsx";
import type { Paciente } from "./tipos.ts";

interface Props {
  pacientes: Paciente[];
  selecionadoId?: string;
  onSelecionar: (id: string) => void;
  onPrioridade: (id: string) => void;
  onAlta: (id: string) => void;
}

export function ListaPacientes({
  pacientes, selecionadoId, ...acoes
}: Props) {
  return (
    <ul>
      {pacientes.map((p) => (
        <Renderometro key={p.id} id={p.nome}>
          <CartaoPaciente
            paciente={p}
            selecionado={
              p.id === selecionadoId}
            {...acoes}
          />
        </Renderometro>
      ))}
    </ul>
  );
}
