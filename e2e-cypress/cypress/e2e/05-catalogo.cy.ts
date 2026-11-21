import { DATASET } from '../fixtures/dataset';
import { catalogCards as cards } from '../support/commands';

describe('CAT - Catálogo', () => {
  beforeEach(() => {
    cy.visit('/jogo');
  });

  it('CAT-01 lista 48 jogos ordenados por vendas', () => {
    cards().should('have.length', 48);
    cards().first().should('contain.text', DATASET.wiiSports.name);
    cy.contains(`${DATASET.totalTitlesFmt} títulos encontrados`).should('be.visible');
  });

  it('CAT-02 filtra o catálogo por nome', () => {
    cy.get('#catalog-search').type('zelda');

    cy.titleCount().should('have.text', `${DATASET.zeldaTitles} títulos`);
    cards().should('have.length', DATASET.zeldaTitles);
    cards().each(($card) => {
      expect($card.text().toLowerCase()).to.contain('zelda');
    });
  });

  it('CAT-03 pagina entre as páginas do catálogo', () => {
    cards().should('have.length', 48);
    // O debounce da busca faz setPage(1) 200 ms após montar a página,
    // desfazendo um clique em "Próxima" feito antes disso. Aguardamos o debounce explicitamente.
    cy.wait(300);
    cy.contains('button', 'Anterior').should('be.disabled');
    cy.contains('button', 'Próxima').click();

    cy.contains(`Página 2 de ${DATASET.catalogPages}`).should('be.visible');
    cy.contains('button', 'Anterior').should('be.enabled');
  });

  it('CAT-04 abre o detalhe ao clicar no card', () => {
    cards().first().click();

    cy.location('pathname').should('eq', `/jogo/${DATASET.wiiSports.id}`);
    cy.get('h1').should('have.text', DATASET.wiiSports.name);
  });
});
