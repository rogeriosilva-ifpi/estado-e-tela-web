# Capítulo 6 · Estado, formulários e interações

## Agente (o mesmo do livro)

```text
Goal
Formulário de novo atendimento (POST /api/encounters) que nunca cria dois.

Context
@src/features/admissao/ @INVARIANTES.md

Constraints
- useActionState + trava com useRef (UI-04); disabled não é trava
- estados num tipo só, como Resultado
- 400 no campo; 403 e 409 em role=alert
- não altere a API

Done when
- npm run gate verde
- teste: servidor lento, dois cliques, um fetch; falha sem o ref
- teste: 403 mostra a mensagem do papel
```

## Revisão adversarial (contexto novo)

```text
Revise o diff de src/features/ contra INVARIANTES.md. Procure: envio que
pode sair duas vezes (só disabled, sem trava síncrona), validação só no
cliente, erro do servidor engolido numa mensagem genérica, estado guardado
que poderia ser derivado, booleanos de estado que podem se contradizer.
Para cada achado: arquivo:linha, regra, como reproduzir na tela, correção
mínima. Sem achado, diga "nenhum achado".
```

## Chat · C-P-T-R-F-A

```text
C  React 19, formulário de admissão com <form action> e useActionState
   (colo o componente). Na rede lenta, dois cliques criam dois pacientes.
P  Dev sênior de React.
T  Explique por que disabled={pendente} não impede o segundo envio e
   proponha a trava.
R  Sem biblioteca; a trava não pode depender de render.
F  Duas frases de causa e o trecho corrigido.
A  Dois cliques no mesmo instante geram um fetch.
```

## V.E.R.M.

- **Verifica:** rodou `medicoes/cap06.py` (navegador real) e não só o Vitest?
- **Explica:** sabe dizer por que o jsdom não mostrou a corrida?
- **Reduz:** o agente trouxe biblioteca de formulário para isso? Desnecessário.
- **Marca:** registre no `IA.md`.
