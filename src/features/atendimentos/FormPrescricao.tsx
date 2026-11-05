import { useState } from "react";
import type { FormEvent } from "react";
import type { NovaPrescricao }
  from "../../api/atendimentos.ts";
import { Botao }
  from "../../compartilhado/Botao.tsx";
import { Campo }
  from "../../compartilhado/Campo.tsx";

interface Props {
  enviando: boolean;
  onPrescrever: (p: NovaPrescricao) => void;
}

type Erros = Partial<
  Record<keyof NovaPrescricao, string>>;

// As mesmas regras da API (mínimo de dois
// caracteres); a API confere de novo.
function validar(p: NovaPrescricao): Erros {
  const e: Erros = {};
  if (p.medicamento.trim().length < 2)
    e.medicamento = "Informe o medicamento.";
  if (p.posologia.trim().length < 2)
    e.posologia = "Informe a posologia.";
  return e;
}

export function FormPrescricao(
  { enviando, onPrescrever }: Props,
) {
  const [erros, setErros] =
    useState<Erros>({});

  function enviar(
    ev: FormEvent<HTMLFormElement>,
  ) {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const p = {
      medicamento:
        String(f.get("medicamento")),
      posologia: String(f.get("posologia")),
    };
    const e = validar(p);
    setErros(e);
    if (Object.keys(e).length) return;
    // limpar fica com quem chama, depois do
    // 201: se a API recusar, o texto fica
    onPrescrever(p);
  }

  return (
    <form aria-label="Nova prescrição"
      onSubmit={enviar} noValidate>
      <Campo nome="medicamento"
        rotulo="Medicamento"
        erro={erros.medicamento} />
      <Campo nome="posologia"
        rotulo="Posologia"
        erro={erros.posologia} />
      <Botao type="submit"
        disabled={enviando}>
        Prescrever</Botao>
    </form>
  );
}
