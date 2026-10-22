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
