# Padrão de interface

O agente lê este arquivo antes de criar ou mudar uma tela.

## Onde cada coisa mora

```
src/
  main.tsx        só monta o App
  app/            composição da tela inteira
  api/            cliente.ts: a única porta para a rede
  compartilhado/  peças sem domínio (Painel, Campo, ...)
  features/
    acesso/       login
    admissao/     formulário e action
    pacientes/    a Ala
    prontuario/   busca no servidor
  lab/            instrumentos do livro, fora do produto
```

- Uma pasta por funcionalidade, com tudo dela dentro: componentes,
  hooks, tipos, testes.
- Uma feature não importa outra. Se duas precisam da mesma peça, ela
  sobe para `compartilhado/` sem nada de domínio.
- Quem fala com a API é `api/cliente.ts`. A feature chama `pedir()` e
  trata `ErroHttp` pelo status.

## Estilo

- `src/estilo/tokens.css` define cor, espaço e raio, com
  `light-dark(claro, escuro)`. `src/estilo/base.css` estiliza os
  elementos nativos (`button`, `input`, `:focus-visible`) uma vez.
- Componente com estilo próprio tem `Nome.module.css` ao lado e usa só
  tokens. Cor nova? Crie o token com os dois temas e acrescente o par
  em `tokens.test.ts`.
- Nunca `outline: none` sem substituto. A cor reforça; o texto informa.

## Catálogo (`src/compartilhado/`)

Antes de criar um componente, procure aqui. Peça nova entra no
catálogo só no terceiro uso real.

| Peça | Para quê | Regras |
|---|---|---|
| `Botao` | toda ação clicável | `variante`: `primaria` (uma por área), `secundaria`, `perigo` (ação sem volta), `texto` (nome clicável). `type="submit"` só em formulário. |
| `Campo` | rótulo + entrada + erro | erro ligado por `aria-describedby` |
| `Aviso` | mensagem ao usuário | `tom="erro"` interrompe o leitor de tela; `tom="info"` espera |
| `Modal` | caixa sobre a tela | controlado por `aberto`; `onFechar` também vem do Esc; Cancelar primeiro |
| `Painel` | moldura com título | já contém `LimiteDeErro` |
| `BarraBusca` | campo de busca | `rotulo` sempre explícito |

`<button>` e `<dialog>` crus são erro de lint fora do catálogo.

## Rotas

- As rotas moram em `src/app/rotas.tsx` (React Router 8, modo de dados).
  Página nova = rota nova com `handle: { titulo }`; o `Layout` põe o
  título no painel.
- O que cabe num link vai na URL: `?q=`, `?pagina=`, `/pacientes/:id`.
  Campo que escreve na URL usa `setSearchParams(..., { replace: true,
  flushSync: true })`.
- Dado que a página precisa para existir vem do `loader` da rota.
- Rota pesada que pouca gente abre usa `lazy` com `import()` de caminho
  literal (o Vite só divide o código com string literal).

## Sessão e permissão

- Quem entrou vem de `/api/auth/me` e mora no cache (`["sessao"]`).
  Leia com `useSessao()`; nunca guarde no navegador.
- Rota que exige login fica sob a rota sem caminho com
  `middleware: [exigirSessao]` e `handle: { protegida: true }`.
- Botão que um papel não pode usar: `usePode("permissao")`, nunca
  `papel === "..."`. Esconder é cortesia; a API recusa com 403.
- 401 leva ao login com `?volta=`; 403 avisa no lugar.

## Estado compartilhado

- Primeiro tente composição (passar `children`) e props. Contexto é para
  o que muitas features leem: hoje, só as preferências de exibição
  (`compartilhado/exibicao/`).
- Um contexto por assunto (`DiscretoContext`, `TemaContext`) e um para
  as ações (`AcoesContext`, valor estável). Quem lê o tema não renderiza
  quando o modo discreto muda.
- Todo nome de paciente na tela passa por `useExibirNome()`.
- Dado do servidor não vai para contexto nem para `useState`: mora no
  cache do TanStack Query (`features/*/consultas.ts`, chaves em
  `docs/API.md`).
- Vários `useState` que mudam juntos, ou regras do tipo "nesta fase isto
  não vale", pedem `useReducer`: estado em união discriminada por fase,
  ações em união por `tipo`, reducer puro testado sem tela
  (`features/admissao/assistente.ts`). Um campo isolado continua
  `useState`.

## Componentes

- Um componente por arquivo, nome em PascalCase igual ao do arquivo.
- Nome de domínio (`CartaoPaciente`, `ResumoAla`), nunca genérico
  (`Card2`, `Item`), exceto em `src/compartilhado/`.
- Componente nunca é definido dentro de outro componente.
- Props tipadas numa `interface Props` no mesmo arquivo.
- Eventos para cima com props `onAlgo` (`onAlta`, `onMudar`).

## Quem faz o quê

- **Coordena** (ex.: `Ala`): guarda estado, calcula derivados e compõe.
- **Apresenta** (ex.: `CartaoPaciente`): recebe props e mostra; não
  busca dados nem guarda estado de domínio.
- **Moldura** (ex.: `Painel`): recebe `children`; não conhece o conteúdo.

## Quando extrair um componente

- Um trecho com nome próprio na conversa do usuário ("o resumo").
- Um trecho repetido pela terceira vez. Na segunda, copie e espere.
- Nunca para "deixar genérico" antes de existir o segundo uso real.
