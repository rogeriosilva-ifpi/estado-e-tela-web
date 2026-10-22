import { Component } from "react";
import type { ErrorInfo, ReactNode }
  from "react";

interface Props {
  area: string;
  children: ReactNode;
}
interface Estado {
  falhou: boolean;
}

// Porta corta-fogo: um erro de render aqui
// dentro troca só esta área por um aviso.
// Ainda é classe: não há hook equivalente.
export class LimiteDeErro
  extends Component<Props, Estado> {
  state: Estado = { falhou: false };

  static getDerivedStateFromError(): Estado {
    return { falhou: true };
  }

  componentDidCatch(e: Error, i: ErrorInfo) {
    // aqui entraria o envio para um coletor
    console.error(this.props.area, e,
      i.componentStack);
  }

  render() {
    if (!this.state.falhou) {
      return this.props.children;
    }
    return (
      <div role="alert">
        <p>{this.props.area}: algo falhou.</p>
        <button onClick={() =>
          this.setState({ falhou: false })}>
          Tentar de novo
        </button>
      </div>
    );
  }
}
