import {
  type Tema, useAcoesExibicao,
  useDiscreto, useTema,
} from
  "../compartilhado/exibicao/contextos.ts";

// Preferências de exibição desta tela.
export function Preferencias() {
  const discreto = useDiscreto();
  const tema = useTema();
  const { setDiscreto, setTema } =
    useAcoesExibicao();
  return (
    <p>
      <label>
        <input type="checkbox"
          checked={discreto}
          onChange={(e) =>
            setDiscreto(e.target.checked)} />
        {" "}Modo discreto (só iniciais)
      </label>{" "}
      <select aria-label="Tema" value={tema}
        onChange={(e) =>
          setTema(e.target.value as Tema)}>
        <option value="sistema">
          Sistema</option>
        <option value="claro">Claro</option>
        <option value="escuro">Escuro</option>
      </select>
    </p>
  );
}
