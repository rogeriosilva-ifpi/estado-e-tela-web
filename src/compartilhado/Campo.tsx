interface Props {
  nome: string;
  rotulo: string;
  tipo?: string;
  valor?: string;
  erro?: string;
  onMudar?: (valor: string) => void;
}

// Rótulo, campo e erro ligados entre si: o
// leitor de tela anuncia o erro do campo.
export function Campo({
  nome, rotulo, tipo = "text", valor, erro,
  onMudar,
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
        onChange={onMudar && ((e) =>
          onMudar(e.target.value))}
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
