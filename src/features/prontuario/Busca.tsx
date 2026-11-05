import { Link, Outlet, useSearchParams }
  from "react-router";
import { POR_PAGINA }
  from "../../api/pacientes.ts";
import { Aviso }
  from "../../compartilhado/Aviso.tsx";
import { BarraBusca }
  from "../../compartilhado/BarraBusca.tsx";
import { Botao }
  from "../../compartilhado/Botao.tsx";
import { useExibirNome } from
  "../../compartilhado/exibicao/contextos.ts";
import { useBuscaPacientes }
  from "./useBuscaPacientes.ts";

// Busca pacientes de todo o hospital, no
// servidor, a cada tecla. O detalhe do
// paciente aberto aparece embaixo (Outlet).
export function BuscaProntuario() {
  // O termo mora na URL: sobrevive ao Voltar,
  // ao recarregar e a um link enviado.
  const [params, setParams] =
    useSearchParams();
  const termo = params.get("q") ?? "";
  const pagina = Number(params.get("pagina")
    ?? 1);
  // replace: uma tecla não vira um passo no
  // histórico. flushSync: o roteador atualiza
  // dentro de uma transição, e o campo, que
  // lê a URL, perderia teclas.
  const setTermo = (t: string) =>
    setParams(t ? { q: t } : {},
      { replace: true, flushSync: true });
  const exibir = useExibirNome();
  const { achados, total, aviso } =
    useBuscaPacientes(termo, pagina);
  const paginas = Math.max(1,
    Math.ceil(total / POR_PAGINA));
  // trocar de página é um passo no histórico
  const irPara = (n: number) => setParams(
    { q: termo, pagina: String(n) });

  return (
    <>
      <BarraBusca
        rotulo="Buscar no prontuário"
        dica="nome do paciente"
        valor={termo}
        onMudar={setTermo}
      />
      {aviso ? (
        <Aviso tom="info">{aviso}</Aviso>
      ) : (
        <p>{total} encontrado(s) para
          “{termo}”</p>
      )}
      <ul aria-label="Resultados">
        {achados.map((a) => (
          <li key={a.id}>
            <Link to={{ pathname: a.id,
              search: params.toString() }}>
              {exibir(a.nome)}</Link>
          </li>
        ))}
      </ul>
      {paginas > 1 && (
        <p>
          <Botao variante="secundaria"
            disabled={pagina <= 1}
            onClick={() =>
              irPara(pagina - 1)}>
            Anterior</Botao>{" "}
          Página {pagina} de {paginas}{" "}
          <Botao variante="secundaria"
            disabled={pagina >= paginas}
            onClick={() =>
              irPara(pagina + 1)}>
            Próxima</Botao>
        </p>
      )}
      <Outlet />
    </>
  );
}
