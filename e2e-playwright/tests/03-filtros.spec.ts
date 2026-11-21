import { expect, test } from './support/test';
import { DATASET } from './fixtures/dataset';
import { filtersBadge, openFilters, titleCount, toggleFilter, waitForApi } from './support/helpers';

test.describe('FIL - Filtros globais', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Garante que a contagem inicial já carregou antes de filtrar
    await expect(titleCount(page)).toHaveText(`${DATASET.totalTitlesFmt} títulos`);
  });

  test('FIL-01 filtra por publicadora e envia o parâmetro para a API', async ({ page }) => {
    const gamesNintendo = waitForApi(page, '/games', { publisher: 'Nintendo' });

    await openFilters(page);
    await toggleFilter(page, 'Publicadora', 'Nintendo');

    expect((await gamesNintendo).status()).toBe(200);
    await expect(filtersBadge(page).nth(1)).toHaveText('1');

    await page.keyboard.press('Escape');
    await expect(titleCount(page)).toHaveText(`${DATASET.nintendoTitles} títulos`);
  });

  test('FIL-02 "Limpar filtros" restaura o estado inicial', async ({ page }) => {
    await openFilters(page);
    await toggleFilter(page, 'Publicadora', 'Nintendo');
    await page.getByRole('button', { name: 'Limpar filtros (1)' }).click();

    await expect(filtersBadge(page)).toHaveCount(1); // só o texto "Filtros", sem badge
    await page.keyboard.press('Escape');
    await expect(titleCount(page)).toHaveText(`${DATASET.totalTitlesFmt} títulos`);
  });

  test('FIL-03 filtros persistem após recarregar a página', async ({ page }) => {
    await openFilters(page);
    await toggleFilter(page, 'Publicadora', 'Nintendo');
    await page.keyboard.press('Escape');
    await expect(titleCount(page)).toHaveText(`${DATASET.nintendoTitles} títulos`);

    const saved = await page.evaluate(() => sessionStorage.getItem('sige-filters'));
    expect(saved).toContain('Nintendo');

    await page.reload();

    await expect(titleCount(page)).toHaveText(`${DATASET.nintendoTitles} títulos`);
    await expect(filtersBadge(page).nth(1)).toHaveText('1');
  });

  test('FIL-04 combinação sem resultados exibe estado vazio', async ({ page }) => {
    await openFilters(page);
    await toggleFilter(page, 'Publicadora', 'Nintendo');
    await toggleFilter(page, 'ESRB', 'AO');
    await page.keyboard.press('Escape');

    await expect(page.getByText('Sem resultados')).toBeVisible();
    await expect(page.getByText('Nenhum jogo corresponde aos filtros atuais.')).toBeVisible();
  });

  test('FIL-05 ajusta o ano inicial pelo teclado no slider', async ({ page }) => {
    const [minYear, maxYear] = DATASET.yearBounds;
    const gamesByYear = waitForApi(page, '/games', {
      yearFrom: String(minYear + 5),
      yearTo: String(maxYear),
    });

    const popover = await openFilters(page);
    const yearLabel = popover.locator('.hud-label:text-is("Ano de lançamento") + span');
    const yearStartThumb = popover.locator(`[role="slider"][aria-valuemax="${maxYear}"]`).first();
    await expect(yearLabel).toHaveText(`${minYear}–${maxYear}`);

    await yearStartThumb.focus();
    for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight');

    await expect(yearStartThumb).toHaveAttribute('aria-valuenow', String(minYear + 5));
    await expect(yearLabel).toHaveText(`${minYear + 5}–${maxYear}`);
    await gamesByYear;
  });
});
