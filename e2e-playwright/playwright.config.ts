import { defineConfig, devices } from '@playwright/test';

export const API_URL = process.env.API_URL ?? 'http://localhost:3000';

const viewport = { width: 1600, height: 1000 };
const apiSpec = /api\.spec\.ts/;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // a aplicação é somente leitura, então os testes podem rodar em paralelo
  retries: 0, // sem retries: comparação justa com o Cypress
  expect: { timeout: 10_000 },
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:5173',
    locale: 'pt-BR',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport } },
    // Exigem `npx playwright install --with-deps firefox webkit`
    { name: 'firefox', use: { ...devices['Desktop Firefox'], viewport }, testIgnore: apiSpec },
    { name: 'webkit', use: { ...devices['Desktop Safari'], viewport }, testIgnore: apiSpec },
  ],
});
