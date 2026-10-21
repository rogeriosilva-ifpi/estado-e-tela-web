// Linhas gravadas pelo Renderometro. Em
// desenvolvimento, ficam visíveis no console
// e em window.registros.
export const registros: string[] = [];

if (import.meta.env.DEV) {
  Object.assign(window, { registros });
}
