import { useSuspenseQuery }
  from "@tanstack/react-query";
import { useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "react-router";
import type { Edicao }
  from "../../api/pacientes.ts";
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
import { usePode }
  from "../../compartilhado/sessao.ts";
import {
  consultaPaciente, negado, useEditarPaciente,
  useInativarPaciente,
} from "./consultas.ts";

export function DetalhePaciente() {
  const { id = "" } = useParams();
  // Nada de cópia: lê do cache, que o loader
  // encheu e que as mutações atualizam.
  const { data: p } = useSuspenseQuery(
    consultaPaciente(id));
  const editar = useEditarPaciente(id);
  const inativar = useInativarPaciente(id);
  const [confirmar, setConfirmar] =
    useState(false);
  const exibir = useExibirNome();
  // a API diz o que este papel pode; a
  // mesma API recusa (403) quem tentar
  const podeInativar =
    usePode("patient:deactivate");

  function salvar(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const dados: Edicao = {
      nome: String(f.get("nome")) };
    const tel = String(f.get("telefone"));
    if (tel) dados.telefone = tel;
    editar.mutate(dados);
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
      {/* key: outro paciente, outro form */}
      <form key={p.id} onSubmit={salvar}>
        <Campo nome="nome" rotulo="Nome"
          valor={p.nome} />
        <Campo nome="telefone"
          rotulo="Telefone"
          valor={p.telefone} />
        <Botao type="submit"
          disabled={editar.isPending}>
          Salvar</Botao>
      </form>
      {editar.isError && (
        <Aviso tom="erro">
          Não foi salvo; o nome voltou ao
          anterior.</Aviso>
      )}
      {podeInativar && (
        <Botao variante="perigo"
          disabled={p.ativo === false}
          onClick={() => setConfirmar(true)}>
          Inativar</Botao>)}
      {inativar.isError && (
        <Aviso tom="erro">
          {negado(inativar.error)
            ? "Seu papel não pode inativar."
            : "Não foi inativado."}</Aviso>
      )}
      <Modal aberto={confirmar}
        titulo={`Inativar ${exibir(p.nome)}?`}
        onFechar={() => setConfirmar(false)}>
        <p>Sai da busca; o prontuário
          fica.</p>
        <Botao variante="secundaria"
          onClick={() => setConfirmar(false)}>
          Cancelar</Botao>{" "}
        <Botao variante="perigo"
          onClick={() => {
            inativar.mutate();
            setConfirmar(false);
          }}>
          Confirmar inativação</Botao>
      </Modal>
    </article>
  );
}
