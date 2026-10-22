# Capítulo 9 · Estilo, tokens e acessibilidade

## Agente (o mesmo do livro)

```text
Goal
Destacar o paciente selecionado na lista e o campo com erro no formulário.

Context
@docs/UI.md @src/estilo/tokens.css @INVARIANTES.md (UI-11, UI-12)

Constraints
- só var(--token); cor nova entra em tokens.css com os dois temas e o par
  em tokens.test.ts
- nunca outline: none sem substituto
- erro com texto, não só borda vermelha

Done when
- npm run gate verde
- vigia_a11y.py: 0 violações nos dois temas; foco visível em toda parada
```

## Revisão adversarial (contexto novo)

```text
Revise o diff contra INVARIANTES.md (UI-11, UI-12) e a seção Estilo do
docs/UI.md. Procure: hexadecimal fora de tokens.css, token novo sem os dois
temas ou sem par no teste, outline removido, informação só por cor,
<div onClick> no lugar de botão, regra global que alcança outro componente.
Para cada achado: arquivo:linha, regra, como reproduzir (tema, teclado),
correção mínima. Sem achado, diga "nenhum achado".
```

## Chat · C-P-T-R-F-A

```text
C  Tela React com CSS global e tema escuro feito só no body. No escuro, os
   selos de risco ficam ilegíveis; pelo teclado não se vê o foco.
P  Especialista em acessibilidade web.
T  Proponha tokens de cor para os dois temas e a regra de foco.
R  light-dark(); contraste mínimo 4,5:1 para texto e 3:1 para foco, com a
   conta; CSS Modules nos componentes.
F  tokens.css, base.css e a tabela de contrastes por tema.
A  axe sem violação nos dois temas e foco visível em toda parada.
```

## V.E.R.M.

- **Verifica:** `vigia_a11y.py cap09-antes cap09` mostra a queda das violações?
  `tokens.test.ts` falha se você voltar um hexadecimal num módulo?
- **Explica:** sabe dizer por que `:focus-visible` e não `:focus`?
- **Reduz:** o agente trouxe biblioteca de UI ou de tema? Fora de escopo.
- **Marca:** registre no `IA.md`.
