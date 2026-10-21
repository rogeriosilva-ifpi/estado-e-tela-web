import { useState } from "react";
import type { FormEvent } from "react";
import { Campo }
  from "../../compartilhado/Campo.tsx";
import { admitir, type Resultado }
  from "./admitir.ts";

export function FormAdmissao() {
  const [res, setRes] =
    useState<Resultado>({ tipo: "ocioso" });

  async function enviar(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    const form = e.currentTarget;
    setRes(await admitir(res,
      new FormData(form)));
  }

  const v = "valores" in res
    ? res.valores : {};
  const erro = (c: string) =>
    res.tipo === "invalido" ? res.erros[c]
      : undefined;

  return (
    <form onSubmit={enviar} noValidate>
      <Campo nome="nome" rotulo="Nome"
        valor={v.nome} erro={erro("nome")} />
      <Campo nome="cns" rotulo="CNS"
        valor={v.cns} erro={erro("cns")} />
      <Campo nome="nascimento" tipo="date"
        rotulo="Nascimento"
        valor={v.nascimento}
        erro={erro("nascimento")} />
      <button>Admitir</button>
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
