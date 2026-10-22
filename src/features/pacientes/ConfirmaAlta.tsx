import { Botao }
  from "../../compartilhado/Botao.tsx";
import { Modal }
  from "../../compartilhado/Modal.tsx";

interface Props {
  nome?: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

// Ação que não tem volta pede confirmação.
// Cancelar vem primeiro: é ele que recebe
// o foco quando o diálogo abre.
export function ConfirmaAlta({
  nome, onConfirmar, onCancelar,
}: Props) {
  return (
    <Modal aberto={nome !== undefined}
      titulo={`Dar alta a ${nome}?`}
      onFechar={onCancelar}>
      <p>O paciente sai da lista da Ala B.</p>
      <Botao variante="secundaria"
        onClick={onCancelar}>
        Cancelar
      </Botao>{" "}
      <Botao variante="perigo"
        onClick={onConfirmar}>
        Confirmar alta
      </Botao>
    </Modal>
  );
}
