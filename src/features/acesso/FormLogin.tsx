import { useState } from "react";
import type { FormEvent } from "react";

type Estado =
  | { tipo: "ocioso" }
  | { tipo: "enviando" }
  | { tipo: "erro"; msg: string }
  | { tipo: "ok"; nome: string };

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
    const r = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    if (!r.ok) {
      const msg = r.status === 401
        ? "E-mail ou senha incorretos."
        : "Não foi possível entrar agora.";
      setEstado({ tipo: "erro", msg });
      return;
    }
    const { usuario } = await r.json();
    setEstado(
      { tipo: "ok", nome: usuario.nome });
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
      <button
        disabled={estado.tipo === "enviando"}>
        Entrar
      </button>
      {estado.tipo === "erro" && (
        <p role="alert">{estado.msg}</p>
      )}
    </form>
  );
}
