import {
  data, type LoaderFunctionArgs, redirect,
} from "react-router";
import { ErroHttp, pedir }
  from "../../api/cliente.ts";
import type { Paciente }
  from "../../api/pacientes.ts";

// Carrega o paciente antes de a página
// aparecer: a rota só renderiza com o dado.
export async function carregarPaciente(
  { params, request }: LoaderFunctionArgs,
) {
  try {
    return await pedir<Paciente>(
      `/api/patients/${params.id}`,
      { sinal: request.signal });
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
