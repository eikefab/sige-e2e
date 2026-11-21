import { expect, test } from './support/test';
import { DATASET } from './fixtures/dataset';
import { filtersBadge, titleCount } from './support/helpers';

test.describe('BUS - Busca geral', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('BUS-01 busca um jogo e navega para o detalhe', async ({ page }) => {
    await page.getByLabel('Busca geral').fill(DATASET.marioKartWii.name);

    await page.getByRole('button', { name: new RegExp(`^${DATASET.marioKartWii.name}`) }).click();

    await expect(page).toHaveURL(`/jogo/${DATASET.marioKartWii.id}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(DATASET.marioKartWii.name);
  });

  test('BUS-02 busca uma publicadora e aplica como filtro', async ({ page }) => {
    await page.getByLabel('Busca geral').fill('Ninten');

    await page.getByRole('button', { name: /^Nintendo\s*Filtrar$/ }).click();

    await expect(filtersBadge(page).nth(1)).toHaveText('1');
    await expect(titleCount(page)).toHaveText(`${DATASET.nintendoTitles} títulos`);
  });

  test('BUS-03 mostra mensagem quando nada é encontrado', async ({ page }) => {
    await page.getByLabel('Busca geral').fill('zzzzqqq');

    await expect(page.getByText('Nada encontrado para “zzzzqqq”.')).toBeVisible();
  });

  test('BUS-04 não busca com menos de 2 caracteres', async ({ page }) => {
    const searchCalls: string[] = [];
    page.on('request', (req) => {
      const url = new URL(req.url());
      if (url.pathname === '/api/games' && url.searchParams.has('search'))
        searchCalls.push(req.url());
    });

    await page.getByLabel('Busca geral').fill('M');
    await page.waitForTimeout(600); // supera o debounce de 180 ms

    expect(searchCalls).toHaveLength(0);
    await expect(page.locator('.hud-label:text-is("Jogos")')).toHaveCount(0);
    await expect(page.getByText('Nada encontrado')).toHaveCount(0);
  });
});
