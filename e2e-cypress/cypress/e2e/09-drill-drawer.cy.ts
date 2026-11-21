import { openRegionDrawer } from '../support/commands';

describe('DRL - DrillDrawer', () => {
  beforeEach(() => {
    cy.visit('/');
    openRegionDrawer('América do Norte');
    cy.drawer().find('tbody tr').should('have.length', 10);
  });

  it('DRL-01 ordena pela coluna JOGO (asc → desc)', () => {
    cy.intercept({
      method: 'GET',
      pathname: '/api/games',
      query: { sortBy: 'name', order: 'asc' },
    }).as('nameAsc');
    cy.intercept({
      method: 'GET',
      pathname: '/api/games',
      query: { sortBy: 'name', order: 'desc' },
    }).as('nameDesc');

    cy.drawer().contains('th button', 'JOGO').click();
    cy.wait('@nameAsc');

    cy.drawer().contains('th button', 'JOGO').click();
    cy.wait('@nameDesc');
  });

  it('DRL-02 pagina dentro do drawer', () => {
    cy.drawer().within(() => {
      cy.contains('Página 1 de').should('be.visible');
      cy.contains('button', 'Próxima').click();
      cy.contains('Página 2 de').should('be.visible');
      cy.get('tbody tr').should('have.length', 10);
    });
  });

  it('DRL-03 clicar no jogo navega para o detalhe e fecha o drawer', () => {
    cy.drawer()
      .find('tbody tr')
      .first()
      .find('a')
      .then(($a) => {
        const href = $a.attr('href')!;
        const name = $a.text();

        cy.wrap($a).click();

        cy.get('[role="dialog"]').should('not.exist');
        cy.location('pathname').should('eq', href);
        cy.get('h1').should('have.text', name);
      });
  });
});
