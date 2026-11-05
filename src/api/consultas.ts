import { QueryClient }
  from "@tanstack/react-query";
import { ErroHttp } from "./cliente.ts";

// Um cache só para a aplicação inteira: a
// cópia local do que o servidor tem, com
// prazo de validade.
export const consultas = new QueryClient({
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
