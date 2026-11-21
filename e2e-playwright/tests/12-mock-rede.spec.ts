import { fileURLToPath } from 'node:url';
import { expect, test } from './support/test';
import { catalogCards, titleCount } from './support/helpers';

const gamesMock = fileURLToPath(new URL('./fixtures/games-mock.json', import.meta.url));

test.describe('MCK - Mock de rede', () => {
  test('MCK-01 exibe banner quando a API falha', async ({ page }) => {
    await page.route('**/api/publishers', (route) =>
      route.fulfill({ status: 500, json: { message: 'Erro simulado' } }),
    );

    await page.goto('/');

    const banner = page.getByText('Não foi possível carregar dados da API');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('Erro 500');
  });

  test('MCK-02 renderiza o catálogo com dados simulados (fixture)', async ({ page }) => {
    await page.route('**/api/games?*', (route) => route.fulfill({ path: gamesMock }));

    await page.goto('/jogo');

    await expect(catalogCards(page)).toHaveCount(2);
    await expect(page.getByText('Jogo Fictício QDSW')).toBeVisible();
    await expect(page.getByText('Cypress vs Playwright: O Jogo')).toBeVisible();
    await expect(titleCount(page)).toHaveText('2 títulos');
  });
});
