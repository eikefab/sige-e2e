import { DATASET } from '../fixtures/dataset';
import { exact } from '../support/commands';

describe('DET - Detalhe do jogo', () => {
  it('DET-01 exibe a ficha completa do jogo', () => {
    const g = DATASET.wiiSports;
    cy.visit(`/jogo/${g.id}`);

    cy.get('h1').should('have.text', g.name);
    cy.contains('p', g.subtitle).should('be.visible');
    // O valor aparece 2× na página
    cy.contains('vendidas no mundo').parent().should('contain.text', g.sales);
    cy.contains(g.metascore).should('be.visible');
    ['Notas', 'Vendas por região', 'Jogo vs. média do gênero'].forEach((title) => {
      cy.contains('h2', title).should('be.visible');
    });
  });

  it('DET-02 alterna entre versões pelo chip de plataforma', () => {
    cy.visit(`/jogo/${DATASET.gtaV.ps3Id}`);
    cy.get('h1').should('have.text', 'Grand Theft Auto V');

    cy.contains('section a', 'X360').click();

    cy.location('pathname').should('eq', `/jogo/${DATASET.gtaV.x360Id}`);
    // A versão ativa deixa de ser link
    cy.contains('section a', exact('X360')).should('not.exist');
    cy.contains('section a', exact('PS3')).should('be.visible');
  });

  it('DET-03 volta ao catálogo', () => {
    cy.visit(`/jogo/${DATASET.wiiSports.id}`);

    cy.contains('a', '← Catálogo').click();

    cy.location('pathname').should('eq', '/jogo');
    cy.get('h1').should('have.text', 'Escolha um jogo');
  });
});
