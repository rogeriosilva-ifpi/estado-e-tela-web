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

  const r = await fetch("/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json" },
    body: JSON.stringify(v.data),
  });
  if (r.status === 400) {
    const { campos } = await r.json();
    const erros: Valores = {};
    for (const c of campos as string[]) {
      erros[c] = "Recusado pelo servidor.";
    }
    return { tipo: "invalido", erros,
      valores };
  }
  if (!r.ok) {
    const msg = MSG[r.status]
      ?? "Falha no servidor. Tente de novo.";
    return { tipo: "erro", msg, valores };
  }
  const { id } = await r.json();
  return { tipo: "ok", id };
}
