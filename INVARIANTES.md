# Invariantes da interface

Regras que nenhuma mudança pode quebrar, humana ou de agente. Cada
capítulo do livro acrescenta as suas; cada regra diz como é verificada.

| ID | Regra | Verificação |
|---|---|---|
| UI-00 | O código do front chama a API por caminho relativo (`/api/...`); nenhum endereço de servidor no código. | `grep -rn "localhost:3000" src` vazio |
