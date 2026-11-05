import { useLoaderData } from "react-router";
import { useExibirNome } from
  "../../compartilhado/exibicao/contextos.ts";
import type { carregarPaciente }
  from "./detalhe.ts";

export function DetalhePaciente() {
  const p = useLoaderData<
    typeof carregarPaciente>();
  const exibir = useExibirNome();
  return (
    <dl>
      <dt>Nome</dt><dd>{exibir(p.nome)}</dd>
      <dt>CNS</dt><dd>{p.cns}</dd>
      <dt>Nascimento</dt>
      <dd>{p.nascimento}</dd>
      <dt>Telefone</dt>
      <dd>{p.telefone ?? "—"}</dd>
      <dt>Responsável</dt>
      <dd>{p.responsavel ?? "—"}</dd>
    </dl>
  );
}
