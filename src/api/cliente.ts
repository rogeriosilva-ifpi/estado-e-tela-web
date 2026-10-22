// A única porta do front para a rede. Quem
// chama recebe o dado ou um ErroHttp; nunca
// um Response cru para interpretar.
export class ErroHttp extends Error {
  status: number;
  corpo: unknown;
  constructor(
    status: number, corpo: unknown,
  ) {
    super(`HTTP ${status}`);
    this.name = "ErroHttp";
    this.status = status;
    this.corpo = corpo;
  }
}

interface Opcoes {
  metodo?: "GET" | "POST" | "PATCH";
  corpo?: unknown;
  sinal?: AbortSignal;
}

export async function pedir<T>(
  caminho: string, o: Opcoes = {},
): Promise<T> {
  const temCorpo = o.corpo !== undefined;
  const r = await fetch(caminho, {
    method: o.metodo ?? "GET",
    signal: o.sinal,
    headers: temCorpo
      ? { "Content-Type": "application/json" }
      : undefined,
    body: temCorpo
      ? JSON.stringify(o.corpo) : undefined,
  });
  const tipo = r.headers.get("content-type");
  const json = tipo?.includes("json");
  const corpo: unknown = json
    ? await r.json() : await r.text();
  if (!r.ok) {
    throw new ErroHttp(r.status, corpo);
  }
  // o tipo T é promessa, não verificação
  return corpo as T;
}
