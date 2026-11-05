import { type MiddlewareFunction, redirect }
  from "react-router";
import { consultas }
  from "../api/consultas.ts";
import { consultaSessao }
  from "../api/sessao.ts";

type Local = { pathname: string;
  search: string };

// /entrar?volta=... para voltar aqui depois
export const paraLogin = (l: Local) =>
  "/entrar?volta=" + encodeURIComponent(
    l.pathname + l.search);

// Roda antes dos loaders das rotas filhas:
// sem sessão, ninguém pede o paciente.
export const exigirSessao:
  MiddlewareFunction = async (
    { request },
  ) => {
    const u = await consultas
      .ensureQueryData(consultaSessao);
    if (!u) {
      throw redirect(
        paraLogin(new URL(request.url)));
    }
  };
