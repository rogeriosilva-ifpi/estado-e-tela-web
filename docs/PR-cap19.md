# PR · atendimentos e prescrição (capítulo 19)

Painel `/atendimentos` e ficha `/atendimentos/:id` com prescrição e
finalização, sobre a API `cap19`. Plano em `docs/PLANO-cap19.md`,
revisão em `docs/REVISAO-cap19.md`. Saídas completas em
`estado-e-tela-ebook/saidas/c19-*.txt` (`medicoes/cap19.py`).

## Evidência por critério

| # | Critério | Evidência |
|---|---|---|
| A1 | Painel lista os visíveis, com link | `src/app/atendimentos.test.tsx`, teste A1 ✓ (cada teste leva o número do critério) |
| A2 | Não autor vê sem motivo, com aviso | teste A2 ✓; `c19-depuracao.txt`: a recepção vê "Motivo visível só para o profissional responsável." |
| A3 | Prescrever só com `rx:create` e aberto | teste A3 ✓; `porta_dos_fundos.py`: recepção recebe 403 chamando direto |
| A4 | Prescrição aparece sem recarregar | teste A4 ✓; E2E `atendimento.spec.ts` ✓ |
| A5 | 403 vira aviso no lugar | teste A5 ✓; `c19-plantao.txt`: às 23h da API, POST 403, aviso e o texto fica no campo |
| A6 | Finalizar só para o autor, com confirmação | teste A6 ✓; E2E ✓ |
| A7 | Sem violação de acessibilidade | `c19-a11y.txt`: 0 nas duas rotas, nos dois temas |
| A8 | `gate:completo` verde | `c19-gate.txt`: 54 testes, 2 E2E, código 0 |

## Como revisar

1. `git log --oneline cap16..cap19`: um passo por commit.
2. `git checkout cap19-passo08 && npm test`: o vermelho que o passo 09
   resolve.
3. Subir a API `cap19` e `npm run gate:completo`. Fora das 7h às 19h
   (hora da API), a jornada E2E recebe 403: é o plantão, não defeito.

## Fora deste PR

Abrir atendimento, editar prescrição, paginação do painel.
