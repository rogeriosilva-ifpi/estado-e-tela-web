# Capítulo 19 · A entrega com agentes, do plano ao PR

Um prompt por passo. Todos começam com o mesmo contexto: `AGENTS.md`,
`INVARIANTES.md`, `docs/UI.md`, `docs/API.md` e `docs/PLANO-cap19.md`
(depois do passo 02). Cada passo termina num commit com o portão verde,
exceto o 08, que registra os testes vermelhos de propósito.

## 01 · Contexto (modo de plano)

```text
Goal  Descrever em docs/API.md o contrato de atendimentos e prescrições.
Context  @../api/src/atendimentos @../api/src/prescricoes @docs/API.md
Constraints  ler o código da API, não supor; não alterar a API
Done when  docs/API.md com rotas, permissões, escopo e o que só vem ao autor
```

## 02 · Plano

```text
Goal  docs/PLANO-cap19.md: escopo, fora de escopo, critérios A1..An, riscos.
Constraints  cada critério com o teste ou instrumento que o verifica;
             12 passos, um commit cada
Done when  o professor aprova o plano (nenhum código ainda)
```

## 03 · Estrutura

```text
Goal  Tipos do contrato em src/api/atendimentos.ts e a pasta da feature.
Constraints  feature não importa feature (UI-08): o que duas features
             leem sobe para src/api/
Done when  npm run fronteiras sem violação; npm run gate verde
```

## 04 · Componentes

```text
Goal  ListaAtendimentos, FichaAtendimento, FormPrescricao.
Constraints  apresentação pura (só props); formulário valida como a API
             e não limpa antes da resposta; Campo e Botao de compartilhado/
Done when  npm run gate verde
```

## 05 · Serviços

```text
Goal  src/api/atendimentos.ts (pedir) e features/atendimentos/consultas.ts.
Constraints  chaves em árvore; prescrição sem atualização otimista
Done when  npm run gate verde
```

## 06 · Rotas

```text
Goal  /atendimentos e /atendimentos/:id sob o middleware de sessão.
Constraints  loader com ensureQueryData; 404 vira mensagem (UI-18)
Done when  npm run gate verde; menu com "Atendimentos"
```

## 07 · Autenticação e autorização

```text
Goal  Prescrever para quem tem rx:create com atendimento aberto; Finalizar
      para o autor; 403 vira aviso.
Constraints  usePode, nunca papel (UI-22); 401 continua global (UI-21)
Done when  npm run gate verde
```

## 08 · Testes

```text
Goal  atendimentos.test.tsx com A1..A6, pela tela.
Constraints  apiFalsa no MSW com as regras da API (escopo, motivo do
             autor, rx:read, rx:create); nada de vi.mock (UI-24)
Done when  os testes rodam; vermelho é registrado, não escondido
```

## 09 · Depuração

```text
Goal  Explicar e corrigir os vermelhos do passo 08.
Constraints  reproduzir no navegador com a API real antes de mudar código;
             mudar uma coisa por vez
Done when  causa escrita no commit; A1..A6 verdes; npm run gate verde
```

## 10 · Revisão adversarial (contexto novo, outro fabricante)

```text
Revise o diff cap16..HEAD contra INVARIANTES.md (UI-01 a UI-26). Procure:
efeito sem limpeza, cópia de dado do servidor em estado, fetch fora de
src/api, botão escondido por papel, ação escondida que a API aceita,
vi.mock, localStorage, VITE_, dangerouslySetInnerHTML, dependência nova,
requisito mudado sem justificativa, ação irreversível sem confirmação.
Para cada achado: arquivo:linha, regra, como reproduzir, correção mínima.
Sem achado, diga "nenhum achado". Não reescreva o código.
```

Rode também `porta_dos_fundos.py` com as rotas novas.

## 11 · Aceitação

```text
Goal  e2e/atendimento.spec.ts: prescrever e finalizar com a API real.
Done when  npm run gate:completo verde; cada critério do plano com evidência
```

## 12 · Documentação

```text
Goal  INVARIANTES.md, docs/UI.md, README, IA.md e docs/PR-cap19.md.
Constraints  o PR traz a evidência de cada critério (saída real, não
             resumo); IA.md diz o que foi do agente e o que foi recusado
Done when  tag cap19; o PR se lê sem abrir o código
```

## As três ferramentas

| Passo | Claude Code 2.1.318 | Codex CLI 0.166.0 | agy |
|---|---|---|---|
| Contexto | `CLAUDE.md` importa `AGENTS.md` | `AGENTS.md` | `AGENTS.md` |
| Planejar | `claude --permission-mode plan` | `/plan` na sessão | `/plan` na sessão |
| Sem interação | `claude -p "..."` | `codex exec "..."` | não documentado |
| Revisar | `/code-review` na sessão; `/code-review ultra` (na nuvem, cobrado) | `codex review --base main` | — |

Flags conferidas com `--help` e comandos de sessão nos textos do próprio
binário, nas versões acima (5 nov. 2026); `/ultrareview` virou apelido
obsoleto de `/code-review ultra`. O agy não foi instalado: a coluna vem
da documentação.

## V.E.R.M.

- **Verifica:** cada passo terminou com o portão verde (ou o vermelho do 08
  registrado)? A revisão rodou em contexto novo?
- **Explica:** você sabe dizer por que a recepção derrubava a ficha?
- **Reduz:** algum passo trouxe código fora do plano? Volta para o plano.
- **Marca:** IA.md atualizado.
