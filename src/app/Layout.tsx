import { NavLink, Outlet, useMatches }
  from "react-router";
import { Painel }
  from "../compartilhado/Painel.tsx";
import { ProvedorExibicao } from
  "../compartilhado/exibicao/Provedor.tsx";
import css from "./Layout.module.css";
import { Preferencias }
  from "./Preferencias.tsx";
import { StatusApi } from "./StatusApi.tsx";

type Handle = { titulo?: string };

// Moldura de todas as páginas: cabeçalho,
// menu e o painel com o título da rota.
export function Layout() {
  const titulo = useMatches()
    .map((m) => (m.handle as Handle)?.titulo)
    .filter(Boolean).at(-1);
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
            <NavLink to="/entrar">
              Entrar</NavLink>
          </nav>
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
