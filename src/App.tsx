import { Painel }
  from "./compartilhado/Painel.tsx";
import { FormLogin }
  from "./features/acesso/FormLogin.tsx";
import { FormAdmissao }
  from "./features/admissao/FormAdmissao.tsx";
import { Ala }
  from "./features/pacientes/Ala.tsx";
import { BuscaProntuario } from
  "./features/prontuario/BuscaProntuario.tsx";
import { StatusApi } from "./StatusApi.tsx";

export default function App() {
  return (
    <main>
      <header>
        <h1>Mini-Prontuário · Ala B</h1>
        <StatusApi />
      </header>
      <Painel titulo="Entrar">
        <FormLogin />
      </Painel>
      <Painel titulo="Admissão">
        <FormAdmissao />
      </Painel>
      <Painel titulo="Busca no prontuário">
        <BuscaProntuario />
      </Painel>
      <Ala />
    </main>
  );
}
