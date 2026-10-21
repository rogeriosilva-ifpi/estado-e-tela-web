import { useState } from "react";
import { Renderometro }
  from "../../lab/Renderometro.tsx";
import { ALA_B } from "./dados.ts";
import type { Paciente } from "./tipos.ts";

// A tela cresceu aqui dentro: resumo por
// risco, busca, lista, selo e estado vazio.
export function Ala() {
  const [busca, setBusca] = useState("");
  const [pacientes, setPacientes] =
    useState(ALA_B);

  const t = busca.toLowerCase();
  const visiveis = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(t));
  const conta = (r: string) => pacientes
    .filter((p) => p.risco === r).length;

  function darAlta(id: string) {
    setPacientes(
      pacientes.filter((p) => p.id !== id));
  }

  function Linha({ p }: { p: Paciente }) {
    return (
      <li>
        <b>{p.nome}</b> {p.leito}
        <span data-risco={p.risco}>
          {p.risco}
        </span>
        <input
          aria-label={`Anotação de ${p.nome}`}
          placeholder="anotação"
        />
        <button onClick={() => darAlta(p.id)}>
          Alta
        </button>
      </li>
    );
  }

  return (
    <section>
      <h2>Resumo</h2>
      <p>
        {pacientes.length} pacientes
        · alto risco: {conta("alto")}
        · médio: {conta("médio")}
        · baixo: {conta("baixo")}
      </p>
      <h2>Pacientes</h2>
      <input
        aria-label="Buscar paciente"
        placeholder="buscar"
        value={busca}
        onChange={(e) =>
          setBusca(e.target.value)}
      />
      {visiveis.length === 0 ? (
        <p>Nenhum paciente encontrado.</p>
      ) : (
        <ul>
          {visiveis.map((p) => (
            <Renderometro
              key={p.id} id={p.nome}>
              <Linha p={p} />
            </Renderometro>
          ))}
        </ul>
      )}
    </section>
  );
}
