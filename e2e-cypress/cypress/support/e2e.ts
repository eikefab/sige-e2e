import './commands';

afterEach(function () {
  if (!Cypress.expose('evidencias')) return;
  const id = this.currentTest?.title.split(' ')[0];
  cy.screenshot(`${Cypress.expose('evidenciaPrefix')}${id}`, {
    capture: 'runner',
    overwrite: true,
  });
});
