# Capítulo 10 · Componentes reutilizáveis e design system

## Agente (o mesmo do livro)

```text
Goal
Botão Limpar na admissão, que pede confirmação se houver algo digitado.

Context
@docs/UI.md @INVARIANTES.md

Constraints
- use Modal e Botao; nada de dialog, button ou div clicável crus
- não generalize ConfirmaAlta: é o segundo uso, copie e espere o terceiro
- Cancelar primeiro (UI-14)

Done when
- npm run gate verde
- teste: cancelar mantém o digitado
- cap10.py adaptado: foco entra, Esc fecha e o foco volta ao botão
```

## Revisão adversarial (contexto novo)

```text
Revise o diff contra INVARIANTES.md (UI-13, UI-14) e o catálogo do
docs/UI.md. Procure: botão ou diálogo crus, caixa sobreposta sem <dialog>,
foco que não entra ou não volta, Esc ignorado, ação destrutiva com foco
inicial nela, componente "genérico" sem terceiro uso, forwardRef ou
defaultProps em componente novo, prop booleana que deveria ser variante.
Para cada achado: arquivo:linha, regra, como reproduzir pelo teclado,
correção mínima. Sem achado, diga "nenhum achado".
```

## Chat · C-P-T-R-F-A

```text
C  React 19. Confirmação feita com uma div fixa por cima da tela. Com o
   mouse funciona; pelo teclado o foco fica atrás e o Esc não fecha.
P  Dev sênior de front-end com foco em acessibilidade.
T  Escreva um Modal reutilizável e use-o na confirmação.
R  <dialog> com showModal(); controlado por prop; título ligado por
   aria-labelledby; sem biblioteca.
F  Modal.tsx e o uso, com uma frase sobre cada comportamento do navegador.
A  Foco entra, Esc fecha, fundo inerte, foco volta a quem abriu.
```

## V.E.R.M.

- **Verifica:** `medicoes/cap10.py` mostra 0 paradas no fundo e o foco
  voltando ao botão Alta? O teste do diálogo falha no `cap10-antes`?
- **Explica:** sabe dizer o que o `showModal()` faz que a `div` não fazia?
- **Reduz:** o agente acrescentou foco preso à mão (focus trap) ou
  biblioteca de modal? O nativo já resolve.
- **Marca:** registre no `IA.md`.
