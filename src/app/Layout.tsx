import {
  NavLink, Outlet, useMatches, useNavigate,
} from "react-router";
import { pedir } from "../api/cliente.ts";
import { Painel }
  from "../compartilhado/Painel.tsx";
import { Botao }
  from "../compartilhado/Botao.tsx";
import { ProvedorExibicao } from
  "../compartilhado/exibicao/Provedor.tsx";
import { esquecer, usuarioAtual }
  from "../compartilhado/sessao.ts";
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
  const navegar = useNavigate();
  const usuario = usuarioAtual();

  async function sair() {
    await pedir("/api/auth/logout",
      { metodo: "POST" });
    esquecer();
    navegar("/entrar");
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
            {!usuario && (
              <NavLink to="/entrar">
                Entrar</NavLink>)}
          </nav>
          {usuario && (
            <p>{usuario.nome}{" "}
              <Botao variante="secundaria"
                onClick={sair}>Sair</Botao>
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
