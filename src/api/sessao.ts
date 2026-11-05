import { queryOptions }
  from "@tanstack/react-query";
import { ErroHttp, pedir }
  from "./cliente.ts";

// Quem entrou, segundo o servidor. A tela
// não lê nem guarda credencial: o cookie é
// HttpOnly e viaja sozinho em cada pedido.
export interface Usuario {
  id: string;
  nome: string;
  papel: string;
  permissoes: string[];
}

export const CHAVE_SESSAO =
  ["sessao"] as const;

async function obterSessao(
  sinal: AbortSignal,
) {
  type Me = { usuario: Usuario };
  try {
    const r = await pedir<Me>(
      "/api/auth/me", { sinal });
    return r.usuario;
  } catch (e) {
    // 401 aqui não é erro: ninguém entrou
    if (e instanceof ErroHttp
      && e.status === 401) return null;
    throw e;
  }
}

// A sessão é dado do servidor: mora no
// cache, como os pacientes. Muda no login,
// no sair e no primeiro 401.
export const consultaSessao = queryOptions({
  queryKey: CHAVE_SESSAO,
  queryFn: ({ signal }) =>
    obterSessao(signal),
  staleTime: Infinity,
});

export const entrar = (
  email: string, senha: string,
) => pedir("/api/auth/login", {
  metodo: "POST", corpo: { email, senha } });

export const sair = () => pedir(
  "/api/auth/logout", { metodo: "POST" });
