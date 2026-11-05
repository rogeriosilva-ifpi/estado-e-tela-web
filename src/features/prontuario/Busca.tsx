import { Link, useSearchParams }
  from "react-router";
import { Aviso }
  from "../../compartilhado/Aviso.tsx";
import { BarraBusca }
  from "../../compartilhado/BarraBusca.tsx";
import { useExibirNome } from
  "../../compartilhado/exibicao/contextos.ts";
import { useBuscaPacientes }
  from "./useBuscaPacientes.ts";

// Busca pacientes de todo o hospital, no
// servidor, a cada tecla.
export function BuscaProntuario() {
  // O termo mora na URL: sobrevive ao Voltar,
  // ao recarregar e a um link enviado.
  const [params, setParams] =
    useSearchParams();
  const termo = params.get("q") ?? "";
  // replace: uma tecla não vira um passo no
  // histórico. flushSync: o roteador atualiza
  // dentro de uma transição, e o campo, que
  // lê a URL, perderia teclas.
  const setTermo = (t: string) =>
    setParams(t ? { q: t } : {},
      { replace: true, flushSync: true });
  const exibir = useExibirNome();
  const { achados, aviso } =
    useBuscaPacientes(termo);
  const total = achados.length; // derivado

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
            <Link to={`/pacientes/${a.id}`}>
              {exibir(a.nome)}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
