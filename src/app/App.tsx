import { useEffect, useState } from "react";
import { Painel }
  from "../compartilhado/Painel.tsx";
import { FormLogin }
  from "../features/acesso/FormLogin.tsx";
import { FormAdmissao } from
  "../features/admissao/FormAdmissao.tsx";
import { Ala }
  from "../features/pacientes/Ala.tsx";
import { BuscaProntuario } from
  "../features/prontuario/BuscaProntuario.tsx";
import { Preferencias, type Tema }
  from "./Preferencias.tsx";
import { StatusApi } from "./StatusApi.tsx";

export default function App() {
  const [discreto, setDiscreto] =
    useState(false);
  const [tema, setTema] =
    useState<Tema>("sistema");

  // O tema mora fora do React, no <html>.
  useEffect(() => {
    const html = document.documentElement;
    html.style.colorScheme = tema === "claro"
      ? "light"
      : tema === "escuro" ? "dark" : "";
  }, [tema]);

  return (
    <main>
      <header>
        <h1>Mini-Prontuário · Ala B</h1>
        <StatusApi />
        <Preferencias
          discreto={discreto}
          onDiscreto={setDiscreto}
          tema={tema} onTema={setTema} />
      </header>
      <Painel titulo="Entrar">
        <FormLogin />
      </Painel>
      <Painel titulo="Admissão">
        <FormAdmissao />
      </Painel>
      <Painel titulo="Busca no prontuário">
        <BuscaProntuario
          discreto={discreto} />
      </Painel>
      <Ala discreto={discreto} />
    </main>
  );
}
