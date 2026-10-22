import css from "./ConfirmaAlta.module.css";

interface Props {
  nome: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

// Caixa de confirmação por cima da tela.
export function ConfirmaAlta({
  nome, onConfirmar, onCancelar,
}: Props) {
  return (
    <div className={css.fundo}>
      <div className={css.caixa}>
        <p>Dar alta a {nome}?</p>
        <button onClick={onConfirmar}>
          Confirmar alta
        </button>{" "}
        <button onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
