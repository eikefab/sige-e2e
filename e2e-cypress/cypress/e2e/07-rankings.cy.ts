import { exact } from '../support/commands';
import { DATASET } from '../fixtures/dataset';

describe('RNK - Rankings', () => {
  beforeEach(() => {
    cy.visit('/rankings');
  });

  it('RNK-01 alterna dimensão e Top N', () => {
    cy.intercept({
      method: 'GET',
      pathname: '/api/dashboard/rankings/sales',
      query: { by: 'genre', limit: '5' },
    }).as('rankingGenreTop5');

    cy.contains('button', exact('Gênero')).click();
    cy.contains('button', exact('Top 5')).click();

    cy.wait('@rankingGenreTop5');
    cy.contains('h2', 'Gênero por unidades vendidas').should('be.visible');
  });

  it('RNK-02 tabela de publicadoras abre o DrillDrawer', () => {
    cy.contains('h2', 'Publicadoras')
      .parents('section')
      .find('tbody tr')
      .should('have.length', 8)
      .first()
      .should('contain.text', DATASET.topPublisher)
      .click();

    cy.drawer().contains('h2', `Publicadora — ${DATASET.topPublisher}`).should('be.visible');
  });
});
