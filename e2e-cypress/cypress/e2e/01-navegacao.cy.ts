import { exact, kpiValue } from '../support/commands';
import { DATASET } from '../fixtures/dataset';

describe('NAV - Navegação', () => {
  it('NAV-01 carrega a Visão Geral com KPIs e contador de títulos', () => {
    cy.visit('/');

    cy.get('h1').should('have.text', 'Visão Geral');
    cy.contains('.hud-label', 'UNIDADES GLOBAIS').should('be.visible');
    kpiValue('GÊNERO LÍDER').should('have.text', DATASET.topGenre);
    cy.titleCount().should('have.text', `${DATASET.totalTitlesFmt} títulos`);
  });

  it('NAV-02 navega por todas as páginas pelo menu', () => {
    const pages = [
      { link: 'Mapa de Vendas', path: '/mapa', h1: 'Mapa de Vendas Global' },
      { link: 'Rankings', path: '/rankings', h1: 'Rankings' },
      { link: 'Jogo', path: '/jogo', h1: 'Escolha um jogo' },
      { link: 'Relatórios', path: '/relatorios', h1: 'Relatórios' },
      { link: 'Visão Geral', path: '/', h1: 'Visão Geral' },
    ];

    cy.visit('/');

    pages.forEach(({ link, path, h1 }) => {
      cy.contains('header nav a', exact(link)).click();
      cy.location('pathname').should('eq', path);
      cy.get('h1').should('have.text', h1);
      cy.contains('header nav a', exact(link)).should('have.attr', 'data-status', 'active');
    });
  });

  it('NAV-03 exibe "Jogo não encontrado" para id inexistente', () => {
    cy.visit('/jogo/999999');

    cy.contains('Jogo não encontrado').should('be.visible');
    cy.contains('a', '← Catálogo').click();
    cy.location('pathname').should('eq', '/jogo');
  });
});
