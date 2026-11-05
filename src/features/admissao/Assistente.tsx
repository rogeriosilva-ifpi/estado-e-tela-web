import {
  startTransition, useEffect, useReducer,
  useRef,
} from "react";
import type { FormEvent } from "react";
import { Aviso }
  from "../../compartilhado/Aviso.tsx";
import { Botao }
  from "../../compartilhado/Botao.tsx";
import { Campo }
  from "../../compartilhado/Campo.tsx";
import { admitir } from "./admitir.ts";
import { assistente, inicial }
  from "./assistente.ts";
import {
  type Dados, PASSOS, TITULO,
} from "./dados.ts";
import {
  apagarRascunho, lerRascunho, salvarRascunho,
} from "./rascunho.ts";
import { Resumo } from "./Resumo.tsx";

// Admissão em três passos. As regras de
// transição moram em assistente.ts; aqui só
// se despacham eventos e se desenha a fase.
export function AssistenteAdmissao() {
  const [estado, despachar] = useReducer(
    assistente, undefined,
    () => inicial(lerRascunho()));
  const emCurso = useRef(false);

  // Rascunho: sincroniza com sessionStorage.
  useEffect(() => {
    if (estado.fase === "editando") {
      salvarRascunho(estado.dados);
    } else if (estado.fase === "admitido") {
      apagarRascunho();
    }
  }, [estado]);

  if (estado.fase === "admitido") {
    return (
      <>
        <Aviso tom="info">
          Paciente {estado.id} admitido.
        </Aviso>
        <Botao variante="secundaria"
          onClick={() =>
            despachar({ tipo: "recomecar" })}>
          Nova admissão
        </Botao>
      </>
    );
  }

  const enviando = estado.fase === "enviando";
  const passo = enviando
    ? "confirmacao" : estado.passo;
  const { dados } = estado;
  const erros = enviando ? {} : estado.erros;
  const aviso = enviando
    ? undefined : estado.aviso;
  const i = PASSOS.indexOf(passo);
  const campo = (c: keyof Dados) =>
    (valor: string) => despachar(
      { tipo: "campo", campo: c, valor });

  function enviar() {
    if (emCurso.current) return;
    emCurso.current = true;
    despachar({ tipo: "enviar" });
    startTransition(async () => {
      try {
        // a resposta já é uma ação
        despachar(await admitir(dados));
      } finally {
        emCurso.current = false;
      }
    });
  }

  function aoEnviar(e: FormEvent) {
    e.preventDefault();
    if (passo === "confirmacao") enviar();
    else despachar({ tipo: "avancar" });
  }

  return (
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
          disabled={enviando}
          onClick={() =>
            despachar({ tipo: "voltar" })}>
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
  );
}
