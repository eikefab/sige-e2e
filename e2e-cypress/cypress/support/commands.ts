/// <reference types="cypress" />

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Regex de texto exato - `cy.contains` por padrão faz correspondência parcial. */
export const exact = (text: string) => new RegExp(`^\\s*${escapeRegex(text)}\\s*$`);

/** Spans do botão "Filtros": [texto, badge?]. */
export const filtersBadge = () => cy.contains('header button', 'Filtros').find('span');

export const catalogCards = () => cy.get('main a[href^="/jogo/"]');

export const kpiValue = (label: string) => cy.contains('.hud-label', label).next();

export const openRegionDrawer = (region: string) =>
  cy.contains('h2', 'Unidades por região').parents('section').contains('button', region).click();

declare global {
  namespace Cypress {
    interface Chainable {
      openFilters(): Chainable<JQuery<HTMLElement>>;
      /** Exige o popover de filtros aberto. */
      toggleFilter(
        section: 'Publicadora' | 'Gênero' | 'Plataforma' | 'ESRB',
        value: string,
      ): Chainable<void>;
      pressEscape(): Chainable<void>;
      drawer(): Chainable<JQuery<HTMLElement>>;
      titleCount(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('openFilters', () => {
  cy.contains('header button', 'Filtros').click();
  return cy.get('[role="dialog"]').should('be.visible');
});

Cypress.Commands.add('toggleFilter', (section, value) => {
  cy.get('[role="dialog"]')
    .contains('.hud-label', exact(section))
    .parent()
    .contains('label', exact(value))
    .click();
});

Cypress.Commands.add('pressEscape', () => {
  cy.get('body').type('{esc}');
});

Cypress.Commands.add('drawer', () => {
  return cy.get('[role="dialog"]').should('be.visible');
});

Cypress.Commands.add('titleCount', () => {
  return cy.get('h1').next('span');
});
