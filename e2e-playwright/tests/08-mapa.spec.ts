import { expect, test } from './support/test';
import { DATASET } from './fixtures/dataset';
import { dialog, kpiValue, panel } from './support/helpers';

test.describe('MAP - Mapa de vendas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/mapa');
  });

  test('MAP-01 ranqueia regiões por vendas e mostra total global', async ({ page }) => {
    const regionButtons = panel(page, 'Regiões').getByRole('button');

    await expect(regionButtons).toHaveCount(4);
    await expect(regionButtons).toHaveText(
      DATASET.regionsBySales.map((name, i) => new RegExp(`#${i + 1}\\s*${name}`)),
    );

    await expect(kpiValue(page, 'TOTAL GLOBAL')).toContainText('M un.');
    const mapPaths = page.getByRole('img', { name: 'Mapa de vendas por região' }).locator('path');
    expect(await mapPaths.count()).toBeGreaterThan(100);
  });

  test('MAP-02 clique no heatmap abre DrillDrawer de gênero × região', async ({ page }) => {
    // Colunas do heatmap: [América do Norte, Europa, Japão, Outros]
    await panel(page, /Gêneros por região/)
      .getByRole('row')
      .filter({ hasText: 'Action' })
      .getByRole('button')
      .nth(1)
      .click();

    const drawer = dialog(page);
    await expect(drawer.getByRole('heading', { name: 'Action — Europa' })).toBeVisible();
    await expect(drawer.getByRole('columnheader', { name: 'VENDAS EU' })).toBeVisible();
  });
});
