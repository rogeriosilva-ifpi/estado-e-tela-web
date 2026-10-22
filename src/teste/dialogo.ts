// O jsdom 29 não implementa showModal()
// nem close(). Simulação mínima para os
// testes de unidade; foco, Esc e fundo
// inerte de verdade são medidos no Chromium.
const D = HTMLDialogElement.prototype;
type Dialogo = HTMLDialogElement;
D.showModal ??= function (this: Dialogo) {
  this.open = true;
};
D.close ??= function (this: Dialogo) {
  this.open = false;
  this.dispatchEvent(new Event("close"));
};
