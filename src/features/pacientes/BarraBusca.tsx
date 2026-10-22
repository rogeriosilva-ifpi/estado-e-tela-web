interface Props {
  valor: string;
  onMudar: (valor: string) => void;
  rotulo?: string;
  dica?: string;
}

export function BarraBusca({
  valor, onMudar,
  rotulo = "Buscar paciente",
  dica = "buscar",
}: Props) {
  return (
    <input
      aria-label={rotulo}
      placeholder={dica}
      value={valor}
      onChange={(e) =>
        onMudar(e.target.value)}
    />
  );
}
