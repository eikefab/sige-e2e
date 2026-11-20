import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'cypress';

// Com EVIDENCIAS=1, cada cenário salva um screenshot em ../evidencias/cypress/<ID>.png
const EVIDENCIA_PREFIX = 'evidencia-';
const EVIDENCIAS_DIR = path.resolve('..', 'evidencias', 'cypress');

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL ?? 'http://localhost:5173',
    viewportWidth: 1600,
    viewportHeight: 1000,
    defaultCommandTimeout: 10000,
    retries: 0,
    // Cypress 16: valores públicos lidos no teste com Cypress.expose('chave')
    expose: {
      apiUrl: process.env.API_URL ?? 'http://localhost:3000',
      evidencias: process.env.EVIDENCIAS === '1',
      evidenciaPrefix: EVIDENCIA_PREFIX,
    },
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'electron') {
          launchOptions.preferences.width = 1920;
          launchOptions.preferences.height = 1080;
        } else if (browser.family === 'chromium') {
          launchOptions.args.push('--window-size=1920,1080');
        }
        return launchOptions;
      });

      if (process.env.EVIDENCIAS !== '1') return;
      fs.mkdirSync(EVIDENCIAS_DIR, { recursive: true });
      on('after:screenshot', (details) => {
        if (!details.name?.startsWith(EVIDENCIA_PREFIX)) return;
        const id = details.name.slice(EVIDENCIA_PREFIX.length);
        const dest = path.join(EVIDENCIAS_DIR, `${id}.png`);
        fs.renameSync(details.path, dest);
        return { path: dest };
      });
    },
  },
});
