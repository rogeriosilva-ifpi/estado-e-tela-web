# Capítulo 8 · Estrutura de projeto por funcionalidade

## Agente (o mesmo do livro)

```text
Goal
Admissão mostra "Sessão expirada" no 401; com a rede caída, só o painel avisa.

Context
@docs/UI.md @INVARIANTES.md @src/api/

Constraints
- só src/api chama fetch (UI-09)
- erro inesperado não vira lista vazia nem mensagem genérica: sobe ao limite
- não edite .dependency-cruiser.cjs nem .oxlintrc.json

Done when
- npm run gate verde
- teste novo: 401 mostra o aviso
- teste novo: fetch que rejeita mostra "algo falhou" em Admissão, e o painel
  Pacientes continua
```

## Revisão adversarial (contexto novo)

```text
Revise o diff contra INVARIANTES.md (UI-08, UI-09, UI-10) e docs/UI.md.
Procure: import entre features, componente de domínio em compartilhado/,
fetch fora de src/api, catch que devolve lista vazia ou engole o erro,
exceção nova em .dependency-cruiser.cjs, componente copiado entre features.
Para cada achado: arquivo:linha, regra, como reproduzir, correção mínima.
Sem achado, diga "nenhum achado".
```

## Chat · C-P-T-R-F-A

```text
C  React 19 + Vite. Pastas por tipo (components/, hooks/). Um erro de render
   numa tela derruba a página inteira; uma tela importa peças de outra.
P  Dev sênior de front-end.
T  Proponha a estrutura por funcionalidade e o tratamento de erros.
R  features/, compartilhado/, api/, app/; um limite de erro por área;
   regra de dependência verificável por ferramenta.
F  Árvore de pastas, a regra em dependency-cruiser e o LimiteDeErro.
A  Uma feature que lança no render não apaga as outras.
```

## V.E.R.M.

- **Verifica:** `npm run fronteiras` acusa o import cruzado do `cap08-antes`?
  O teste "sem login, avisa em vez de quebrar" falha lá e passa no `cap08`?
- **Explica:** sabe dizer por que o `.catch` não chega ao limite de erro?
- **Reduz:** o agente criou camadas que ninguém pediu (repositório, serviço,
  DTO)? A camada de HTTP é um arquivo.
- **Marca:** registre no `IA.md`.
