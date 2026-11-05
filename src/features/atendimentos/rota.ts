import { data, type LoaderFunctionArgs }
  from "react-router";
import { ErroHttp }
  from "../../api/cliente.ts";
import { consultas }
  from "../../api/consultas.ts";
import {
  consultaAtendimento, consultaAtendimentos,
  consultaPrescricoes,
} from "./consultas.ts";

export const carregarPainel = () =>
  consultas.ensureQueryData(
    consultaAtendimentos);

// Atendimento e prescrições em paralelo,
// antes de a ficha aparecer.
export async function carregarAtendimento(
  { params }: LoaderFunctionArgs,
) {
  const id = params.id!;
  try {
    await Promise.all([
      consultas.ensureQueryData(
        consultaAtendimento(id)),
      consultas.ensureQueryData(
        consultaPrescricoes(id)),
    ]);
  } catch (e) {
    if (e instanceof ErroHttp
      && e.status === 404) {
      throw data(
        "Atendimento não encontrado.",
        { status: 404 });
    }
    throw e;
  }
  return null;
}
