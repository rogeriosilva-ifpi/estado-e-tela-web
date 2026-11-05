import { useQueryClient }
  from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams }
  from "react-router";
import type { FormEvent } from "react";
import { ErroHttp }
  from "../../api/cliente.ts";
import { entrar } from "../../api/sessao.ts";
import { Aviso }
  from "../../compartilhado/Aviso.tsx";
import { Botao }
  from "../../compartilhado/Botao.tsx";

type Estado =
  | { tipo: "ocioso" }
  | { tipo: "enviando" }
  | { tipo: "erro"; msg: string };

// Só caminhos internos: "?volta=//site.com"
// não pode levar ninguém para fora.
function destino(volta: string | null) {
  return volta?.startsWith("/")
    && !volta.startsWith("//") ? volta : "/";
}

// Formulário controlado: cada tecla passa
// pelo estado do React.
export function FormLogin() {
  const navegar = useNavigate();
  const [params] = useSearchParams();
  const cache = useQueryClient();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [estado, setEstado] =
    useState<Estado>({ tipo: "ocioso" });

  async function enviar(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    setEstado({ tipo: "enviando" });
    try {
      await entrar(email, senha);
      // começa do zero: a próxima pergunta
      // "quem entrou?" vai ao servidor
      cache.clear();
      navegar(destino(params.get("volta")),
        { replace: true });
    } catch (erro) {
      const negado = erro instanceof ErroHttp
        && erro.status === 401;
      setEstado({ tipo: "erro", msg: negado
        ? "E-mail ou senha incorretos."
        : "Não foi possível entrar agora." });
    }
  }

  return (
    <form onSubmit={enviar}>
      <label>
        E-mail
        <input type="email" value={email}
          onChange={(e) =>
            setEmail(e.target.value)} />
      </label>
      <label>
        Senha
        <input type="password" value={senha}
          onChange={(e) =>
            setSenha(e.target.value)} />
      </label>
      <Botao type="submit"
        disabled={estado.tipo === "enviando"}>
        Entrar
      </Botao>
      {estado.tipo === "erro" && (
        <Aviso tom="erro">{estado.msg}</Aviso>
      )}
    </form>
  );
}
