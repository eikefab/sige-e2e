import { expect, test } from './support/test';
import { DATASET } from './fixtures/dataset';
import { kpiValue, titleCount } from './support/helpers';

test.describe('NAV - Navegação', () => {
  test('NAV-01 carrega a Visão Geral com KPIs e contador de títulos', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Visão Geral');
    await expect(page.locator('.hud-label', { hasText: 'UNIDADES GLOBAIS' })).toBeVisible();
    await expect(kpiValue(page, 'GÊNERO LÍDER')).toHaveText(DATASET.topGenre);
    await expect(titleCount(page)).toHaveText(`${DATASET.totalTitlesFmt} títulos`);
  });

  test('NAV-02 navega por todas as páginas pelo menu', async ({ page }) => {
    const pages = [
      { link: 'Mapa de Vendas', path: '/mapa', h1: 'Mapa de Vendas Global' },
      { link: 'Rankings', path: '/rankings', h1: 'Rankings' },
      { link: 'Jogo', path: '/jogo', h1: 'Escolha um jogo' },
      { link: 'Relatórios', path: '/relatorios', h1: 'Relatórios' },
      { link: 'Visão Geral', path: '/', h1: 'Visão Geral' },
    ];

    await page.goto('/');
    const nav = page.locator('header nav');

    for (const { link, path, h1 } of pages) {
      await test.step(`menu → ${link}`, async () => {
        const navLink = nav.getByRole('link', { name: link, exact: true });
        await navLink.click();
        await expect(page).toHaveURL(path);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(h1);
        await expect(navLink).toHaveAttribute('data-status', 'active');
      });
    }
  });

  test('NAV-03 exibe "Jogo não encontrado" para id inexistente', async ({ page }) => {
    await page.goto('/jogo/999999');

    await expect(page.getByText('Jogo não encontrado')).toBeVisible();
    await page.getByRole('link', { name: '← Catálogo' }).click();
    await expect(page).toHaveURL('/jogo');
  });
});
