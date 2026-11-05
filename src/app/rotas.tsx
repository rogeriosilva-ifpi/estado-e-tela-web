import type { RouteObject }
  from "react-router";
import { FormLogin }
  from "../features/acesso/FormLogin.tsx";
import { AssistenteAdmissao } from
  "../features/admissao/Assistente.tsx";
import { Ala }
  from "../features/pacientes/Ala.tsx";
import { BuscaProntuario }
  from "../features/prontuario/Busca.tsx";
import { DetalhePaciente }
  from "../features/prontuario/Detalhe.tsx";
import { carregarPaciente }
  from "../features/prontuario/detalhe.ts";
import { Layout } from "./Layout.tsx";

export const rotas: RouteObject[] = [{
  path: "/",
  Component: Layout,
  children: [
    { index: true, Component: Ala },
    { path: "pacientes",
      handle: { titulo: "Prontuário" },
      Component: BuscaProntuario },
    { path: "pacientes/:id",
      handle: { titulo: "Paciente" },
      loader: carregarPaciente,
      Component: DetalhePaciente },
    { path: "admissao",
      handle: { titulo: "Admissão" },
      Component: AssistenteAdmissao },
    { path: "entrar",
      handle: { titulo: "Entrar" },
      Component: FormLogin },
  ],
}];
