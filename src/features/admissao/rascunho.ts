import { type Dados, VAZIO }
  from "./dados.ts";

// Rascunho na aba, não no computador: a
// recepção é compartilhada, e sessionStorage
// some quando a aba fecha.
const CHAVE = "admissao:rascunho";

export function lerRascunho(): Dados {
  try {
    const salvo: unknown = JSON.parse(
      sessionStorage.getItem(CHAVE) ?? "{}");
    const d = { ...VAZIO };
    for (const k of Object.keys(VAZIO)) {
      const v = (salvo as Record<string,
        unknown>)[k];
      if (typeof v === "string") {
        d[k as keyof Dados] = v;
      }
    }
    return d;
  } catch {
    return { ...VAZIO };
  }
}

export function salvarRascunho(d: Dados) {
  try {
    sessionStorage.setItem(CHAVE,
      JSON.stringify(d));
  } catch {
    // armazenamento cheio ou bloqueado
  }
}

export function apagarRascunho() {
  try {
    sessionStorage.removeItem(CHAVE);
  } catch {
    // idem
  }
}
