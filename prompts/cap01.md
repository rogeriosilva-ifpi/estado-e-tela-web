# Capítulo 1 · Do DOM à mão às interfaces reativas

## Agente (o mesmo do livro)

```text
Goal
Reescrever a tela de pacientes do meu front-end vanilla como função do
estado, com React por importmap, sem build.

Context
@laboratorio/cap01/3-react.html (modelo)
@<sua tela vanilla>.html

Constraints
- sem document.querySelector em componente
- sem innerHTML e sem dangerouslySetInnerHTML
- contagens calculadas no render
- key de lista é o id do registro
- fora de escopo: estilo, API, build

Done when
- anotar e buscar: a anotação fica
- após a alta, todas as contagens batem
- no medidor, a alta só remove a linha do paciente e troca textos
```

## Chat · C-P-T-R-F-A

```text
C  Tenho uma tela em JavaScript puro com estado e render() via innerHTML
   (colo abaixo). Quero a mesma tela em React 19, sem build.
P  Dev sênior de front-end.
T  Escreva o componente Ala com createElement (como h).
R  Sem querySelector, sem innerHTML; contagens calculadas no render;
   key = id; nada de estilo.
F  Só o <script type="module">, comentado em português.
A  A anotação digitada sobrevive à busca e à alta de outro paciente.
```

## Revisão adversarial (contexto novo)

```text
Revise a página React gerada. Procure: DOM manipulado à mão, HTML montado
em string, contagem guardada em estado em vez de calculada, key instável.
Para cada achado: linha, problema, como reproduzir na tela, correção
mínima. Sem achado, diga "nenhum achado".
```

## V.E.R.M.

- **Verifica:** rodou o roteiro do medidor (anotar, buscar, alta)?
- **Explica:** sabe dizer por que a anotação sobrevive no React e some no render()?
- **Reduz:** o agente trouxe biblioteca, build ou estilo? Corte.
- **Marca:** registre prompt, verificação e recusas no `IA.md`.
