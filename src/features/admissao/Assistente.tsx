import {
  startTransition, useEffect, useRef,
  useState,
} from "react";
import type { FormEvent } from "react";
import { Aviso }
  from "../../compartilhado/Aviso.tsx";
import { Botao }
  from "../../compartilhado/Botao.tsx";
import { Campo }
  from "../../compartilhado/Campo.tsx";
import { admitir } from "./admitir.ts";
import {
  type Dados, type Erros, type Passo,
  PASSOS, TITULO, VAZIO, validar,
} from "./dados.ts";
import { lerRascunho, salvarRascunho }
  from "./rascunho.ts";
import { Resumo } from "./Resumo.tsx";

// Admissão em três passos.
export function AssistenteAdmissao() {
  const [passo, setPasso] =
    useState<Passo>("identificacao");
  const [dados, setDados] =
    useState<Dados>(lerRascunho);
  const [erros, setErros] =
    useState<Erros>({});
  const [enviando, setEnviando] =
    useState(false);
  const [aviso, setAviso] =
    useState<string>();
  const [admitidoId, setAdmitidoId] =
    useState<string>();
  const emCurso = useRef(false);

  useEffect(() => {
    salvarRascunho(dados);
  }, [dados]);

  const i = PASSOS.indexOf(passo);
  const campo = (c: keyof Dados) =>
    (v: string) =>
      setDados({ ...dados, [c]: v });

  function avancar() {
    const e = validar(passo, dados);
    setErros(e);
    if (Object.keys(e).length === 0) {
      setPasso(PASSOS[i + 1]);
    }
  }

  function enviar() {
    if (emCurso.current) return;
    emCurso.current = true;
    setEnviando(true);
    setAviso(undefined);
    startTransition(async () => {
      try {
        const r = await admitir(dados);
        if (r.tipo === "admitido") {
          setAdmitidoId(r.id);
        } else if (r.tipo === "recusado") {
          setErros(r.erros);
          setPasso("identificacao");
        } else {
          setAviso(r.msg);
          setPasso(r.passo);
        }
      } finally {
        emCurso.current = false;
        setEnviando(false);
      }
    });
  }

  function novaAdmissao() {
    setPasso("identificacao");
    setDados(VAZIO);
  }

  function aoEnviar(e: FormEvent) {
    e.preventDefault();
    if (passo === "confirmacao") enviar();
    else avancar();
  }

  return (
    <>
      {admitidoId && (
        <>
          <Aviso tom="info">
            Paciente {admitidoId} admitido.
          </Aviso>
          <Botao variante="secundaria"
            onClick={novaAdmissao}>
            Nova admissão
          </Botao>
        </>
      )}
      <form onSubmit={aoEnviar} noValidate>
        <h3>Passo {i + 1} de 3 ·{" "}
          {TITULO[passo]}</h3>
        {passo === "identificacao" && (<>
          <Campo nome="nome" rotulo="Nome"
            valor={dados.nome}
            erro={erros.nome}
            onMudar={campo("nome")} />
          <Campo nome="cns" rotulo="CNS"
            valor={dados.cns}
            erro={erros.cns}
            onMudar={campo("cns")} />
          <Campo nome="nascimento" tipo="date"
            rotulo="Nascimento"
            valor={dados.nascimento}
            erro={erros.nascimento}
            onMudar={campo("nascimento")} />
        </>)}
        {passo === "contato" && (<>
          <Campo nome="telefone"
            rotulo="Telefone (opcional)"
            valor={dados.telefone}
            erro={erros.telefone}
            onMudar={campo("telefone")} />
          <Campo nome="responsavel"
            rotulo="Responsável (opcional)"
            valor={dados.responsavel}
            erro={erros.responsavel}
            onMudar={campo("responsavel")} />
        </>)}
        {passo === "confirmacao" && (
          <Resumo dados={dados} />
        )}
        {aviso && (
          <Aviso tom="erro">{aviso}</Aviso>
        )}
        {i > 0 && (
          <Botao variante="secundaria"
            onClick={() =>
              setPasso(PASSOS[i - 1])}>
            Voltar
          </Botao>
        )}{" "}
        <Botao type="submit"
          disabled={enviando}>
          {passo !== "confirmacao" ? "Avançar"
            : enviando ? "Enviando…"
              : "Admitir"}
        </Botao>
      </form>
    </>
  );
}
