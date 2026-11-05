# Capítulo 13 · Rotas e navegação

## Agente (o mesmo do livro)

```text
Goal
Filtro "só prioridade" na Ala B, que sobrevive ao recarregar e ao Voltar.

Context
@docs/UI.md (Rotas) @src/app/rotas.tsx @INVARIANTES.md (UI-17)

Constraints
- o filtro mora em ?prioridade=1
- Link/NavLink; nada de <a href> interno
- nada de useEffect lendo window.location

Done when
- npm run gate verde
- teste: abrir /?prioridade=1 já filtra
- Voltar desfaz o filtro
```

## Revisão adversarial (contexto novo)

```text
Revise o diff contra INVARIANTES.md (UI-17, UI-18) e a seção Rotas do
docs/UI.md. Procure: <a href> para caminho interno, estado navegável em
useState, setSearchParams sem replace num campo, campo ligado à URL sem
flushSync, redirecionamento em efeito ou com window.location, ?volta= sem
filtro de caminho interno, import() com caminho em variável, rota sem
ErrorBoundary alcançável. Para cada achado: arquivo:linha, regra, como
reproduzir (URL e cliques), correção mínima. Sem achado, diga "nenhum
achado".
```

## Chat · C-P-T-R-F-A

```text
C  React 19 com React Router 8, modo de dados. A busca guarda o termo em
   useState e some quando o usuário volta do detalhe; o menu usa <a href>.
P  Dev sênior de front-end.
T  Leve o termo para a URL e corrija a navegação.
R  useSearchParams com replace e flushSync; NavLink; loader no detalhe
   com 401 → login (?volta= só interno) e 404 → mensagem.
F  Diff dos arquivos e uma frase sobre cada decisão.
A  Voltar do detalhe devolve a busca; o menu não recarrega a página.
```

## V.E.R.M.

- **Verifica:** `cap13.py` mostra 0 documentos ao clicar no menu e a busca
  de volta depois do Voltar? Os quatro testes de rota falham no
  `cap13-antes` e passam no `cap13`?
- **Explica:** sabe dizer por que o teste em jsdom não pega a tecla perdida?
- **Reduz:** o agente trocou o modo de dados por framework mode ou trouxe
  biblioteca de formulário? Fora de escopo.
- **Marca:** registre no `IA.md`.
