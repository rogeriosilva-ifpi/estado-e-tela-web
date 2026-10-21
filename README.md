# estado-e-tela-web

O Mini-Prontuário em React, laboratório do ebook **Estado & Tela**.
Cada capítulo é uma tag: `git checkout cap02`, `git checkout cap03`…

## Subir

Primeiro a API, num terminal:

```bash
git clone https://github.com/rogeriosilva-ifpi/estado-e-tela-api
cd estado-e-tela-api && npm install && npm start     # :3000
```

Depois a tela, em outro:

```bash
npm install
npm run dev        # http://localhost:5173
npm run gate       # tipos, lint e build
```

## Mapa das tags

| Tag | O que tem |
|---|---|
| `cap01` | `laboratorio/cap01`: a Ala B em três versões, sem build |
| `cap02` | projeto Vite com proxy para a API, `AGENTS.md`, `INVARIANTES.md` |
| `cap03-antes` | lista com key por índice (o teste falha de propósito) |
| `cap03` | key do domínio, `Renderometro`, Vitest e Testing Library |
| `cap04-antes` | componente definido dentro de outro (as anotações somem) |
| `cap04` | composição: peças de domínio, `Painel` com children, `docs/UI.md` |
| `cap05-antes` | prioridade mutando o objeto (a tela não muda) |
| `cap05` | seleção com estado levantado, detalhe e atualização imutável |

Todos os pacientes são fictícios.

## Prompts

`prompts/capNN.md` traz, para cada capítulo, o prompt de agente do livro,
a variante C-P-T-R-F-A, a revisão adversarial e o V.E.R.M. Leia na branch
principal: as tags guardam o código de cada capítulo.
