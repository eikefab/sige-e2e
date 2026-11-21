import { expect, test } from './support/test';
import { DATASET } from './fixtures/dataset';

test.describe('DET - Detalhe do jogo', () => {
  test('DET-01 exibe a ficha completa do jogo', async ({ page }) => {
    const g = DATASET.wiiSports;
    await page.goto(`/jogo/${g.id}`);

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(g.name);
    await expect(page.getByText(g.subtitle)).toBeVisible();
    // O valor aparece 2× na página
    await expect(page.getByText('vendidas no mundo').locator('..')).toContainText(g.sales);
    await expect(page.getByText(g.metascore)).toBeVisible();
    for (const title of ['Notas', 'Vendas por região', 'Jogo vs. média do gênero']) {
      await expect(page.getByRole('heading', { level: 2, name: title })).toBeVisible();
    }
  });

  test('DET-02 alterna entre versões pelo chip de plataforma', async ({ page }) => {
    await page.goto(`/jogo/${DATASET.gtaV.ps3Id}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Grand Theft Auto V');

    await page.getByRole('link', { name: 'X360', exact: true }).click();

    await expect(page).toHaveURL(`/jogo/${DATASET.gtaV.x360Id}`);
    // A versão ativa deixa de ser link
    await expect(page.getByRole('link', { name: 'X360', exact: true })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'PS3', exact: true })).toBeVisible();
  });

  test('DET-03 volta ao catálogo', async ({ page }) => {
    await page.goto(`/jogo/${DATASET.wiiSports.id}`);

    await page.getByRole('link', { name: '← Catálogo' }).click();

    await expect(page).toHaveURL('/jogo');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Escolha um jogo');
  });
});
