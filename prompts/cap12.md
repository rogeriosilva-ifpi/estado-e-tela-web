# Capítulo 12 · Reducer e transições de estado

## Agente (o mesmo do livro)

```text
Goal
Na confirmação, "Editar contato" leva direto ao passo 2.

Context
@src/features/admissao/assistente.ts @INVARIANTES.md (UI-06, UI-16)

Constraints
- nova ação na união Acao; o reducer decide; nada de setState solto
- fora de "editando", a ação é ignorada
- reducer puro: sem fetch, sem mutação

Done when
- npm run gate verde
- teste do reducer: editar contato durante o envio devolve o mesmo estado
```

## Revisão adversarial (contexto novo)

```text
Revise o diff contra INVARIANTES.md (UI-04, UI-06, UI-16). Procure: estado
novo fora do reducer, useEffect que sincroniza um estado a partir de outro,
reducer com fetch, Date.now, Math.random ou mutação, ação aceita em fase
que não deveria, campo opcional que permite estado impossível, trava do
useRef removida. Para cada achado: arquivo:linha, regra, sequência de ações
que reproduz, correção mínima. Sem achado, diga "nenhum achado".
```

## Chat · C-P-T-R-F-A

```text
C  React 19 + TypeScript. Assistente de três passos com seis useState
   (passo, dados, erros, enviando, aviso, admitidoId). Voltar durante o
   envio deixa a tela no passo 2 com "admitido".
P  Dev sênior de front-end.
T  Reescreva com useReducer.
R  Estado em união discriminada por fase; ações em união por tipo;
   reducer puro; a resposta do servidor como ação.
F  O reducer, quatro testes sem tela e o componente.
A  Nenhum estado impossível compila; voltar no envio não muda nada.
```

## V.E.R.M.

- **Verifica:** os dois testes do assistente falham no `cap12-antes` e
  passam no `cap12`? `cap12.py` mostra o Voltar desabilitado?
- **Explica:** sabe dizer a diferença entre evento e transição?
- **Reduz:** o agente trouxe máquina de estados de biblioteca? Fora de
  escopo; o reducer é a máquina.
- **Marca:** registre no `IA.md`.
