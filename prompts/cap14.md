# Capítulo 14 · Backend, HTTP e estado remoto

## Agente (o mesmo do livro, no repositório da API)

```text
Goal
Busca paginada com total, edição e inativação de paciente na API.

Context
@src/pacientes/rotas.ts @src/acesso/permissoes.ts @tests/

Constraints
- GET responde { itens, total, pagina, porPagina }; porPagina até 50
- PATCH só nome, telefone, responsável
- inativar não apaga; sai da busca
- permissão nova patient:update
- mudança de contrato: atualize todo consumidor da lista no repositório

Done when
- npm test verde, com testes novos de página, edição e inativação
```

## Agente (na tela, depois da API)

```text
Goal
Consumir a API cap14 no prontuário: páginas, edição e inativação.

Context
@docs/API.md @src/api/ @INVARIANTES.md (UI-06, UI-10, UI-19, UI-20)

Constraints
- TanStack Query; chaves em ["pacientes", ...]
- nada de copiar data para useState
- edição otimista com onError que devolve o anterior
- invalidar ["pacientes"] ao terminar cada mutação

Done when
- npm run gate verde
- testes "a lista mostra o nome editado" e "trocar de paciente troca o
  detalhe" passam
- cap14.py: 500 devolve o nome anterior com aviso
```

## Revisão adversarial (contexto novo)

```text
Revise o diff contra INVARIANTES.md (UI-19, UI-20) e o docs/API.md.
Procure: dado do servidor em useState ou contexto, useEffect que sincroniza
data com estado, chave de consulta fora da árvore ["pacientes"], invalidação
de chave errada, onMutate sem onError, retry em 4xx, componente montando URL
de API, contrato mudado sem docs/API.md. Para cada achado: arquivo:linha,
regra, sequência que reproduz, correção mínima. Sem achado, diga "nenhum
achado".
```

## Chat · C-P-T-R-F-A

```text
C  React 19, React Router 8 e TanStack Query 5. Mestre-detalhe de
   pacientes; o detalhe copia o dado do loader para useState e, ao trocar
   de paciente, edita o anterior.
P  Dev sênior de front-end.
T  Troque a cópia pelo cache do Query, com edição otimista.
R  queryOptions compartilhado entre loader e componente; ensureQueryData
   no loader; useSuspenseQuery na tela; onMutate/onError/onSettled.
F  consultas.ts, o loader e o componente, com uma frase por callback.
A  A lista reflete a edição; um 500 devolve o valor anterior.
```

## V.E.R.M.

- **Verifica:** `cap14.py` mostra a edição caindo em João e 0 buscas ao
  voltar? Os dois testes falham no `cap14-antes`?
- **Explica:** sabe dizer a diferença entre dado fresco e velho no cache?
- **Reduz:** o agente trouxe Redux, Zustand ou cache feito à mão? Fora de
  escopo.
- **Marca:** registre no `IA.md`.
