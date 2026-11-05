# Capítulo 16 · Testes, depuração e desempenho

## Agente (na tela)

```text
Goal
A suíte pega HTTP quebrado: rede simulada no MSW, um teste de paginação
pela tela e uma jornada E2E contra a API real.

Context
@src/teste/ @src/app/rotas.test.tsx @docs/API.md
@INVARIANTES.md (UI-20, UI-24)

Constraints
- nada de vi.mock de módulo da aplicação
- apiFalsa com a mesma interface, agora sobre o MSW
- pedido sem handler é erro
- consultas por papel e rótulo; userEvent
- e2e/: entrar, buscar, paginar, editar, conferir no servidor, sair

Done when
- npm run gate verde; npm run e2e verde com a API cap15
- "Próxima mostra a página 2" FALHA no cap16-antes (revert)
- grep -rn "vi.mock" src vazio
```

## Agente (desempenho)

```text
Goal
Ligar o React Compiler e medir.

Context
@vite.config.ts @src/lab/Renderometro.tsx @INVARIANTES.md (UI-25)

Constraints
- @rolldown/plugin-babel com reactCompilerPreset()
- não remover useMemo existente sem medir
- comparar renders e bundle antes e depois

Done when
- npm run gate verde
- cap16.py e raio_x.py com os dois números, antes e depois
```

## Revisão adversarial (contexto novo)

```text
Revise o diff contra INVARIANTES.md (UI-24, UI-25). Procure: vi.mock de
hook, serviço ou consulta; teste que verifica chamada de função em vez do
que aparece na tela; seletor por classe CSS; waitFor com tempo fixo;
handler do MSW que aceita qualquer coisa; useMemo/useCallback novo sem
número. Para cada achado: arquivo:linha, regra, como reproduzir, correção
mínima. Sem achado, diga "nenhum achado".
```

## Chat · C-P-T-R-F-A

```text
C  React 19, Vitest 5, Testing Library, TanStack Query 5. Um teste de
   paginação mocka o hook useBusca e passa; a página 2 do app real mostra
   a página 1.
P  Dev sênior de front-end.
T  Reescreva o teste para pegar o defeito.
R  MSW na fronteira, handler que lê os parâmetros como a API lê; teste
   pela tela; jornada E2E com Playwright.
F  O teste, o handler e uma frase sobre por que o mock do hook mentia.
A  O teste falha com page/perPage e passa com pagina/porPagina.
```

## V.E.R.M.

- **Verifica:** o teste novo falha no `cap16-antes`? A jornada passa com a
  API real?
- **Explica:** sabe dizer o que um `vi.mock` do hook deixa de testar?
- **Reduz:** o agente trouxe Storybook, Cypress ou Jest? Fora de escopo.
- **Marca:** registre no `IA.md`.
