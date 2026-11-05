// "Maria Souza" → "M. S.": o modo discreto
// mostra só as iniciais, para telas que
// ficam à vista no corredor.
export function iniciais(nome: string) {
  return nome.split(" ").filter(Boolean)
    .map((p) => `${p[0].toUpperCase()}.`)
    .join(" ");
}
