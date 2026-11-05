# Capítulo 15 · Autenticação, sessão e autorização na interface

## Agente (no repositório da API)

```text
Goal
Inativar paciente passa a ser só de admin e profissional.

Context
@src/acesso/permissoes.ts @src/pacientes/rotas.ts @docs/PERMISSOES.md

Constraints
- permissão nova patient:deactivate; a rota de inativar passa a exigi-la
- /api/auth/me devolve também as permissões do papel
- PERMISSOES.md e matriz.http no mesmo commit

Done when
- npm test verde, com teste novo: recepção chamando direto recebe 403
```

## Agente (na tela)

```text
Goal
Sessão vinda do servidor: rotas protegidas, 401 leva ao login e volta,
sair esquece tudo, Inativar só para quem pode.

Context
@docs/API.md @docs/UI.md @INVARIANTES.md (UI-19, UI-21, UI-22)

Constraints
- quem entrou mora no cache ["sessao"], lido de /api/auth/me
- nada em localStorage ou sessionStorage
- middleware do React Router nas rotas protegidas
- botão escondido por permissão, nunca por papel
- 403 avisa no lugar; só 401 leva ao login

Done when
- npm run gate verde
- rotas.test.tsx: sem sessão não pede o paciente; sessão que cai volta ao
  paciente depois do login; 403 avisa; sair esquece o cache
- porta_dos_fundos.py: cada ação escondida responde 403
```

## Revisão adversarial (contexto novo)

```text
Revise o diff contra INVARIANTES.md (UI-21 a UI-23). Procure: sessão,
token ou papel no localStorage; guarda em componente que deixa o loader
rodar antes; botão escondido por nome de papel; 403 tratado como 401;
sair sem limpar o cache; segredo em VITE_; dangerouslySetInnerHTML. Para
cada achado: arquivo:linha, regra, sequência que reproduz, correção
mínima. Sem achado, diga "nenhum achado".
```

## Chat · C-P-T-R-F-A

```text
C  React 19, React Router 8, TanStack Query 5. A API usa sessão em cookie
   HttpOnly e tem /api/auth/me. A tela guarda o usuário no localStorage
   e protege rotas com um componente.
P  Dev sênior de front-end com noção de segurança.
T  Troque por sessão vinda do servidor, middleware e tratamento de 401.
R  queryOptions da sessão; middleware antes dos loaders; 401 global no
   QueryCache e no MutationCache; permissões de /api/auth/me.
F  Os arquivos mudados, com uma frase por decisão.
A  Recarregar depois de a sessão cair leva ao login; a recepção não vê
   Inativar e recebe 403 se tentar.
```

## V.E.R.M.

- **Verifica:** `cap15.py` mostra o login depois da sessão encerrada no
  servidor? `porta_dos_fundos.py` dá 403 em toda ação escondida?
- **Explica:** sabe dizer por que esconder o botão não protege nada?
- **Reduz:** o agente trouxe biblioteca de autenticação ou JWT no
  navegador? Fora de escopo.
- **Marca:** registre no `IA.md`.
