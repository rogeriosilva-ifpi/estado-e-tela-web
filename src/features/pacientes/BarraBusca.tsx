interface Props {
  valor: string;
  onMudar: (valor: string) => void;
}

export function BarraBusca(
  { valor, onMudar }: Props,
) {
  return (
    <input
      aria-label="Buscar paciente"
      placeholder="buscar"
      value={valor}
      onChange={(e) =>
        onMudar(e.target.value)}
    />
  );
}
