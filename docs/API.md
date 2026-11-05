# Contrato da API (o que a tela usa)

Fonte: `estado-e-tela-api`, tag `cap19`. Mudou aqui, muda
`src/api/pacientes.ts` e os testes, no mesmo commit.

Todas as rotas de pacientes exigem sessão (cookie). 401 sem sessão, 403
sem permissão, 404 quando o paciente não existe, 400 com
`{ error, campos }` quando o corpo é inválido.

| Método e caminho | Corpo | Resposta |
|---|---|---|
| `POST /api/auth/login` | `{ email, senha }` | `{ usuario }` e o cookie `__Host-sessao`; 401 com credencial errada |
| `GET /api/auth/me` | — | `{ usuario: { id, nome, email, papel, permissoes } }`; 401 sem sessão |
| `POST /api/auth/logout` | — | 204; o servidor apaga a sessão |
| `GET /api/patients?q=&pagina=&porPagina=` | — | `{ itens, total, pagina, porPagina }`; `porPagina` até 50; inativos ficam de fora (`&inativos=1` inclui) |
| `GET /api/patients/:id` | — | `Paciente` |
| `POST /api/patients` | `{ nome, cns, nascimento, telefone?, responsavel? }` | 201 `Paciente`; 409 se o CNS já existe |
| `PATCH /api/patients/:id` | `{ nome?, telefone?, responsavel? }` | `Paciente`; CNS e nascimento não mudam (400) |
| `POST /api/patients/:id/inativar` | — | `Paciente` com `ativo: false`; exige `patient:deactivate` (admin e profissional; recepção recebe 403) |

`Paciente`: `{ id, nome, cns, nascimento, telefone?, responsavel?, ativo? }`.

## Atendimentos e prescrições (capítulo 19)

| Método e caminho | Corpo | Resposta |
|---|---|---|
| `GET /api/encounters` | — | `Atendimento[]` visíveis: o profissional vê os seus; quem tem `encounter:read_any` (admin, recepção) vê todos |
| `GET /api/encounters/:id` | — | `Atendimento`; 404 se não é visível |
| `PATCH /api/encounters/:id` | `{ motivo?, status? }` | `Atendimento`; só o autor (403 para os outros); campo extra é 400 |
| `GET /api/medication-requests?encounterId=` | — | `Prescricao[]` do atendimento; exige `rx:read` |
| `POST /api/encounters/:id/medication-requests` | `{ medicamento, posologia }` | 201 `Prescricao`; exige `rx:create` **e** ser o autor, atendimento aberto, de plantão; senão 403 sem motivo |

`Atendimento`: `{ id, pacienteId, profissionalId, status, motivo? }`. O
`motivo` é dado clínico: só vem para o autor. `status`: `"aberto"` ou
`"finalizado"`. `Prescricao`: `{ id, atendimentoId, profissionalId,
medicamento, posologia }`.

A permissão `rx:create` em `/api/auth/me` diz que o papel **pode**
prescrever; a API ainda confere autor, status e plantão a cada pedido.

## Cache na tela (TanStack Query)

| Chave | Quem lê | Quem invalida |
|---|---|---|
| `["sessao"]` | middleware `exigirSessao`, `useSessao`, `usePode` | login e sair limpam; 401 grava `null` |
| `["pacientes", "busca", q, pagina]` | `useBusca` | edição e inativação |
| `["atendimentos"]`, `["atendimentos", id]` | painel e ficha | finalizar |
| `["prescricoes", atendimentoId]` | ficha | prescrever |
| `["pacientes", "um", id]` | loader de `/pacientes/:id` e `DetalhePaciente` | edição (otimista) e inativação |

Invalidar `["pacientes"]` alcança as duas.
