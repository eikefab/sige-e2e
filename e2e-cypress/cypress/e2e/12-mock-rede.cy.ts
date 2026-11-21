import { catalogCards } from '../support/commands';

describe('MCK - Mock de rede', () => {
  it('MCK-01 exibe banner quando a API falha', () => {
    cy.intercept(
      { method: 'GET', pathname: '/api/publishers' },
      { statusCode: 500, body: { message: 'Erro simulado' } },
    );

    cy.visit('/');

    cy.contains('Não foi possível carregar dados da API')
      .should('be.visible')
      .and('contain.text', 'Erro 500');
  });

  it('MCK-02 renderiza o catálogo com dados simulados (fixture)', () => {
    cy.intercept({ method: 'GET', pathname: '/api/games' }, { fixture: 'games-mock.json' }).as(
      'games',
    );

    cy.visit('/jogo');
    cy.wait('@games');

    catalogCards().should('have.length', 2);
    cy.contains('Jogo Fictício QDSW').should('be.visible');
    cy.contains('Cypress vs Playwright: O Jogo').should('be.visible');
    cy.titleCount().should('have.text', '2 títulos');
  });
});
