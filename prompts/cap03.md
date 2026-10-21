# Capítulo 3 · Como o React funciona por dentro

## Agente · diagnóstico (o mesmo do livro)

```text
Goal
Descobrir por que a anotação de um paciente aparece em outro depois de
uma alta, e provar a causa.

Context
@src/features/pacientes/ @INVARIANTES.md
Passos: anotar em João Lima, dar alta a Maria Souza; a nota vai para
Ana Clara.

Constraints
- antes, um teste que reproduz o defeito pelo que o usuário vê, falhando
- depois, a correção mínima
- sem dependência nova

Done when
- npm run gate verde com a correção
- o teste novo FALHA se a correção for revertida
- a causa aponta arquivo e linha
```

## Revisão adversarial (contexto novo)

```text
Revise o diff de src/features/pacientes contra INVARIANTES.md. Procure:
key instável ou por índice, estado que deveria ser calculado, render
impuro (variável fora do componente, Date, Math.random), DOM manipulado
à mão. Para cada achado: arquivo:linha, regra violada, como reproduzir
na tela e a correção mínima. Não reescreva o código. Sem achado, diga
"nenhum achado".
```

## Chat · C-P-T-R-F-A

```text
C  Lista React de pacientes (colo ListaPacientes.tsx e CartaoPaciente.tsx).
   A anotação pula de paciente depois de uma alta.
P  Dev sênior de React.
T  Explique a causa usando "posição" e "key".
R  Sem reescrever o componente; cite a linha.
F  Três frases e a linha corrigida.
A  A explicação prevê o que acontece com key={Math.random()}.
```

## V.E.R.M.

- **Verifica:** o teste falha em `cap03-antes` e passa em `cap03`?
- **Explica:** sabe dizer onde o texto da anotação mora (React ou DOM)?
- **Reduz:** o agente trocou o input por um campo controlado sem pedir? Avalie se era necessário.
- **Marca:** registre no `IA.md`.
