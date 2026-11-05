# Uso de IA neste projeto

Registro do que foi feito com agente, como foi verificado e o que foi
recusado. Uma entrada por tarefa, a mais nova no topo.

## 2026-11-05 · capítulo 19: atendimentos e prescrição

- **Data e ferramenta:** Claude Code 2.1.318 com Claude Opus 5.5, um
  passo por sessão, prompts em `prompts/cap19.md`.
- **Tarefa:** painel de atendimentos e ficha com prescrição, do plano
  (`docs/PLANO-cap19.md`) ao PR (`docs/PR-cap19.md`), em 12 commits.
- **Verificação:** `npm run gate:completo` verde (54 testes, 2 jornadas
  E2E com a API às 12h dela); `porta_dos_fundos.py`: 403 em Prescrever
  e Finalizar para a recepção; axe sem violação nas duas rotas novas.
- **Recusado ou corrigido:** no passo 08 os testes A2 e A3 ficaram
  vermelhos de propósito, e o passo 09 achou a causa: o loader pedia
  prescrições para quem não tem `rx:read` (a recepção via "Algo falhou").
  Na revisão (passo 10), "Finalizar" encerrava sem confirmação: entrou o
  `Modal`. Recusada a sugestão de afrouxar o cookie da API para o WebKit
  em `http`; entrou `npm run dev:https`.
- **Limite:** a revisão usou o mesmo modelo que escreveu o código, em
  contexto novo. Na próxima entrega, revisar com outro fabricante.

## Modelo de entrada

- **Data e ferramenta:** (Claude Code, Codex ou agy, com a versão)
- **Tarefa:** o Goal do prompt
- **Verificação:** comandos rodados e resultado (`npm run gate`, testes)
- **Recusado ou corrigido:** o que o agente propôs e não entrou, e por quê
