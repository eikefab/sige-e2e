import { DATASET } from '../fixtures/dataset';

const api = Cypress.expose('apiUrl') as string;

interface Game {
  id: number;
  name: string;
  global_sales: number;
}

describe('API - Testes de API (sem interface)', () => {
  it('API-01 GET /games pagina e ordena por vendas globais', () => {
    cy.request<{ data: Game[]; total: number }>(`${api}/games?limit=5&page=1`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data).to.have.length(5);
      expect(res.body.total).to.eq(DATASET.totalTitles);

      const sales = res.body.data.map((g) => g.global_sales);
      expect(sales).to.deep.eq([...sales].sort((a, b) => b - a));
    });
  });

  it('API-02 GET /games/:id inexistente retorna 404', () => {
    cy.request({ url: `${api}/games/999999`, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body.message).to.eq('Jogo com id 999999 não encontrado');
    });
  });

  it('API-03 parâmetros inválidos retornam 400', () => {
    cy.request({ url: `${api}/dashboard/rankings/sales?by=xyz`, failOnStatusCode: false })
      .its('status')
      .should('eq', 400);

    cy.request({
      url: `${api}/dashboard/overview/global-sales?yearFrom=abc`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.contain('yearFrom');
    });
  });

  it('API-04 GET /games/export devolve CSV para download', () => {
    cy.request<string>(`${api}/games/export?publisher=Nintendo`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.headers['content-type']).to.contain('text/csv');
      expect(res.headers['content-disposition']).to.contain('jogos-export.csv');

      const lines = res.body.trim().split('\n');
      expect(lines[0]).to.contain('ID,Nome,Plataforma');
      expect(lines).to.have.length(DATASET.nintendoTitles + 1);
    });
  });
});
