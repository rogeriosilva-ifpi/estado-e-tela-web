# Capítulo 11 · Prop drilling e Context

## Agente (o mesmo do livro)

```text
Goal
Preferência "densidade compacta" para a lista da Ala.

Context
@docs/UI.md (Estado compartilhado) @src/compartilhado/exibicao/

Constraints
- contexto próprio; não mexa nos outros
- ações no AcoesContext, valor estável
- nada de memo como remendo

Done when
- npm run gate verde
- cap11.py: trocar o tema continua com 0 de 6 cartões renderizados
```

## Revisão adversarial (contexto novo)

```text
Revise o diff contra INVARIANTES.md (UI-15) e a seção Estado compartilhado
do docs/UI.md. Procure: contexto com objeto literal no value, contexto que
junta assuntos diferentes, dado do servidor em contexto, provedor que não
recebe children (tela criada dentro dele), memo usado para esconder
renderização de leitor de contexto, nome de paciente fora de useExibirNome.
Para cada achado: arquivo:linha, regra, como medir (cap11.py), correção
mínima. Sem achado, diga "nenhum achado".
```

## Chat · C-P-T-R-F-A

```text
C  React 19. Uma preferência (modo discreto) desce por props do App até
   quatro componentes, em duas features. Um caminho foi esquecido.
P  Dev sênior de React.
T  Proponha a troca por Context e explique o custo de renderização.
R  Um contexto por assunto; ações separadas e estáveis; provedor que
   recebe children; use(Contexto) do React 19.
F  contextos.ts, o provedor e uma frase sobre quem renderiza.
A  Trocar o tema não renderiza os cartões da lista.
```

## V.E.R.M.

- **Verifica:** o teste do modo discreto falha no `cap11-antes` e passa no
  `cap11`? `cap11.py` mostra 0 de 6 ao trocar o tema?
- **Explica:** sabe dizer por que `memo` não impede o rerender de quem lê
  um contexto?
- **Reduz:** o agente trouxe biblioteca de estado? Fora de escopo.
- **Marca:** registre no `IA.md`.
