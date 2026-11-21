import { exact } from '../support/commands';

const downloads = Cypress.config('downloadsFolder');

describe('REL - Relatórios', () => {
  beforeEach(() => {
    cy.visit('/relatorios');
    cy.contains(/JOGOS \(\d+ DE/).should('be.visible'); // pré-visualização carregada
  });

  it('REL-01 título é atualizado ao vivo na pré-visualização', () => {
    cy.intercept({
      method: 'GET',
      pathname: '/api/dashboard/reports/preview',
      query: { title: 'Relatório QDSW' },
    }).as('preview');

    cy.get('#report-title').clear().type('Relatório QDSW');

    cy.wait('@preview');
    cy.contains('h2', exact('Relatório QDSW')).should('be.visible');
  });

  it('REL-02 liga e desliga seções do relatório', () => {
    cy.contains('TOP 5 GÊNEROS').should('not.exist');

    cy.contains('label', 'Top gêneros').click();
    cy.contains('TOP 5 GÊNEROS').should('be.visible');

    cy.contains('label', 'Tabela de jogos').click();
    cy.contains('label', 'Tabela de jogos')
      .find('[role="checkbox"]')
      .should('have.attr', 'data-state', 'unchecked');
    cy.contains(/JOGOS \(\d+ DE/).should('not.exist');
  });

  it('REL-03 exporta o relatório em CSV', () => {
    cy.contains('button', exact('CSV')).click();

    cy.readFile(`${downloads}/relatorio-vendas.csv`).should('contain', 'ID,Nome,Plataforma,Ano');
  });

  it('REL-04 exporta o relatório em PDF', () => {
    cy.contains('button', exact('PDF')).click();

    cy.readFile(`${downloads}/relatorio-vendas.pdf`, 'binary').should((content: string) => {
      expect(content.slice(0, 4)).to.eq('%PDF');
    });
  });
});
