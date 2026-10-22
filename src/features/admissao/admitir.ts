import { ErroHttp, pedir }
  from "../../api/cliente.ts";
import { NovoPaciente } from "./esquema.ts";

export type Valores = Record<string, string>;
export type Resultado =
  | { tipo: "ocioso" }
  | { tipo: "invalido"; erros: Valores;
      valores: Valores }
  | { tipo: "erro"; msg: string;
      valores: Valores }
  | { tipo: "ok"; id: string };

const MSG: Record<number, string> = {
  401: "Entre antes de admitir.",
  403: "Seu papel não pode admitir.",
};

// Valida, envia e traduz a resposta num
// resultado que a tela sabe mostrar.
export async function admitir(
  _anterior: Resultado, dados: FormData,
): Promise<Resultado> {
  const valores = Object.fromEntries(
    dados) as Valores;
  const v = NovoPaciente.safeParse(valores);
  if (!v.success) {
    const erros: Valores = {};
    for (const i of v.error.issues) {
      erros[String(i.path[0])] = i.message;
    }
    return { tipo: "invalido", erros,
      valores };
  }

  try {
    type Criado = { id: string };
    const { id } = await pedir<Criado>(
      "/api/patients",
      { metodo: "POST", corpo: v.data });
    return { tipo: "ok", id };
  } catch (e) {
    // rede caída ou defeito: sobe ao limite
    if (!(e instanceof ErroHttp)) throw e;
    const corpo = e.corpo as {
      error?: string; campos?: string[] };
    if (e.status === 400) {
      const erros: Valores = {};
      for (const c of corpo.campos ?? []) {
        erros[c] = "Recusado pelo servidor.";
      }
      return { tipo: "invalido", erros,
        valores };
    }
    const doServidor = e.status === 409
      ? corpo.error : undefined;
    const msg = doServidor ?? MSG[e.status]
      ?? "Falha no servidor. Tente de novo.";
    return { tipo: "erro", msg, valores };
  }
}
