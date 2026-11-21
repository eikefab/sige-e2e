import { expect, test } from './support/test';
import { dialog, fmtUnits, kpiValue, openRegionDrawer, waitForApi } from './support/helpers';

test.describe('OVR - Visão Geral', () => {
  test('OVR-01 KPIs exibem exatamente o que a API respondeu', async ({ page }) => {
    // Registrado antes do goto para não perder as respostas
    const globalSalesRes = waitForApi(page, '/dashboard/overview/global-sales');
    const topGenreRes = waitForApi(page, '/dashboard/overview/top-genres');

    await page.goto('/');

    const { global_sales: total } = await (await globalSalesRes).json();
    await expect(kpiValue(page, 'UNIDADES GLOBAIS')).toHaveText(fmtUnits(total));

    const topGenre = await (await topGenreRes).json();
    const genreCard = kpiValue(page, 'GÊNERO LÍDER').locator('..');
    await expect(genreCard).toContainText(topGenre.genre_name);
    await expect(genreCard).toContainText(fmtUnits(topGenre.global_sales));
  });

  test('OVR-02 clique em região abre o DrillDrawer e Esc fecha', async ({ page }) => {
    await page.goto('/');

    await openRegionDrawer(page, 'América do Norte');

    const drawer = dialog(page);
    await expect(drawer.getByRole('heading', { name: 'Vendas — América do Norte' })).toBeVisible();
    await expect(drawer.getByRole('columnheader', { name: 'VENDAS NA' })).toBeVisible();
    await expect(drawer.locator('tbody tr')).toHaveCount(10);

    await page.keyboard.press('Escape');
    await expect(drawer).toHaveCount(0);
  });
});
