import { expect, test }
  from "@playwright/test";

// Uma pessoa, o caminho inteiro, a API real:
// entrar, buscar, paginar, editar, conferir
// no servidor e sair.
test("recepção busca, pagina, edita e sai",
  async ({ page }) => {
    await page.goto("/pacientes?q=a");
    await page.getByLabel("E-mail")
      .fill("carla@hospital.dev");
    await page.getByLabel("Senha")
      .fill("rede-na-varanda-de-tarde");
    await page.getByRole("button",
      { name: "Entrar" }).click();

    const achados = page.getByRole("list",
      { name: "Resultados" })
      .getByRole("link");
    await expect(achados).toHaveCount(5);
    await page.getByRole("button",
      { name: "Próxima" }).click();
    await expect(achados).toHaveCount(1);

    await achados.first().click();
    const ficha = page.getByRole("article",
      { name: "Paciente aberto" });
    await ficha.getByLabel("Telefone")
      .fill("86999990000");
    await ficha.getByRole("button",
      { name: "Salvar" }).click();
    // recarregar: o valor vem do servidor
    await page.reload();
    await expect(ficha.getByLabel("Telefone"))
      .toHaveValue("86999990000");

    await page.getByRole("button",
      { name: "Sair" }).click();
    await expect(page.getByLabel("E-mail"))
      .toBeVisible();
  });
