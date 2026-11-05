# Revisão da entrega · capítulo 19

Diff revisado: `cap16..passo 09`. Checklist adversarial de
`prompts/cap19.md` (passo 10), mais os instrumentos.

| Pergunta | Resultado |
|---|---|
| Efeito sem limpeza, estado derivado guardado, cópia de dado do servidor em `useState` | nenhum: a feature não tem `useEffect`; dados só pelo cache |
| `fetch` fora de `src/api` | nenhum |
| Botão escondido por nome de papel | nenhum: `usePode("rx:create")`, `usePode("rx:read")` e autoria pela sessão |
| Ação escondida aceita pela API | nenhuma: `porta_dos_fundos.py` dá 403 em Prescrever e Finalizar para a recepção |
| `vi.mock`, `localStorage`, `dangerouslySetInnerHTML`, `VITE_` | nenhum |
| Dependência nova | `@vitejs/plugin-basic-ssl` (só desenvolvimento): o WebKit recusa cookie `Secure` em `http://localhost`; alternativa seria afrouxar o cookie da API em desenvolvimento, recusada |
| Mudança de requisito sem justificativa | nenhuma; o plano não mudou |
| Ação irreversível sem confirmação | **achado**: "Finalizar atendimento" encerrava com um clique. Corrigido: `Modal` de confirmação, como em Inativar |

Recomendação para a próxima entrega: rodar a mesma revisão com um agente
de outro fabricante (`codex review --base main` com o texto do passo 10).
