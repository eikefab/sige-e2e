import { kpiValue, openRegionDrawer } from '../support/commands';

const fmtUnits = (millions: number) =>
  `${millions.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} M un.`;

describe('OVR - Visão Geral', () => {
  it('OVR-01 KPIs exibem exatamente o que a API respondeu', () => {
    cy.intercept('GET', '/api/dashboard/overview/global-sales*').as('globalSales');
    cy.intercept('GET', '/api/dashboard/overview/top-genres*').as('topGenre');

    cy.visit('/');

    cy.wait('@globalSales')
      .its('response.body.global_sales')
      .then((total: number) => {
        kpiValue('UNIDADES GLOBAIS').should('have.text', fmtUnits(total));
      });

    cy.wait('@topGenre')
      .its('response.body')
      .then((body: { genre_name: string; global_sales: number }) => {
        cy.contains('.hud-label', 'GÊNERO LÍDER')
          .parent()
          .should('contain.text', body.genre_name)
          .and('contain.text', fmtUnits(body.global_sales));
      });
  });

  it('OVR-02 clique em região abre o DrillDrawer e Esc fecha', () => {
    cy.visit('/');

    openRegionDrawer('América do Norte');

    cy.drawer().within(() => {
      cy.contains('h2', 'Vendas — América do Norte').should('be.visible');
      cy.contains('th', 'VENDAS NA').should('be.visible');
      cy.get('tbody tr').should('have.length', 10);
    });

    cy.pressEscape();
    cy.get('[role="dialog"]').should('not.exist');
  });
});
