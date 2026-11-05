import { describe, expect, test }
  from "vitest";
import {
  type Acao, assistente, type Estado, inicial,
} from "./assistente.ts";
import { VAZIO } from "./dados.ts";

// O reducer é uma função: testa-se sem tela.
const rosa = { ...VAZIO, nome: "Rosa Amaral",
  cns: "898001112223334",
  nascimento: "1971-05-20" };
const aplicar = (e: Estado, ...as: Acao[]) =>
  as.reduce(assistente, e);
const confirmando = aplicar(inicial(rosa),
  { tipo: "avancar" }, { tipo: "avancar" });

describe("assistente de admissão", () => {
  test("avançar valida só o passo atual",
    () => {
      const e = aplicar(inicial(),
        { tipo: "avancar" });
      expect(e).toMatchObject({
        passo: "identificacao",
        erros: {
          cns: "CNS tem 15 dígitos." } });
    });

  test("enviando ignora voltar e enviar",
    () => {
      const e = aplicar(confirmando,
        { tipo: "enviar" });
      expect(aplicar(e, { tipo: "voltar" },
        { tipo: "enviar" })).toBe(e);
    });

  test("409 volta à identificação", () => {
    const e = aplicar(confirmando,
      { tipo: "enviar" },
      { tipo: "falhou", msg: "CNS repetido.",
        passo: "identificacao" });
    expect(e).toMatchObject({
      fase: "editando",
      passo: "identificacao",
      aviso: "CNS repetido.",
      dados: rosa });
  });

  test("recomeçar depois de admitir zera",
    () => {
      const e = aplicar(confirmando,
        { tipo: "enviar" },
        { tipo: "admitido", id: "p101" },
        { tipo: "recomecar" });
      expect(e).toEqual(inicial());
    });
});
