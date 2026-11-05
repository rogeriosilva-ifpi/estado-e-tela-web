import { data, type LoaderFunctionArgs }
  from "react-router";
import { ErroHttp }
  from "../../api/cliente.ts";
import { consultas }
  from "../../api/consultas.ts";
import { consultaSessao }
  from "../../api/sessao.ts";
import {
  consultaAtendimento, consultaAtendimentos,
  consultaPrescricoes,
} from "./consultas.ts";

export const carregarPainel = () =>
  consultas.ensureQueryData(
    consultaAtendimentos);

// Atendimento e prescrições em paralelo,
// antes de a ficha aparecer. Prescrição só
// para quem tem rx:read: a recepção recebia
// 403 e a ficha inteira caía (passo 09).
export async function carregarAtendimento(
  { params }: LoaderFunctionArgs,
) {
  const id = params.id!;
  const sessao = await consultas
    .ensureQueryData(consultaSessao);
  const lerRx = sessao?.permissoes
    .includes("rx:read");
  try {
    await Promise.all([
      consultas.ensureQueryData(
        consultaAtendimento(id)),
      lerRx && consultas.ensureQueryData(
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
