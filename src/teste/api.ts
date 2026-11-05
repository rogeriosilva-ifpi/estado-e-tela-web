import { vi } from "vitest";
import type { Paciente }
  from "../api/pacientes.ts";

// API falsa com estado, no formato da tag
// cap14 da API: busca paginada, detalhe,
// edição e inativação.
export function apiFalsa(
  semente: Paciente[],
) {
  const db = semente.map((p) => ({ ...p }));
  const pedidos: string[] = [];
  const json = (c: unknown, status = 200) =>
    Response.json(c, { status });
  vi.stubGlobal("fetch", vi.fn(async (
    url: string, o: RequestInit = {},
  ) => {
    const u = new URL(url, "http://x");
    const metodo = o.method ?? "GET";
    pedidos.push(`${metodo} ${u.pathname}`);
    const [, , , id, acao] =
      u.pathname.split("/");
    const p = db.find((x) => x.id === id);
    if (metodo === "GET" && !id) {
      const q = u.searchParams.get("q") ?? "";
      const pag = Number(
        u.searchParams.get("pagina") ?? 1);
      const por = Number(u.searchParams
        .get("porPagina") ?? 10);
      const achados = db.filter((x) =>
        x.ativo !== false && x.nome
          .toLowerCase().includes(q));
      return json({ total: achados.length,
        pagina: pag, porPagina: por,
        itens: achados.slice((pag - 1) * por,
          pag * por) });
    }
    if (!p) return json({}, 404);
    if (metodo === "PATCH") {
      Object.assign(p,
        JSON.parse(String(o.body)));
    }
    if (acao === "inativar") p.ativo = false;
    return json({ ...p });
  }));
  return { db, pedidos };
}

export const SEMENTE: Paciente[] = [
  { id: "p1", nome: "Maria Souza",
    cns: "898001234567890",
    nascimento: "1958-03-14" },
  { id: "p2", nome: "João Lima",
    cns: "898009876543210",
    nascimento: "1990-11-02" },
];
