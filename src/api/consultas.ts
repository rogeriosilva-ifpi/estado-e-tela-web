import {
  MutationCache, QueryCache, QueryClient,
} from "@tanstack/react-query";
import { ErroHttp } from "./cliente.ts";
import { CHAVE_SESSAO } from "./sessao.ts";

// Ninguém entrou: quem lê a sessão (o
// Layout, o middleware) fica sabendo.
const semSessao = () =>
  consultas.setQueryData(CHAVE_SESSAO, null);

// Sair: a tela esquece tudo o que viu. Só
// depois de deixar as rotas protegidas, ou
// as telas abertas pediriam tudo de novo.
export function esquecerSessao() {
  consultas.removeQueries({ predicate: (q) =>
    q.queryKey[0] !== CHAVE_SESSAO[0] });
  semSessao();
}

// 401 numa consulta ou mutação: o servidor
// encerrou a sessão com a tela aberta.
function se401(e: Error | null) {
  if (e instanceof ErroHttp
    && e.status === 401) semSessao();
}

// Um cache só para a aplicação inteira: a
// cópia local do que o servidor tem, com
// prazo de validade.
export const consultas = new QueryClient({
  queryCache: new QueryCache(
    { onError: se401 }),
  // onSettled: depois de a mutação desfazer
  // a mudança otimista, não antes
  mutationCache: new MutationCache({
    onSettled: (_d, e) => se401(e) }),
  defaultOptions: { queries: {
    // por 30 s o dado é fresco: quem pedir
    // a mesma chave usa o cache sem rede
    staleTime: 30_000,
    // repetir 401, 403, 404 não muda nada
    retry: (tentativas, e) => tentativas < 2
      && !(e instanceof ErroHttp
        && e.status < 500),
  } },
});
