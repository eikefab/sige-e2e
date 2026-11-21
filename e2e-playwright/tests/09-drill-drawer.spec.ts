import { expect, test } from './support/test';
import { dialog, openRegionDrawer, waitForApi } from './support/helpers';

test.describe('DRL - DrillDrawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await openRegionDrawer(page, 'América do Norte');
    await expect(dialog(page).locator('tbody tr')).toHaveCount(10);
  });

  test('DRL-01 ordena pela coluna JOGO (asc → desc)', async ({ page }) => {
    const sortButton = dialog(page).getByRole('columnheader', { name: 'JOGO' }).getByRole('button');

    const nameAsc = waitForApi(page, '/games', { sortBy: 'name', order: 'asc' });
    await sortButton.click();
    await nameAsc;

    const nameDesc = waitForApi(page, '/games', { sortBy: 'name', order: 'desc' });
    await sortButton.click();
    await nameDesc;
  });

  test('DRL-02 pagina dentro do drawer', async ({ page }) => {
    const drawer = dialog(page);

    await expect(drawer.getByText('Página 1 de')).toBeVisible();
    await drawer.getByRole('button', { name: 'Próxima' }).click();
    await expect(drawer.getByText('Página 2 de')).toBeVisible();
    await expect(drawer.locator('tbody tr')).toHaveCount(10);
  });

  test('DRL-03 clicar no jogo navega para o detalhe e fecha o drawer', async ({ page }) => {
    const firstGame = dialog(page).locator('tbody tr').first().getByRole('link');
    const [href, name] = await Promise.all([firstGame.getAttribute('href'), firstGame.innerText()]);

    await firstGame.click();

    await expect(dialog(page)).toHaveCount(0);
    await expect(page).toHaveURL(href!);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(name);
  });
});
