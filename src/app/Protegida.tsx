import { Navigate, Outlet, useLocation }
  from "react-router";
import { usuarioAtual }
  from "../compartilhado/sessao.ts";

// Só deixa passar quem entrou.
export function Protegida() {
  const { pathname } = useLocation();
  if (!usuarioAtual()) {
    return <Navigate replace
      to={"/entrar?volta="
        + encodeURIComponent(pathname)} />;
  }
  return <Outlet />;
}
