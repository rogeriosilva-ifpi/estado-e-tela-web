# Invariantes da interface

Regras que nenhuma mudança pode quebrar, humana ou de agente. Cada
capítulo do livro acrescenta as suas; cada regra diz como é verificada.

| ID | Regra | Verificação |
|---|---|---|
| UI-00 | O código do front chama a API por caminho relativo (`/api/...`); nenhum endereço de servidor no código. | `grep -rn "localhost:3000" src` vazio |
| UI-01 | Lista usa key do domínio (o `id`), nunca o índice do array. | `Ala.test.tsx`: "anotação acompanha o paciente" |
| UI-02 | Componente nunca é definido dentro de outro componente. | `oxlint`: `react/no-unstable-nested-components` |
