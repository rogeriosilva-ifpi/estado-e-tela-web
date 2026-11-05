import {
  data, type LoaderFunctionArgs, redirect,
} from "react-router";
import { ErroHttp }
  from "../../api/cliente.ts";
import { consultas }
  from "../../api/consultas.ts";
import { consultaPaciente }
  from "./consultas.ts";

// Garante o paciente no cache antes de a
// rota aparecer: se já está fresco, nem vai
// à rede. O componente lê do mesmo cache.
export async function carregarPaciente(
  { params, request }: LoaderFunctionArgs,
) {
  try {
    return await consultas.ensureQueryData(
      consultaPaciente(params.id!));
  } catch (e) {
    if (!(e instanceof ErroHttp)) throw e;
    if (e.status === 401) {
      // entra e volta para cá
      const aqui = new URL(request.url);
      throw redirect("/entrar?volta="
        + encodeURIComponent(aqui.pathname));
    }
    if (e.status === 404) {
      throw data("Paciente não encontrado.",
        { status: 404 });
    }
    throw e;
  }
}
