import { z } from "zod";

// As mesmas regras de NovoPaciente na API
// (src/pacientes/rotas.ts), com mensagens
// para quem preenche. O servidor confere
// de novo: a tela ajuda, o servidor decide.
export const NovoPaciente = z.object({
  nome: z.string().min(2,
    { error: "Nome com 2 letras ou mais." }),
  cns: z.string().regex(/^\d{15}$/,
    { error: "CNS tem 15 dígitos." }),
  nascimento: z.iso
    .date({ error: "Data inválida." }),
});
