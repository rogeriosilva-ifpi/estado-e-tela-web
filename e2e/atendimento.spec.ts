import { expect, test }
  from "@playwright/test";

// A entrega do capítulo 19, de ponta a ponta,
// com a API real. A API decide o plantão
// pelo relógio dela: a Dra. Ana atende das
// 7h às 19h (medicoes/cap19.py sobe a API
// num fuso em que é dia).
test("profissional prescreve e finaliza",
  async ({ page }) => {
    await page.goto("/atendimentos");
    await page.getByLabel("E-mail")
      .fill("ana@hospital.dev");
    await page.getByLabel("Senha")
      .fill("cajueiro-em-flor-no-quintal");
    await page.getByRole("button",
      { name: "Entrar" }).click();

    await page.getByRole("list",
      { name: "Atendimentos" })
      .getByRole("link",
        { name: "Maria Souza" }).click();
    const ficha = page.getByRole("article",
      { name: "Atendimento" });
    await expect(
      ficha.getByText("Dor torácica"))
      .toBeVisible();

    const form = ficha.getByRole("form",
      { name: "Nova prescrição" });
    await form.getByLabel("Medicamento")
      .fill("Omeprazol 20 mg");
    await form.getByLabel("Posologia")
      .fill("1x ao dia, em jejum");
    await form.getByRole("button",
      { name: "Prescrever" }).click();
    await expect(ficha.getByRole("list",
      { name: "Prescrições" }))
      .toContainText("Omeprazol 20 mg");

    await ficha.getByRole("button",
      { name: "Finalizar atendimento" })
      .click();
    await page.getByRole("button",
      { name: "Confirmar" }).click();
    await expect(ficha.getByText(
      "Finalizado", { exact: true }))
      .toBeVisible();
    await expect(form).toHaveCount(0);
  });
