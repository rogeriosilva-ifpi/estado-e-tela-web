import { useState } from "react";
import type { FormEvent } from "react";
import { useLoaderData } from "react-router";
import {
  editarPaciente, type Edicao,
  inativarPaciente,
} from "../../api/pacientes.ts";
import { Aviso }
  from "../../compartilhado/Aviso.tsx";
import { Botao }
  from "../../compartilhado/Botao.tsx";
import { Campo }
  from "../../compartilhado/Campo.tsx";
import { Modal }
  from "../../compartilhado/Modal.tsx";
import { useExibirNome } from
  "../../compartilhado/exibicao/contextos.ts";
import type { carregarPaciente }
  from "./detalhe.ts";

export function DetalhePaciente() {
  const doServidor = useLoaderData<
    typeof carregarPaciente>();
  // cópia local, para mostrar o que foi salvo
  const [p, setP] = useState(doServidor);
  const [aviso, setAviso] =
    useState<string>();
  const [confirmar, setConfirmar] =
    useState(false);
  const exibir = useExibirNome();

  async function salvar(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const dados: Edicao = {
      nome: String(f.get("nome")) };
    const tel = String(f.get("telefone"));
    if (tel) dados.telefone = tel;
    setP(await editarPaciente(p.id, dados));
    setAviso("Alterações salvas.");
  }

  async function inativar() {
    setP(await inativarPaciente(p.id));
    setConfirmar(false);
  }

  return (
    <article aria-label="Paciente aberto">
      <h3>{exibir(p.nome)}
        {p.ativo === false
          && " (inativo)"}</h3>
      <dl>
        <dt>CNS</dt><dd>{p.cns}</dd>
        <dt>Nascimento</dt>
        <dd>{p.nascimento}</dd>
      </dl>
      <form onSubmit={salvar}>
        <Campo nome="nome" rotulo="Nome"
          valor={p.nome} />
        <Campo nome="telefone"
          rotulo="Telefone"
          valor={p.telefone} />
        <Botao type="submit">Salvar</Botao>
      </form>
      {aviso && (
        <Aviso tom="info">{aviso}</Aviso>
      )}
      <Botao variante="perigo"
        onClick={() => setConfirmar(true)}>
        Inativar</Botao>
      <Modal aberto={confirmar}
        titulo={`Inativar ${exibir(p.nome)}?`}
        onFechar={() => setConfirmar(false)}>
        <p>Sai da busca; o prontuário
          fica.</p>
        <Botao variante="secundaria"
          onClick={() => setConfirmar(false)}>
          Cancelar</Botao>{" "}
        <Botao variante="perigo"
          onClick={inativar}>
          Confirmar inativação</Botao>
      </Modal>
    </article>
  );
}
