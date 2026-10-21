import { Ala }
  from "./features/pacientes/Ala.tsx";
import { StatusApi } from "./StatusApi.tsx";

export default function App() {
  return (
    <main>
      <header>
        <h1>Mini-Prontuário · Ala B</h1>
        <StatusApi />
      </header>
      <Ala />
    </main>
  );
}
