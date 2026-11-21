import { expect, test } from './support/test';
import { DATASET } from './fixtures/dataset';
import { catalogCards as cards, titleCount } from './support/helpers';

test.describe('CAT - Catálogo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/jogo');
  });

  test('CAT-01 lista 48 jogos ordenados por vendas', async ({ page }) => {
    await expect(cards(page)).toHaveCount(48);
    await expect(cards(page).first()).toContainText(DATASET.wiiSports.name);
    await expect(page.getByText(`${DATASET.totalTitlesFmt} títulos encontrados`)).toBeVisible();
  });

  test('CAT-02 filtra o catálogo por nome', async ({ page }) => {
    await page.locator('#catalog-search').fill('zelda');

    await expect(titleCount(page)).toHaveText(`${DATASET.zeldaTitles} títulos`);
    await expect(cards(page)).toHaveCount(DATASET.zeldaTitles);
    for (const text of await cards(page).allInnerTexts()) {
      expect(text.toLowerCase()).toContain('zelda');
    }
  });

  test('CAT-03 pagina entre as páginas do catálogo', async ({ page }) => {
    await expect(cards(page)).toHaveCount(48);
    // O debounce da busca faz setPage(1) 200 ms após montar a página,
    // desfazendo um clique em "Próxima" feito antes disso. Aguardamos o debounce explicitamente.
    await page.waitForTimeout(300);
    await expect(page.getByRole('button', { name: 'Anterior' })).toBeDisabled();
    await page.getByRole('button', { name: 'Próxima' }).click();

    await expect(page.getByText(`Página 2 de ${DATASET.catalogPages}`)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Anterior' })).toBeEnabled();
  });

  test('CAT-04 abre o detalhe ao clicar no card', async ({ page }) => {
    await cards(page).first().click();

    await expect(page).toHaveURL(`/jogo/${DATASET.wiiSports.id}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(DATASET.wiiSports.name);
  });
});
