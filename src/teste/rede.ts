import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll }
  from "vitest";

// A rede dos testes: o MSW intercepta o
// fetch de verdade, fora da aplicação. Pedido
// que nenhum teste descreveu é erro.
export const rede = setupServer();

beforeAll(() => rede.listen(
  { onUnhandledFrame: "error" }));
afterEach(() => rede.resetHandlers());
afterAll(() => rede.close());
