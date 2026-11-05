import type { RouteObject }
  from "react-router";
import { FormLogin }
  from "../features/acesso/FormLogin.tsx";
import { FichaDaRota }
  from "../features/atendimentos/Ficha.tsx";
import { PainelAtendimentos }
  from "../features/atendimentos/Painel.tsx";
import {
  carregarAtendimento, carregarPainel,
} from "../features/atendimentos/rota.ts";
import { Ala }
  from "../features/pacientes/Ala.tsx";
import { BuscaProntuario }
  from "../features/prontuario/Busca.tsx";
import { DetalhePaciente }
  from "../features/prontuario/Detalhe.tsx";
import { carregarPaciente }
  from "../features/prontuario/detalhe.ts";
import { ErroDeRota } from "./ErroDeRota.tsx";
import { Layout } from "./Layout.tsx";
import { NaoEncontrada }
  from "./NaoEncontrada.tsx";
import { exigirSessao } from "./protecao.ts";

// Baixa o código da admissão (e o Zod) só
// quando alguém abre a rota.
async function admissao() {
  const m = await import(
    "../features/admissao/Assistente.tsx");
  return { Component: m.AssistenteAdmissao };
}

export const rotas: RouteObject[] = [{
  path: "/",
  Component: Layout,
  children: [{
    // rota sem caminho: o erro de qualquer
    // página aparece dentro do Layout
    ErrorBoundary: ErroDeRota,
    children: [
      { index: true, Component: Ala },
      // só para quem entrou: o middleware
      // decide antes de qualquer loader
      { middleware: [exigirSessao],
        handle: { protegida: true },
        children: [
        { path: "pacientes",
          handle: { titulo: "Prontuário" },
          Component: BuscaProntuario,
          // mestre-detalhe: a lista continua
          // montada com o paciente aberto
          children: [{
            path: ":id",
            loader: carregarPaciente,
            ErrorBoundary: ErroDeRota,
            Component: DetalhePaciente }] },
        { path: "admissao",
          handle: { titulo: "Admissão" },
          lazy: admissao },
        { path: "atendimentos",
          handle: { titulo: "Atendimentos" },
          loader: carregarPainel,
          Component: PainelAtendimentos },
        { path: "atendimentos/:id",
          handle: { titulo: "Atendimento" },
          loader: carregarAtendimento,
          ErrorBoundary: ErroDeRota,
          Component: FichaDaRota },
      ] },
      { path: "entrar",
        handle: { titulo: "Entrar" },
        Component: FormLogin },
      { path: "*",
        handle: { titulo: "Não encontrada" },
        Component: NaoEncontrada },
    ],
  }],
}];
