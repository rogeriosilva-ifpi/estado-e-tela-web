# Invariantes da interface

Regras que nenhuma mudança pode quebrar, humana ou de agente. Cada
capítulo do livro acrescenta as suas; cada regra diz como é verificada.

| ID | Regra | Verificação |
|---|---|---|
| UI-00 | O código do front chama a API por caminho relativo (`/api/...`); nenhum endereço de servidor no código. | `grep -rn "localhost:3000" src` vazio |
| UI-01 | Lista usa key do domínio (o `id`), nunca o índice do array. | `Ala.test.tsx`: "anotação acompanha o paciente" |
| UI-02 | Componente nunca é definido dentro de outro componente. | `oxlint`: `react/no-unstable-nested-components` |
| UI-03 | Estado nunca é alterado no lugar: atualização cria objeto ou array novo. | `Ala.test.tsx`: "prioridade no cartão e no detalhe" |
| UI-04 | Ação que cria registro trava no clique (ref, sem esperar render) e o servidor recusa duplicata (409). `disabled` é aviso visual, não trava. | `FormAdmissao.test.tsx` e `medicoes/cap06.py` |
| UI-05 | A tela valida para ajudar; o servidor valida para decidir. Erro do servidor aparece no campo. | `FormAdmissao.test.tsx`: "mostra o que o servidor recusou" |
| UI-06 | Efeito só sincroniza com sistema externo; nunca copia um estado para outro. | `oxlint`: `react/set-state-in-effect` como erro |
| UI-07 | Efeito que busca dados cancela o pedido na limpeza (AbortController). | `BuscaProntuario.test.tsx`: "resposta velha não sobrescreve a nova" |
| UI-08 | Feature não importa outra feature; `api/` e `compartilhado/` não importam `features/` nem `app/`; nenhum ciclo. O que duas features usam sobe para `compartilhado/`. | `npm run fronteiras` (dependency-cruiser) |
| UI-09 | Só `src/api/` chama `fetch`. Resposta de erro vira `ErroHttp` com o status; nenhuma tela interpreta `Response` cru. | `oxlint`: `no-restricted-globals` |
| UI-10 | Erro esperado (401, 403, 409) vira aviso no lugar dele. Erro inesperado sobe ao `LimiteDeErro` do painel: o painel avisa e o resto da tela continua. | `LimiteDeErro.test.tsx` e `BuscaProntuario.test.tsx`: "sem login, avisa em vez de quebrar" |
