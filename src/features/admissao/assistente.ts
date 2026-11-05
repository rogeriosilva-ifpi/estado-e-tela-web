import type { Resposta } from "./admitir.ts";
import {
  type Dados, type Erros, type Passo,
  PASSOS, VAZIO, validar,
} from "./dados.ts";

// Cada fase guarda só o que faz sentido
// nela: enviando não tem passo, admitido não
// tem dados. Estado impossível não compila.
export type Estado =
  | { fase: "editando"; passo: Passo;
      dados: Dados; erros: Erros;
      aviso?: string }
  | { fase: "enviando"; dados: Dados }
  | { fase: "admitido"; id: string };

export type Acao =
  | { tipo: "campo"; campo: keyof Dados;
      valor: string }
  | { tipo: "avancar" }
  | { tipo: "voltar" }
  | { tipo: "enviar" }
  | { tipo: "recomecar" }
  | Resposta;

type Editando =
  Extract<Estado, { fase: "editando" }>;

export function inicial(
  dados: Dados = VAZIO,
): Editando {
  return { fase: "editando",
    passo: "identificacao", dados,
    erros: {} };
}

// Puro: mesmo estado e mesma ação, mesmo
// resultado. Ação que não cabe na fase atual
// é ignorada: o reducer decide a transição.
export function assistente(
  e: Estado, a: Acao,
): Estado {
  switch (e.fase) {
    case "editando":
      return editando(e, a);
    case "enviando":
      if (a.tipo === "admitido") {
        return { fase: "admitido", id: a.id };
      }
      if (a.tipo === "recusado") {
        return { ...inicial(e.dados),
          erros: a.erros };
      }
      if (a.tipo === "falhou") {
        return { ...inicial(e.dados),
          passo: a.passo, aviso: a.msg };
      }
      return e;
    case "admitido":
      return a.tipo === "recomecar"
        ? inicial() : e;
  }
}

function editando(
  e: Editando, a: Acao,
): Estado {
  const i = PASSOS.indexOf(e.passo);
  switch (a.tipo) {
    case "campo":
      return { ...e, dados:
        { ...e.dados, [a.campo]: a.valor } };
    case "avancar": {
      const erros = validar(e.passo, e.dados);
      const n = Object.keys(erros).length;
      return n === 0
        ? { ...e, erros, aviso: undefined,
          passo: PASSOS[Math.min(i + 1, 2)] }
        : { ...e, erros };
    }
    case "voltar":
      return { ...e, erros: {},
        passo: PASSOS[Math.max(i - 1, 0)] };
    case "enviar":
      return e.passo === "confirmacao"
        ? { fase: "enviando", dados: e.dados }
        : e;
    case "recomecar":
      return inicial();
    default:
      return e;
  }
}
