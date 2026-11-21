import { expect, test } from './support/test';
import { DATASET } from './fixtures/dataset';
import { dialog, panel, waitForApi } from './support/helpers';

test.describe('RNK - Rankings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/rankings');
  });

  test('RNK-01 alterna dimensão e Top N', async ({ page }) => {
    const rankingGenreTop5 = waitForApi(page, '/dashboard/rankings/sales', {
      by: 'genre',
      limit: '5',
    });

    await page.getByRole('button', { name: 'Gênero', exact: true }).click();
    await page.getByRole('button', { name: 'Top 5', exact: true }).click();

    await rankingGenreTop5;
    await expect(page.getByRole('heading', { name: 'Gênero por unidades vendidas' })).toBeVisible();
  });

  test('RNK-02 tabela de publicadoras abre o DrillDrawer', async ({ page }) => {
    const rows = panel(page, 'Publicadoras').locator('tbody tr');

    await expect(rows).toHaveCount(8);
    await expect(rows.first()).toContainText(DATASET.topPublisher);
    await rows.first().click();

    await expect(
      dialog(page).getByRole('heading', { name: `Publicadora — ${DATASET.topPublisher}` }),
    ).toBeVisible();
  });
});
