/// <reference types="node" />
import { readdirSync, readFileSync }
  from "node:fs";
import { expect, test } from "vitest";

// O Vitest não processa CSS: lemos o arquivo.
const css = readFileSync(
  "src/estilo/tokens.css", "utf8");

// --nome: light-dark(#claro, #escuro)
const cor = new Map<string, string[]>();
const hex = "(#[0-9a-f]{6})";
const re = new RegExp("--([\\w-]+):\\s+"
  + `light-dark\\(${hex}, ${hex}\\)`, "g");
for (const [, nome, claro, escuro]
  of css.matchAll(re)) {
  cor.set(nome, [claro, escuro]);
}

// Luminância relativa, como na WCAG 2.2.
function luz(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2),
      16) / 255;
    return c <= 0.04045 ? c / 12.92
      : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g
    + 0.0722 * b;
}
function contraste(a: string, b: string) {
  const [x, y] = [luz(a), luz(b)]
    .sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

// [frente, fundo, mínimo]: texto 4,5:1;
// contorno de foco 3:1.
const PARES: [string, string, number][] = [
  ["texto", "fundo", 4.5],
  ["texto", "superficie", 4.5],
  ["texto-fraco", "superficie", 4.5],
  ["texto-fraco", "fundo", 4.5],
  ["acao-texto", "acao", 4.5],
  ["acao", "superficie", 4.5],
  ["alto-texto", "alto-fundo", 4.5],
  ["medio-texto", "medio-fundo", 4.5],
  ["baixo-texto", "baixo-fundo", 4.5],
  ["perigo-texto", "perigo", 4.5],
  ["perigo", "superficie", 4.5],
  ["foco", "superficie", 3],
  ["foco", "fundo", 3],
];

test.each(PARES)("%s sobre %s ≥ %s:1",
  (frente, fundo, minimo) => {
    for (const tema of [0, 1]) {
      const r = contraste(
        cor.get(frente)![tema],
        cor.get(fundo)![tema]);
      expect(r, `${frente} tema ${tema}`)
        .toBeGreaterThanOrEqual(minimo);
    }
  });

test("cor só nasce em tokens.css", () => {
  const folhas = readdirSync("src",
    { recursive: true }).map(String)
    .filter((f) => f.endsWith(".css"))
    .filter((f) => !f.endsWith("tokens.css"));
  for (const f of folhas) {
    const txt =
      readFileSync(`src/${f}`, "utf8");
    expect(txt, f).not.toMatch(
      /#[0-9a-f]{3,8}\b/i);
  }
});
