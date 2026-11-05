# Plano · atendimentos e prescrição (capítulo 19)

## Escopo

1. **Painel do profissional** (`/atendimentos`): os atendimentos que a
   pessoa vê, com status e motivo quando ela é a autora.
2. **Ficha do atendimento** (`/atendimentos/:id`): paciente, motivo,
   status, prescrições; formulário de prescrição para quem tem
   `rx:create`; "Finalizar" para o autor.

Fora de escopo: abrir atendimento, editar prescrição, paginação do
painel, mudar a API.

## Critérios de aceitação

| # | Critério | Como se verifica |
|---|---|---|
| A1 | O painel lista os atendimentos visíveis, com link para a ficha | `rotas.test.tsx` |
| A2 | Quem não é autor vê o atendimento sem o motivo, com aviso | `rotas.test.tsx` |
| A3 | Prescrever aparece só com `rx:create` e atendimento aberto | `rotas.test.tsx`; `porta_dos_fundos.py` |
| A4 | Prescrição criada aparece na ficha sem recarregar | `rotas.test.tsx`; E2E |
| A5 | 403 da API na prescrição vira aviso no lugar | `rotas.test.tsx` |
| A6 | "Finalizar" só para o autor; finalizado não aceita prescrição | `rotas.test.tsx` |
| A7 | Sem violação séria de acessibilidade nas rotas novas | `vigia_a11y.py` |
| A8 | `npm run gate:completo` verde | terminal |

## Passos (um commit cada, portão verde entre eles)

01 contexto · 02 plano · 03 estrutura · 04 componentes · 05 serviços ·
06 rotas · 07 autenticação · 08 testes · 09 depuração · 10 revisão ·
11 aceitação · 12 documentação

## Riscos

- O plantão depende do relógio da API: fora dele, até a autora recebe
  403. A tela não sabe o motivo (a API não conta), só que foi recusado.
- `motivo` não vem para quem não é autor: o tipo é opcional.
