import {
  isRouteErrorResponse, Link, useRouteError,
} from "react-router";
import { Aviso }
  from "../compartilhado/Aviso.tsx";

// Erro de rota (loader que lança, rota que
// quebra): aparece dentro do layout, com o
// menu de pé.
export function ErroDeRota() {
  const e = useRouteError();
  const msg = isRouteErrorResponse(e)
    ? String(e.data)
    : "Algo falhou ao abrir esta página.";
  return (
    <>
      <Aviso tom="erro">{msg}</Aviso>
      <Link to="/pacientes">
        Voltar à busca</Link>
    </>
  );
}
