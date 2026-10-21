import {
  useActionState, useRef,
} from "react";
import type { FormEvent } from "react";
import { Campo }
  from "../../compartilhado/Campo.tsx";
import { admitir, type Resultado }
  from "./admitir.ts";

const INICIAL: Resultado = { tipo: "ocioso" };

export function FormAdmissao() {
  const emCurso = useRef(false);
  async function enviar(
    ant: Resultado, dados: FormData,
  ) {
    try {
      return await admitir(ant, dados);
    } finally {
      emCurso.current = false;
    }
  }
  const [res, acao, pendente] =
    useActionState(enviar, INICIAL);

  // Roda antes da action, no mesmo instante
  // do clique: o ref não espera um render.
  function travar(e: FormEvent) {
    if (emCurso.current) e.preventDefault();
    else emCurso.current = true;
  }

  const v = "valores" in res
    ? res.valores : {};
  const erro = (c: string) =>
    res.tipo === "invalido" ? res.erros[c]
      : undefined;

  return (
    <form action={acao} onSubmit={travar}
      noValidate>
      <Campo nome="nome" rotulo="Nome"
        valor={v.nome} erro={erro("nome")} />
      <Campo nome="cns" rotulo="CNS"
        valor={v.cns} erro={erro("cns")} />
      <Campo nome="nascimento" tipo="date"
        rotulo="Nascimento"
        valor={v.nascimento}
        erro={erro("nascimento")} />
      <button disabled={pendente}>
        {pendente ? "Enviando…" : "Admitir"}
      </button>
      {res.tipo === "erro" && (
        <p role="alert">{res.msg}</p>
      )}
      {res.tipo === "ok" && (
        <p role="status">
          Paciente {res.id} admitido.
        </p>
      )}
    </form>
  );
}
