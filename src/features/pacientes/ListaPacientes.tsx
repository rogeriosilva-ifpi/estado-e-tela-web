import { Renderometro }
  from "../../lab/Renderometro.tsx";
import { CartaoPaciente }
  from "./CartaoPaciente.tsx";
import type { Paciente } from "./tipos.ts";

interface Props {
  pacientes: Paciente[];
  onAlta: (id: string) => void;
}

export function ListaPacientes(
  { pacientes, onAlta }: Props,
) {
  return (
    <ul>
      {pacientes.map((p) => (
        <Renderometro key={p.id} id={p.nome}>
          <CartaoPaciente
            paciente={p}
            onAlta={onAlta}
          />
        </Renderometro>
      ))}
    </ul>
  );
}
