import { DATASET } from '../fixtures/dataset';
import { filtersBadge } from '../support/commands';

describe('FIL - Filtros globais', () => {
  beforeEach(() => {
    cy.visit('/');
    // Garante que a contagem inicial já carregou antes de filtrar
    cy.titleCount().should('have.text', `${DATASET.totalTitlesFmt} títulos`);
  });

  it('FIL-01 filtra por publicadora e envia o parâmetro para a API', () => {
    cy.intercept({ method: 'GET', pathname: '/api/games', query: { publisher: 'Nintendo' } }).as(
      'gamesNintendo',
    );

    cy.openFilters();
    cy.toggleFilter('Publicadora', 'Nintendo');

    cy.wait('@gamesNintendo').its('response.statusCode').should('eq', 200);
    filtersBadge().eq(1).should('have.text', '1');

    cy.pressEscape();
    cy.titleCount().should('have.text', `${DATASET.nintendoTitles} títulos`);
  });

  it('FIL-02 "Limpar filtros" restaura o estado inicial', () => {
    cy.openFilters();
    cy.toggleFilter('Publicadora', 'Nintendo');
    cy.contains('button', 'Limpar filtros (1)').click();

    filtersBadge().should('have.length', 1); // só o texto "Filtros", sem badge
    cy.pressEscape();
    cy.titleCount().should('have.text', `${DATASET.totalTitlesFmt} títulos`);
  });

  it('FIL-03 filtros persistem após recarregar a página', () => {
    cy.openFilters();
    cy.toggleFilter('Publicadora', 'Nintendo');
    cy.pressEscape();
    cy.titleCount().should('have.text', `${DATASET.nintendoTitles} títulos`);

    cy.window()
      .its('sessionStorage')
      .invoke('getItem', 'sige-filters')
      .should('contain', 'Nintendo');

    cy.reload();

    cy.titleCount().should('have.text', `${DATASET.nintendoTitles} títulos`);
    filtersBadge().eq(1).should('have.text', '1');
  });

  it('FIL-04 combinação sem resultados exibe estado vazio', () => {
    cy.openFilters();
    cy.toggleFilter('Publicadora', 'Nintendo');
    cy.toggleFilter('ESRB', 'AO');
    cy.pressEscape();

    cy.contains('Sem resultados').should('be.visible');
    cy.contains('Nenhum jogo corresponde aos filtros atuais.').should('be.visible');
  });

  it('FIL-05 ajusta o ano inicial pelo teclado no slider', () => {
    const [minYear, maxYear] = DATASET.yearBounds;
    cy.intercept({
      method: 'GET',
      pathname: '/api/games',
      query: { yearFrom: String(minYear + 5), yearTo: String(maxYear) },
    }).as('gamesByYear');

    const yearLabel = () => cy.contains('.hud-label', 'Ano de lançamento').next();
    const yearStartThumb = () => cy.get(`[role="slider"][aria-valuemax="${maxYear}"]`).first();

    cy.openFilters();
    yearLabel().should('have.text', `${minYear}–${maxYear}`);

    yearStartThumb().focus().type('{rightArrow}'.repeat(5));

    yearStartThumb().should('have.attr', 'aria-valuenow', String(minYear + 5));
    yearLabel().should('have.text', `${minYear + 5}–${maxYear}`);
    cy.wait('@gamesByYear');
  });
});
