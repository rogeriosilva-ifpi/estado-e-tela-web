import { ErroHttp, pedir }
  from "../../api/cliente.ts";
import type { Dados, Erros, Passo }
  from "./dados.ts";

// A resposta do servidor, já no formato de
// uma ação do assistente.
export type Resposta =
  | { tipo: "admitido"; id: string }
  | { tipo: "recusado"; erros: Erros }
  | { tipo: "falhou"; msg: string;
      passo: Passo };

const MSG: Record<number, string> = {
  401: "Entre antes de admitir.",
  403: "Seu papel não pode admitir.",
};

export async function admitir(
  dados: Dados,
): Promise<Resposta> {
  // contato vazio não vai: a API o recusaria
  const corpo = Object.fromEntries(Object
    .entries(dados).filter(([, v]) => v));
  try {
    type Criado = { id: string };
    const { id } = await pedir<Criado>(
      "/api/patients",
      { metodo: "POST", corpo });
    return { tipo: "admitido", id };
  } catch (e) {
    // rede caída ou defeito: sobe ao limite
    if (!(e instanceof ErroHttp)) throw e;
    const r = e.corpo as {
      error?: string; campos?: string[] };
    if (e.status === 400) {
      const erros: Erros = {};
      for (const c of r.campos ?? []) {
        erros[c as keyof Dados] =
          "Recusado pelo servidor.";
      }
      return { tipo: "recusado", erros };
    }
    // CNS repetido: corrigir na identificação
    if (e.status === 409) {
      return { tipo: "falhou",
        msg: r.error ?? "CNS já cadastrado.",
        passo: "identificacao" };
    }
    return {
      tipo: "falhou", passo: "confirmacao",
      msg: MSG[e.status] ?? "Falha no "
        + "servidor. Tente de novo.",
    };
  }
}
