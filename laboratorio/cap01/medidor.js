// Conta o que muda no DOM dentro de um alvo:
// elementos que entram, que saem, e trocas
// de texto ou de atributo. Atributo só conta
// se o valor final for diferente do inicial.
const conta = (nos) => [...nos]
  .filter((n) => n.nodeType === 1)
  .reduce((t, n) => t + 1
    + n.querySelectorAll("*").length, 0);
// textContent troca um nó de texto por outro
const soTexto = (r) => r.addedNodes.length > 0
  && [...r.addedNodes, ...r.removedNodes]
    .every((n) => n.nodeType === 3);

export function medir(alvo, painel) {
  const m = { entram: 0, saem: 0, trocas: 0 };
  window.medidas = m;
  new MutationObserver((lista) => {
    const antes = new Map();
    for (const r of lista) {
      m.entram += conta(r.addedNodes);
      m.saem += conta(r.removedNodes);
      const t = r.type;
      if (t === "characterData") m.trocas++;
      if (t === "childList" && soTexto(r)) {
        m.trocas++;
      }
      if (t !== "attributes") continue;
      const chave = r.target;
      if (!antes.has(chave)) {
        antes.set(chave, new Map());
      }
      const at = antes.get(chave);
      if (!at.has(r.attributeName)) {
        at.set(r.attributeName, r.oldValue);
      }
    }
    for (const [no, at] of antes) {
      for (const [nome, velho] of at) {
        if (no.getAttribute(nome) !== velho) {
          m.trocas++;
        }
      }
    }
    painel.textContent = `DOM: +${m.entram}`
      + ` −${m.saem} ~${m.trocas}`;
  }).observe(alvo, {
    childList: true, subtree: true,
    characterData: true, attributes: true,
    attributeOldValue: true,
  });
}
