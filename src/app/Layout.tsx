import {
  Navigate, NavLink, Outlet, useLocation,
  useMatches, useNavigate,
} from "react-router";
import { esquecerSessao }
  from "../api/consultas.ts";
import { sair } from "../api/sessao.ts";
import { Painel }
  from "../compartilhado/Painel.tsx";
import { Botao }
  from "../compartilhado/Botao.tsx";
import { ProvedorExibicao } from
  "../compartilhado/exibicao/Provedor.tsx";
import { useSessao }
  from "../compartilhado/sessao.ts";
import css from "./Layout.module.css";
import { Preferencias }
  from "./Preferencias.tsx";
import { paraLogin } from "./protecao.ts";
import { StatusApi } from "./StatusApi.tsx";

type Handle = {
  titulo?: string; protegida?: boolean };

// Moldura de todas as páginas: cabeçalho,
// menu e o painel com o título da rota.
export function Layout() {
  const handles = useMatches()
    .map((m) => m.handle as Handle ?? {});
  const titulo = handles
    .map((h) => h.titulo)
    .filter(Boolean).at(-1);
  const protegida =
    handles.some((h) => h.protegida);
  const navegar = useNavigate();
  const local = useLocation();
  const usuario = useSessao();

  async function sairDaqui() {
    await sair();
    await navegar("/entrar");
    // o próximo a usar este computador não
    // herda nada do cache
    esquecerSessao();
  }

  // A sessão caiu com a tela aberta (401):
  // daqui, ao login; depois, de volta.
  if (protegida && usuario === null) {
    return <Navigate replace
      to={paraLogin(local)} />;
  }

  return (
    <ProvedorExibicao>
      <main>
        <header>
          <h1>Mini-Prontuário</h1>
          <nav aria-label="Principal"
            className={css.menu}>
            <NavLink to="/" end>
              Ala B</NavLink>
            <NavLink to="/pacientes">
              Prontuário</NavLink>
            <NavLink to="/admissao">
              Admissão</NavLink>
            <NavLink to="/atendimentos">
              Atendimentos</NavLink>
            {!usuario && (
              <NavLink to="/entrar">
                Entrar</NavLink>)}
          </nav>
          {usuario && (
            <p>{usuario.nome}{" "}
              <Botao variante="secundaria"
                onClick={sairDaqui}>
                Sair</Botao>
            </p>)}
          <StatusApi />
          <Preferencias />
        </header>
        {titulo ? (
          <Painel titulo={titulo}>
            <Outlet />
          </Painel>
        ) : <Outlet />}
      </main>
    </ProvedorExibicao>
  );
}
