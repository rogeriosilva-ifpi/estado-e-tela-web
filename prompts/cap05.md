# Capítulo 5 · Props, eventos e fluxo de dados

## Agente (o mesmo do livro)

```text
Goal
Ordenar a lista da Ala por risco (alto primeiro), com um botão que liga e
desliga a ordenação.

Context
@src/features/pacientes/ @INVARIANTES.md @docs/UI.md

Constraints
- a ordem é derivada no render, nunca guardada como outra lista em estado
- nada de sort, reverse, push ou splice sobre estado (UI-03)
- o botão usa aria-pressed

Done when
- npm run gate verde
- teste novo: ligar, desligar e conferir a ordem original de volta
- os seis testes atuais passam sem mudar
```

## Revisão adversarial (contexto novo)

```text
Revise o diff contra INVARIANTES.md. Procure: mutação de estado (atribuição
em objeto do estado, sort, reverse, push, splice), cópia de prop em estado,
estado duplicado que poderia ser derivado, && com número na renderização.
Para cada achado: arquivo:linha, regra, como reproduzir na tela, correção
mínima. Sem achado, diga "nenhum achado".
```

## Chat · C-P-T-R-F-A

```text
C  React 19. Lista de pacientes em useState na Ala; o cartão chama
   onPrioridade(id). Colo a função alternarPrioridade abaixo.
P  Dev sênior de React.
T  Diga se a função muta estado e reescreva sem mutação.
R  Sem biblioteca; um objeto novo só para o paciente alterado.
F  A função corrigida e uma frase sobre Object.is.
A  Clicar em Prioridade renderiza na hora.
```

## V.E.R.M.

- **Verifica:** o teste "prioridade no cartão e no detalhe" passa e falha em `cap05-antes`?
- **Explica:** sabe dizer por que o clique não renderizava?
- **Reduz:** o agente trouxe Immer ou outra biblioteca para isso? Desnecessário aqui.
- **Marca:** registre no `IA.md`.
