interface Props {
  nome: string;
  rotulo: string;
  tipo?: string;
  valor?: string;
  erro?: string;
}

// Rótulo, campo e erro ligados entre si: o
// leitor de tela anuncia o erro do campo.
export function Campo({
  nome, rotulo, tipo = "text", valor, erro,
}: Props) {
  const idErro = `${nome}-erro`;
  return (
    <p>
      <label htmlFor={nome}>{rotulo}</label>
      <input
        id={nome}
        name={nome}
        type={tipo}
        defaultValue={valor}
        aria-invalid={erro ? true : undefined}
        aria-describedby={
          erro ? idErro : undefined}
      />
      {erro && (
        <span id={idErro}>{erro}</span>
      )}
    </p>
  );
}
