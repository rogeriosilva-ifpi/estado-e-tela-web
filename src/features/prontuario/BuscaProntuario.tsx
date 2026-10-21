import { useEffect, useState } from "react";

interface Achado { id: string; nome: string }

// Busca pacientes de todo o hospital, no
// servidor, a cada tecla.
export function BuscaProntuario() {
  const [termo, setTermo] = useState("");
  const [achados, setAchados] =
    useState<Achado[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!termo) return;
    const url = "/api/patients?q="
      + encodeURIComponent(termo)
      + location.search.replace("?", "&");
    fetch(url)
      .then((r) => r.json())
      .then((dados) => setAchados(dados));
  }, [termo]);

  // "manter o total em dia"
  useEffect(() => {
    setTotal(achados.length);
  }, [achados]);

  return (
    <>
      <input
        aria-label="Buscar no prontuário"
        placeholder="nome do paciente"
        value={termo}
        onChange={(e) =>
          setTermo(e.target.value)}
      />
      <p>{total} encontrado(s) para
        “{termo}”</p>
      <ul aria-label="Resultados">
        {achados.map((a) => (
          <li key={a.id}>{a.nome}</li>
        ))}
      </ul>
    </>
  );
}
