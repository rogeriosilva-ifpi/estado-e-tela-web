// Quem entrou fica guardado no navegador,
// para a tela continuar logada depois de
// recarregar.
export interface Usuario {
  nome: string;
  papel: string;
}

const CHAVE = "usuario";

export function usuarioAtual():
  Usuario | null {
  const s = localStorage.getItem(CHAVE);
  return s ? JSON.parse(s) : null;
}

export const lembrar = (u: Usuario) =>
  localStorage.setItem(CHAVE,
    JSON.stringify(u));

export const esquecer = () =>
  localStorage.removeItem(CHAVE);
