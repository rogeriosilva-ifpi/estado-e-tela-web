import { vi } from "vitest";
import type { Paciente }
  from "../api/pacientes.ts";
import type { Usuario }
  from "../api/sessao.ts";

type Opcoes = {
  // quem /api/auth/me diz que entrou
  usuario?: Usuario | null;
  // "METODO /caminho" → status de recusa
  recusar?: Record<string, number>;
};

// API falsa com estado, no formato das tags
// cap14 e cap15 da API: sessão, busca
// paginada, detalhe, edição e inativação.
export function apiFalsa(
  semente: Paciente[],
  { usuario = ANA, recusar = {} }:
    Opcoes = {},
) {
  const db = semente.map((p) => ({ ...p }));
  const pedidos: string[] = [];
  let aberta = usuario !== null;
  const quem = usuario ?? ANA;
  const json = (c: unknown, status = 200) =>
    Response.json(c, { status });
  vi.stubGlobal("fetch", vi.fn(async (
    url: string, o: RequestInit = {},
  ) => {
    const u = new URL(url, "http://x");
    const metodo = o.method ?? "GET";
    const pedido = `${metodo} ${u.pathname}`;
    pedidos.push(pedido);
    if (recusar[pedido]) {
      return json({ error: "recusado" },
        recusar[pedido]);
    }
    if (pedido === "POST /api/auth/login") {
      aberta = true;
      return json({ usuario: quem });
    }
    if (!aberta) {
      return json(
        { error: "Não autenticado." }, 401);
    }
    if (u.pathname === "/api/auth/me") {
      return json({ usuario: quem });
    }
    if (u.pathname === "/api/auth/logout") {
      return new Response(null,
        { status: 204 });
    }
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
  // o servidor encerra a sessão (expirou,
  // "sair de todos os dispositivos")
  const encerrarSessao = () => {
    aberta = false;
  };
  return { db, pedidos, encerrarSessao };
}

export const SEMENTE: Paciente[] = [
  { id: "p1", nome: "Maria Souza",
    cns: "898001234567890",
    nascimento: "1958-03-14" },
  { id: "p2", nome: "João Lima",
    cns: "898009876543210",
    nascimento: "1990-11-02" },
];

// Os dois papéis da tag cap15 da API.
const LER = ["patient:read", "patient:create",
  "patient:update"];
export const ANA: Usuario = { id: "u2",
  nome: "Dra. Ana", papel: "profissional",
  permissoes:
    [...LER, "patient:deactivate"] };
export const CARLA: Usuario = { id: "u4",
  nome: "Carla", papel: "recepcao",
  permissoes: LER };
