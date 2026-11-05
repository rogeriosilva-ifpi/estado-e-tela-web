import { Link } from "react-router";

export function NaoEncontrada() {
  return (
    <>
      <p>Página não encontrada.</p>
      <Link to="/">Ir para a Ala B</Link>
    </>
  );
}
