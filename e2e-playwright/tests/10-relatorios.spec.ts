import { readFile } from 'node:fs/promises';
import { expect, test } from './support/test';
import { waitForApi } from './support/helpers';

test.describe('REL - Relatórios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/relatorios');
    await expect(page.getByText(/JOGOS \(\d+ DE/)).toBeVisible(); // pré-visualização carregada
  });

  test('REL-01 título é atualizado ao vivo na pré-visualização', async ({ page }) => {
    const preview = waitForApi(page, '/dashboard/reports/preview', { title: 'Relatório QDSW' });

    await page.getByLabel('TÍTULO').fill('Relatório QDSW');

    await preview;
    await expect(
      page.getByRole('heading', { level: 2, name: 'Relatório QDSW', exact: true }),
    ).toBeVisible();
  });

  test('REL-02 liga e desliga seções do relatório', async ({ page }) => {
    await expect(page.getByText('TOP 5 GÊNEROS')).toHaveCount(0);

    await page.getByRole('checkbox', { name: 'Top gêneros' }).click();
    await expect(page.getByText('TOP 5 GÊNEROS')).toBeVisible();

    const gamesTable = page.getByRole('checkbox', { name: 'Tabela de jogos' });
    await gamesTable.click();
    await expect(gamesTable).not.toBeChecked();
    await expect(page.getByText(/JOGOS \(\d+ DE/)).toHaveCount(0);
  });

  test('REL-03 exporta o relatório em CSV', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'CSV', exact: true }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe('relatorio-vendas.csv');
    const content = await readFile(await download.path(), 'utf-8');
    expect(content).toContain('ID,Nome,Plataforma,Ano');
  });

  test('REL-04 exporta o relatório em PDF', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'PDF', exact: true }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe('relatorio-vendas.pdf');
    const content = await readFile(await download.path());
    expect(content.subarray(0, 4).toString()).toBe('%PDF');
  });
});
