import { Contato, Identificacao }
  from "./esquema.ts";

export const PASSOS = ["identificacao",
  "contato", "confirmacao"] as const;
export type Passo = (typeof PASSOS)[number];

export const TITULO: Record<Passo, string> = {
  identificacao: "Identificação",
  contato: "Contato",
  confirmacao: "Confirmação",
};

export interface Dados {
  nome: string;
  cns: string;
  nascimento: string;
  telefone: string;
  responsavel: string;
}
export type Erros =
  Partial<Record<keyof Dados, string>>;

export const VAZIO: Dados = {
  nome: "", cns: "", nascimento: "",
  telefone: "", responsavel: "",
};

const REGRAS = {
  identificacao: Identificacao,
  contato: Contato,
};

// Erros do passo atual; {} quando ele vale.
export function validar(
  passo: Passo, dados: Dados,
): Erros {
  if (passo === "confirmacao") return {};
  const v = REGRAS[passo].safeParse(dados);
  const erros: Erros = {};
  for (const i of v.error?.issues ?? []) {
    erros[i.path[0] as keyof Dados] =
      i.message;
  }
  return erros;
}
