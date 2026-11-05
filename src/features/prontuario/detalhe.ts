import type { LoaderFunctionArgs }
  from "react-router";
import { pedir } from "../../api/cliente.ts";
import type { PacienteApi } from "./tipos.ts";

// Carrega o paciente antes de a página
// aparecer: a rota só renderiza com o dado.
export function carregarPaciente(
  { params, request }: LoaderFunctionArgs,
) {
  return pedir<PacienteApi>(
    `/api/patients/${params.id}`,
    { sinal: request.signal });
}
