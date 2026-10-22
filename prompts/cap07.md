# Capítulo 7 · Efeitos: sincronizar com o mundo lá fora

## Agente (o mesmo do livro)

```text
Goal
Busca do prontuário com "buscando…" e mensagem quando a rede falhar.

Context
@src/features/prontuario/ @INVARIANTES.md

Constraints
- o hook devolve dados, carregando e erro num tipo só
- AbortError não é erro de rede
- não mexa em .oxlintrc.json
- fora de escopo: debounce, cache

Done when
- npm run gate verde
- o teste da corrida passa sem mudar
- teste novo: rede que rejeita mostra a mensagem; um cancelamento, não
```

## Revisão adversarial (contexto novo)

```text
Revise o diff contra INVARIANTES.md (UI-06, UI-07). Procure: efeito sem
limpeza, fetch sem AbortController ou flag ignore, setState em efeito para
derivar valor, dependência omitida da lista, regra de lint desligada,
efeito que deveria ser handler. Para cada achado: arquivo:linha, regra,
como reproduzir (ordem das respostas), correção mínima. Sem achado, diga
"nenhum achado".
```

## Chat · C-P-T-R-F-A

```text
C  React 19. Busca que chama a API num useEffect a cada tecla (colo o
   componente). Às vezes aparece resultado de um termo antigo.
P  Dev sênior de React.
T  Explique a causa e reescreva o efeito com limpeza.
R  AbortController; sem biblioteca; total calculado no render.
F  O hook corrigido e uma frase sobre a ordem das respostas.
A  A resposta de "ma" que chega depois de "mar" não aparece.
```

## V.E.R.M.

- **Verifica:** o teste da corrida falha em `cap07-antes` e passa em `cap07`?
- **Explica:** sabe dizer quando a limpeza roda?
- **Reduz:** o agente acrescentou debounce, cache ou biblioteca? Fora de escopo.
- **Marca:** registre no `IA.md`.
