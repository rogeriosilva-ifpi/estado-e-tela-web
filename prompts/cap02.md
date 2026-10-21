# Capítulo 2 · O primeiro projeto em vinte minutos

## Agente, modo de plano (o mesmo do livro)

```text
Goal
Explicar o caminho de um clique em "Verificar API" até a resposta da API.

Context
@AGENTS.md @vite.config.ts @src/
A API roda em :3000 (outro repositório).

Constraints
- só leitura: não edite nada
- cite arquivo e linha de cada passo
- diga o que muda em produção

Done when
- cita main.tsx, App.tsx, vite.config.ts
- explica por que não há CORS no caminho
- git status continua limpo
```

Como iniciar o modo de plano: Claude Code, Shift+Tab; Codex, `/plan`;
agy, modo de plano. Confira na versão instalada.

## Chat · C-P-T-R-F-A

```text
C  Projeto Vite 8 + React 19 + TS. Colo vite.config.ts e App.tsx.
P  Dev sênior de front-end.
T  Explique o caminho de fetch("/health") até a API em :3000.
R  Não proponha mudanças; diga o que acontece em dev e em produção.
F  Lista numerada, um passo por linha, com o arquivo.
A  Fica claro por que o navegador vê uma origem só.
```

## Revisão adversarial (contexto novo)

```text
Revise as mudanças de configuração do projeto contra INVARIANTES.md.
Procure: endereço de servidor no código (UI-00), CORS liberado com "*",
dependência nova sem motivo. Para cada achado: arquivo:linha, regra,
correção mínima. Sem achado, diga "nenhum achado".
```

## V.E.R.M.

- **Verifica:** `npm run gate` passou e o botão mostra "ok"?
- **Explica:** sabe dizer quem faz o papel do proxy em produção?
- **Reduz:** o agente mexeu na API ou no Vite? Desfaça.
- **Marca:** registre no `IA.md`.
