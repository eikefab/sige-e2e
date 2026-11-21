import { DATASET } from '../fixtures/dataset';
import { kpiValue } from '../support/commands';

describe('MAP - Mapa de vendas', () => {
  beforeEach(() => {
    cy.visit('/mapa');
  });

  it('MAP-01 ranqueia regiões por vendas e mostra total global', () => {
    cy.contains('h2', 'Regiões')
      .parents('section')
      .find('button')
      .should('have.length', 4)
      .each(($btn, i) => {
        expect($btn.text())
          .to.contain(`#${i + 1}`)
          .and.to.contain(DATASET.regionsBySales[i]);
      });

    kpiValue('TOTAL GLOBAL').should('contain.text', 'M un.');
    cy.get('svg[aria-label="Mapa de vendas por região"] path').should(
      'have.length.greaterThan',
      100,
    );
  });

  it('MAP-02 clique no heatmap abre DrillDrawer de gênero × região', () => {
    // Colunas do heatmap: [América do Norte, Europa, Japão, Outros]
    cy.contains('h2', 'Gêneros por região')
      .parents('section')
      .contains('tr', 'Action')
      .find('button')
      .eq(1)
      .click();

    cy.drawer().within(() => {
      cy.contains('h2', 'Action — Europa').should('be.visible');
      cy.contains('th', 'VENDAS EU').should('be.visible');
    });
  });
});
