import { DATASET } from '../fixtures/dataset';
import { filtersBadge } from '../support/commands';

const searchInput = () => cy.get('input[aria-label="Busca geral"]');

describe('BUS - Busca geral', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('BUS-01 busca um jogo e navega para o detalhe', () => {
    searchInput().type(DATASET.marioKartWii.name);

    cy.contains('.hud-label', 'Jogos')
      .parent()
      .contains('button', DATASET.marioKartWii.name)
      .click();

    cy.location('pathname').should('eq', `/jogo/${DATASET.marioKartWii.id}`);
    cy.get('h1').should('have.text', DATASET.marioKartWii.name);
  });

  it('BUS-02 busca uma publicadora e aplica como filtro', () => {
    searchInput().type('Ninten');

    cy.contains('.hud-label', 'Publicadoras')
      .parent()
      .contains('button', /^Nintendo\s*Filtrar$/)
      .click();

    filtersBadge().eq(1).should('have.text', '1');
    cy.titleCount().should('have.text', `${DATASET.nintendoTitles} títulos`);
  });

  it('BUS-03 mostra mensagem quando nada é encontrado', () => {
    searchInput().type('zzzzqqq');

    cy.contains('Nada encontrado para “zzzzqqq”.').should('be.visible');
  });

  it('BUS-04 não busca com menos de 2 caracteres', () => {
    cy.intercept(
      { method: 'GET', pathname: '/api/games', query: { search: /.+/ } },
      cy.spy().as('searchCall'),
    );

    searchInput().type('M');
    cy.wait(600); // supera o debounce de 180 ms

    cy.get('@searchCall').should('not.have.been.called');
    cy.contains('.hud-label', 'Jogos').should('not.exist');
    cy.contains('Nada encontrado').should('not.exist');
  });
});
