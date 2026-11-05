import { z } from "zod";

// As mesmas regras de NovoPaciente na API
// (src/pacientes/rotas.ts), com mensagens
// para quem preenche, uma regra por passo.
// O servidor confere de novo: a tela ajuda,
// o servidor decide.
export const Identificacao = z.object({
  nome: z.string().min(2,
    { error: "Nome com 2 letras ou mais." }),
  cns: z.string().regex(/^\d{15}$/,
    { error: "CNS tem 15 dígitos." }),
  nascimento: z.iso
    .date({ error: "Data inválida." }),
});

// Contato é opcional: vazio vale.
export const Contato = z.object({
  telefone: z.string().regex(/^(\d{10,11})?$/,
    { error: "DDD e número, só dígitos." }),
  responsavel: z.string().regex(/^(|.{2,})$/,
    { error: "Nome com 2 letras ou mais." }),
});
