import type { Locator, Page, Response } from '@playwright/test';

export const titleCount = (page: Page) => page.locator('h1 + span');

export const filtersButton = (page: Page) =>
  page.locator('header').getByRole('button', { name: /Filtros/ });

/** Spans do botão "Filtros": [texto, badge?]. */
export const filtersBadge = (page: Page) => filtersButton(page).locator('span');

export const catalogCards = (page: Page) => page.locator('main a[href^="/jogo/"]');

export const kpiValue = (page: Page, label: string) =>
  page.locator(`.hud-label:text-is("${label}") + div`);

export const dialog = (page: Page) => page.getByRole('dialog');

export async function openFilters(page: Page): Promise<Locator> {
  await filtersButton(page).click();
  const popover = dialog(page);
  await popover.waitFor();
  return popover;
}

/** Exige o popover de filtros aberto. */
export async function toggleFilter(
  page: Page,
  section: 'Publicadora' | 'Gênero' | 'Plataforma' | 'ESRB',
  value: string,
) {
  await dialog(page)
    .locator(`.hud-label:text-is("${section}")`)
    .locator('..')
    .getByRole('checkbox', { name: value, exact: true })
    .click();
}

export const panel = (page: Page, title: string | RegExp) =>
  page.locator('section').filter({ has: page.getByRole('heading', { level: 2, name: title }) });

export const openRegionDrawer = (page: Page, region: string) =>
  panel(page, 'Unidades por região')
    .getByRole('button', { name: new RegExp(region) })
    .click();

/** Deve ser chamado antes da ação que dispara a requisição. */
export function waitForApi(
  page: Page,
  pathname: string,
  query: Record<string, string> = {},
): Promise<Response> {
  return page.waitForResponse((res) => {
    const url = new URL(res.url());
    if (url.pathname !== `/api${pathname}`) return false;
    return Object.entries(query).every(([k, v]) => url.searchParams.get(k) === v);
  });
}

export const fmtUnits = (millions: number) =>
  `${millions.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} M un.`;
