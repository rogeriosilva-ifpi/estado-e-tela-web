import { Painel }
  from "../compartilhado/Painel.tsx";
import { ProvedorExibicao } from
  "../compartilhado/exibicao/Provedor.tsx";
import { FormLogin }
  from "../features/acesso/FormLogin.tsx";
import { AssistenteAdmissao } from
  "../features/admissao/Assistente.tsx";
import { Ala }
  from "../features/pacientes/Ala.tsx";
import { BuscaProntuario } from
  "../features/prontuario/BuscaProntuario.tsx";
import { Preferencias }
  from "./Preferencias.tsx";
import { StatusApi } from "./StatusApi.tsx";

// App não guarda estado: o provedor guarda as
// preferências e recebe a tela como children.
export default function App() {
  return (
    <ProvedorExibicao>
      <main>
        <header>
          <h1>Mini-Prontuário · Ala B</h1>
          <StatusApi />
          <Preferencias />
        </header>
        <Painel titulo="Entrar">
          <FormLogin />
        </Painel>
        <Painel titulo="Admissão">
          <AssistenteAdmissao />
        </Painel>
        <Painel titulo="Busca no prontuário">
          <BuscaProntuario />
        </Painel>
        <Ala />
      </main>
    </ProvedorExibicao>
  );
}
