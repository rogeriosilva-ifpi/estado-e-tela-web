export type Tema = "sistema" | "claro"
  | "escuro";

interface Props {
  discreto: boolean;
  onDiscreto: (v: boolean) => void;
  tema: Tema;
  onTema: (t: Tema) => void;
}

// Preferências de exibição desta tela.
export function Preferencias({
  discreto, onDiscreto, tema, onTema,
}: Props) {
  return (
    <p>
      <label>
        <input type="checkbox"
          checked={discreto}
          onChange={(e) =>
            onDiscreto(e.target.checked)} />
        {" "}Modo discreto (só iniciais)
      </label>{" "}
      <select aria-label="Tema" value={tema}
        onChange={(e) =>
          onTema(e.target.value as Tema)}>
        <option value="sistema">
          Sistema</option>
        <option value="claro">Claro</option>
        <option value="escuro">Escuro</option>
      </select>
    </p>
  );
}
