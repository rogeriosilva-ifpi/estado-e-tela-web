import { http, HttpResponse } from "msw/http";
import type { Paciente }
  from "../api/pacientes.ts";
import type { Usuario }
  from "../api/sessao.ts";
import { rede } from "./rede.ts";

type Opcoes = {
  // quem /api/auth/me diz que entrou
  usuario?: Usuario | null;
  // "METODO /caminho" → status de recusa
  recusar?: Record<string, number>;
};

const json = HttpResponse.json;
const nada = () => json({}, { status: 404 });

// A API falsa: as rotas da tag cap15 da API,
// descritas no MSW, com um banco em memória.
// A tela faz fetch de verdade; nada dentro
// dela é trocado.
export function apiFalsa(
  semente: Paciente[],
  { usuario = ANA, recusar = {} }:
    Opcoes = {},
) {
  const db = semente.map((p) => ({ ...p }));
  const pedidos: string[] = [];
  let aberta = usuario !== null;
  const quem = usuario ?? ANA;
  const achar = (id: unknown) =>
    db.find((x) => x.id === id);

  rede.use(
    // passa por todos os pedidos primeiro:
    // anota, recusa ou cai na rota abaixo
    http.all("/api/*", ({ request }) => {
      const u = new URL(request.url);
      const pedido =
        `${request.method} ${u.pathname}`;
      pedidos.push(pedido);
      if (recusar[pedido]) {
        return json({ error: "recusado" },
          { status: recusar[pedido] });
      }
      if (pedido === "POST /api/auth/login") {
        aberta = true;
        return json({ usuario: quem });
      }
      if (!aberta) {
        return json({ error: "Sem sessão." },
          { status: 401 });
      }
    }),
    http.get("/api/auth/me",
      () => json({ usuario: quem })),
    http.post("/api/auth/logout",
      () => new HttpResponse(null,
        { status: 204 })),
    // como a API: lê pagina e porPagina,
    // ignora o que não conhece
    http.get("/api/patients",
      ({ request }) => {
        const p = new URL(request.url)
          .searchParams;
        const q = p.get("q") ?? "";
        const pag =
          Number(p.get("pagina") ?? 1);
        const por =
          Number(p.get("porPagina") ?? 10);
        const achados = db.filter((x) =>
          x.ativo !== false && x.nome
            .toLowerCase().includes(q));
        return json({ total: achados.length,
          pagina: pag, porPagina: por,
          itens: achados.slice(
            (pag - 1) * por, pag * por) });
      }),
    http.get("/api/patients/:id",
      ({ params }) => {
        const p = achar(params.id);
        return p ? json(p) : nada();
      }),
    http.patch("/api/patients/:id",
      async ({ params, request }) => {
        const p = achar(params.id);
        if (!p) return nada();
        Object.assign(p,
          await request.json());
        return json(p);
      }),
    http.post("/api/patients/:id/inativar",
      ({ params }) => {
        const p = achar(params.id);
        if (!p) return nada();
        p.ativo = false;
        return json(p);
      }),
  );

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
