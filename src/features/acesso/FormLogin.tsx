import { useState } from "react";
import type { FormEvent } from "react";
import { ErroHttp, pedir }
  from "../../api/cliente.ts";
import { Aviso }
  from "../../compartilhado/Aviso.tsx";
import { Botao }
  from "../../compartilhado/Botao.tsx";

type Estado =
  | { tipo: "ocioso" }
  | { tipo: "enviando" }
  | { tipo: "erro"; msg: string }
  | { tipo: "ok"; nome: string };
type Sessao = { usuario: { nome: string } };

// Formulário controlado: cada tecla passa
// pelo estado do React.
export function FormLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [estado, setEstado] =
    useState<Estado>({ tipo: "ocioso" });

  async function entrar(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    setEstado({ tipo: "enviando" });
    try {
      const { usuario } = await pedir<Sessao>(
        "/api/auth/login", { metodo: "POST",
          corpo: { email, senha } });
      setEstado(
        { tipo: "ok", nome: usuario.nome });
    } catch (erro) {
      const negado = erro instanceof ErroHttp
        && erro.status === 401;
      setEstado({ tipo: "erro", msg: negado
        ? "E-mail ou senha incorretos."
        : "Não foi possível entrar agora." });
    }
  }

  if (estado.tipo === "ok") {
    return <p>Entrou como {estado.nome}.</p>;
  }
  return (
    <form onSubmit={entrar}>
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
