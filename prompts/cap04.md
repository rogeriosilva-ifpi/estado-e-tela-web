# Capítulo 4 · Componentes, JSX e composição

## Agente (o mesmo do livro)

```text
Goal
Dividir a Ala em componentes de domínio, sem mudar o comportamento.

Context
@src/features/pacientes/ @docs/UI.md @INVARIANTES.md

Constraints
- um componente por arquivo, nomes de domínio, Props tipadas
- Ala só guarda estado, deriva e compõe
- nenhum componente dentro de outro
- moldura genérica só em compartilhado/
- não altere Ala.test.tsx

Done when
- npm run gate verde, com a regra no-unstable-nested-components ligada
- Ala.test.tsx passa sem nenhuma mudança
- git diff não toca Ala.test.tsx
```

## Revisão adversarial (contexto novo)

```text
Revise o diff contra docs/UI.md e INVARIANTES.md. Procure: componente
definido dentro de outro, componente genérico com props booleanas que só
servem a um caso, nome genérico fora de compartilhado/, componente de
apresentação guardando estado de domínio, teste alterado para passar.
Para cada achado: arquivo:linha, regra, correção mínima. Sem achado,
diga "nenhum achado".
```

## Chat · C-P-T-R-F-A

```text
C  Componente React de 74 linhas (colo abaixo) com resumo, busca, lista
   e um componente Linha definido dentro dele.
P  Dev sênior de React.
T  Proponha a divisão em componentes, só os nomes e as props de cada um.
R  Nomes de domínio; uma moldura com children no máximo; nada genérico.
F  Lista: Componente — props — papel (coordena, apresenta, moldura).
A  A divisão elimina o componente definido dentro de outro.
```

## V.E.R.M.

- **Verifica:** os testes passaram sem mudar o arquivo de teste?
- **Explica:** sabe dizer por que `Linha` dentro de `Ala` apagava as anotações?
- **Reduz:** apareceu algum componente com props que ninguém usa? Corte.
- **Marca:** registre no `IA.md`.
