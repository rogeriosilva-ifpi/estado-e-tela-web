import { data, type LoaderFunctionArgs }
  from "react-router";
import { ErroHttp }
  from "../../api/cliente.ts";
import { consultas }
  from "../../api/consultas.ts";
import { consultaPaciente }
  from "./consultas.ts";

// Garante o paciente no cache antes de a
// rota aparecer: se já está fresco, nem vai
// à rede. O componente lê do mesmo cache.
// Sessão não é assunto daqui: o middleware
// barra quem não entrou, e o 401 tardio
// limpa o cache (api/consultas.ts).
export async function carregarPaciente(
  { params }: LoaderFunctionArgs,
) {
  try {
    return await consultas.ensureQueryData(
      consultaPaciente(params.id!));
  } catch (e) {
    if (!(e instanceof ErroHttp)) throw e;
    if (e.status === 404) {
      throw data("Paciente não encontrado.",
        { status: 404 });
    }
    throw e;
  }
}
