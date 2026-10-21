import type {
  Paciente, Risco,
} from "./tipos.ts";

export function ResumoAla(
  { pacientes }: { pacientes: Paciente[] },
) {
  const conta = (r: Risco) => pacientes
    .filter((p) => p.risco === r).length;

  return (
    <p>
      {pacientes.length} pacientes
      · alto risco: {conta("alto")}
      · médio: {conta("médio")}
      · baixo: {conta("baixo")}
    </p>
  );
}
