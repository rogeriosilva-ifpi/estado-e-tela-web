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
| `cap03` | lista de pacientes, `renderometro` e o erro da key por índice |

Todos os pacientes são fictícios.
