# Mini-Prontuário · front-end

Cliente React do Mini-Prontuário,
laboratório do ebook *Estado & Tela*.

## Comandos

- `npm run dev`: tela em localhost:5173
- `npm run gate`: tipos, lint, fronteiras,
  testes e build; precisa passar antes
  de toda entrega
- `npm run fronteiras`: quem importa quem
- A API roda à parte (`estado-e-tela-api`,
  `npm start`, porta 3000)

## Como o projeto funciona

- React 19, Vite 8 e TypeScript.
- O Vite repassa `/api` e `/health` para
  a API. O código chama caminhos relativos
  (`/api/...`), nunca `localhost:3000`.
- A sessão é um cookie HttpOnly da API.
  O front não lê, não guarda e não repassa
  credencial nenhuma.

## Regras

- Leia `INVARIANTES.md` e `docs/UI.md`
  antes de editar.
  Regra violada é defeito.
- Dependência nova só com pedido: diga
  o motivo e a alternativa.
- Uma mudança pequena e verificável por
  vez; `npm run gate` no fim.
- Fora de escopo, sempre: mudar a API e
  mudar a configuração do Vite.
