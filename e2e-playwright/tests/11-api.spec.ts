import { apiTest as test, expect } from './support/test';
import { API_URL } from '../playwright.config';
import { DATASET } from './fixtures/dataset';

interface Game {
  id: number;
  name: string;
  global_sales: number;
}

test.use({ baseURL: API_URL });

test.describe('API - Testes de API (sem interface)', () => {
  test('API-01 GET /games pagina e ordena por vendas globais', async ({ api }) => {
    const res = await api.get('/games', { params: { limit: 5, page: 1 } });
    expect(res.status()).toBe(200);

    const body: { data: Game[]; total: number } = await res.json();
    expect(body.data).toHaveLength(5);
    expect(body.total).toBe(DATASET.totalTitles);

    const sales = body.data.map((g) => g.global_sales);
    expect(sales).toEqual([...sales].sort((a, b) => b - a));
  });

  test('API-02 GET /games/:id inexistente retorna 404', async ({ api }) => {
    const res = await api.get('/games/999999');

    expect(res.status()).toBe(404);
    expect((await res.json()).message).toBe('Jogo com id 999999 não encontrado');
  });

  test('API-03 parâmetros inválidos retornam 400', async ({ api }) => {
    const invalidEnum = await api.get('/dashboard/rankings/sales', { params: { by: 'xyz' } });
    expect(invalidEnum.status()).toBe(400);

    const invalidNumber = await api.get('/dashboard/overview/global-sales', {
      params: { yearFrom: 'abc' },
    });
    expect(invalidNumber.status()).toBe(400);
    expect((await invalidNumber.json()).message).toContain('yearFrom');
  });

  test('API-04 GET /games/export devolve CSV para download', async ({ api }) => {
    const res = await api.get('/games/export', { params: { publisher: 'Nintendo' } });

    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('text/csv');
    expect(res.headers()['content-disposition']).toContain('jogos-export.csv');

    const lines = (await res.text()).trim().split('\n');
    expect(lines[0]).toContain('ID,Nome,Plataforma');
    expect(lines).toHaveLength(DATASET.nintendoTitles + 1);
  });
});
