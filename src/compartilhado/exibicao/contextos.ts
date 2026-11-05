import { createContext, use } from "react";
import { iniciais } from "../nome.ts";

export type Tema = "sistema" | "claro"
  | "escuro";

interface Acoes {
  setDiscreto: (v: boolean) => void;
  setTema: (t: Tema) => void;
}

// Um contexto por assunto: quem lê o modo
// discreto não renderiza quando o tema muda;
// quem só age não renderiza nunca.
export const DiscretoContext =
  createContext(false);
export const TemaContext =
  createContext<Tema>("sistema");
export const AcoesContext =
  createContext<Acoes | null>(null);

export function useExibirNome() {
  const discreto = use(DiscretoContext);
  return (nome: string) =>
    discreto ? iniciais(nome) : nome;
}

export function useDiscreto() {
  return use(DiscretoContext);
}

export function useTema() {
  return use(TemaContext);
}

export function useAcoesExibicao() {
  const acoes = use(AcoesContext);
  if (!acoes) throw new Error(
    "Use dentro de <ProvedorExibicao>.");
  return acoes;
}
