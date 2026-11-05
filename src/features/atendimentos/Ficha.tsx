import { useQuery, useSuspenseQuery }
  from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";
import { ErroHttp }
  from "../../api/cliente.ts";
import { consultaPaciente }
  from "../../api/pacientes.ts";
import { Aviso }
  from "../../compartilhado/Aviso.tsx";
import { Botao }
  from "../../compartilhado/Botao.tsx";
import { Modal }
  from "../../compartilhado/Modal.tsx";
import { useExibirNome } from
  "../../compartilhado/exibicao/contextos.ts";
import { usePode, useSessao }
  from "../../compartilhado/sessao.ts";
import {
  consultaAtendimento, consultaPrescricoes,
  useFinalizar, usePrescrever,
} from "./consultas.ts";
import { FichaAtendimento }
  from "./FichaAtendimento.tsx";
import { FormPrescricao }
  from "./FormPrescricao.tsx";

const recusado = (e: Error | null) =>
  e instanceof ErroHttp && e.status === 403;

export function FichaDaRota() {
  const { id = "" } = useParams();
  const { data: a } = useSuspenseQuery(
    consultaAtendimento(id));
  const lerRx = usePode("rx:read");
  const rx = useQuery({
    ...consultaPrescricoes(id),
    enabled: lerRx });
  const prescricoes = lerRx
    ? rx.data ?? [] : null;
  const paciente = useQuery(
    consultaPaciente(a.pacienteId)).data;
  const exibir = useExibirNome();
  const prescrever = usePrescrever(id);
  const finalizar = useFinalizar(id);
  // finalizar encerra a prescrição: pede
  // confirmação, como Inativar (passo 10)
  const [confirmar, setConfirmar] =
    useState(false);

  // rx:create diz que o papel prescreve; a
  // API ainda confere autor, status e
  // plantão, e pode responder 403 (UI-22)
  const aberto = a.status === "aberto";
  const podePrescrever =
    usePode("rx:create") && aberto;
  const autor =
    useSessao()?.id === a.profissionalId;

  return (
    <FichaAtendimento atendimento={a}
      paciente={paciente
        ? exibir(paciente.nome)
        : `Paciente ${a.pacienteId}`}
      prescricoes={prescricoes}>
      {podePrescrever && (
        // nova key depois do 201: form limpo
        <FormPrescricao
          key={prescricoes?.length}
          enviando={prescrever.isPending}
          onPrescrever={(p) =>
            prescrever.mutate(p)} />
      )}
      {prescrever.isError && (
        <Aviso tom="erro">
          {recusado(prescrever.error)
            ? "A API recusou a prescrição:"
              + " ela confere autoria, status"
              + " e plantão."
            : "Não foi prescrito."}</Aviso>
      )}
      {autor && aberto && (
        <Botao variante="secundaria"
          disabled={finalizar.isPending}
          onClick={() => setConfirmar(true)}>
          Finalizar atendimento</Botao>
      )}
      <Modal aberto={confirmar}
        titulo="Finalizar o atendimento?"
        onFechar={() => setConfirmar(false)}>
        <p>Depois de finalizado, não aceita
          prescrição.</p>
        <Botao variante="secundaria"
          onClick={() => setConfirmar(false)}>
          Cancelar</Botao>{" "}
        <Botao onClick={() => {
          finalizar.mutate();
          setConfirmar(false);
        }}>Confirmar</Botao>
      </Modal>
      {finalizar.isError && (
        <Aviso tom="erro">
          Não foi finalizado.</Aviso>
      )}
    </FichaAtendimento>
  );
}
