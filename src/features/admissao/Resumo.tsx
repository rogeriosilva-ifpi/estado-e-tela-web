import type { Dados } from "./dados.ts";

// O que será enviado, para conferir.
export function Resumo({ dados }: {
  dados: Dados;
}) {
  return (
    <dl>
      <dt>Nome</dt><dd>{dados.nome}</dd>
      <dt>CNS</dt><dd>{dados.cns}</dd>
      <dt>Nascimento</dt>
      <dd>{dados.nascimento}</dd>
      <dt>Telefone</dt>
      <dd>{dados.telefone || "—"}</dd>
      <dt>Responsável</dt>
      <dd>{dados.responsavel || "—"}</dd>
    </dl>
  );
}
