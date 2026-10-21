import { useState } from "react";
import { Renderometro }
  from "../../lab/Renderometro.tsx";
import { ALA_B } from "./dados.ts";
import { ListaPacientes }
  from "./ListaPacientes.tsx";

export function Ala() {
  const [busca, setBusca] = useState("");
  const [pacientes, setPacientes] =
    useState(ALA_B);

  // derivados: calculados a cada render
  const t = busca.toLowerCase();
  const visiveis = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(t));
  const alto = pacientes
    .filter((p) => p.risco === "alto").length;

  function darAlta(id: string) {
    setPacientes(
      pacientes.filter((p) => p.id !== id));
  }

  return (
    <section>
      <input
        aria-label="Buscar paciente"
        placeholder="buscar"
        value={busca}
        onChange={(e) =>
          setBusca(e.target.value)}
      />
      <p>
        {pacientes.length} pacientes
        · alto risco: {alto}
      </p>
      <Renderometro id="Lista">
        <ListaPacientes
          pacientes={visiveis}
          onAlta={darAlta}
        />
      </Renderometro>
    </section>
  );
}
