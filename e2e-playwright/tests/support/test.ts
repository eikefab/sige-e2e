import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { test as base, expect, type APIRequestContext, type Browser } from '@playwright/test';

// Com EVIDENCIAS=1, cada cenário salva um screenshot em ../evidencias/playwright/<ID>.png
const EVIDENCIAS = process.env.EVIDENCIAS === '1';
const EVIDENCIAS_DIR = fileURLToPath(new URL('../../../evidencias/playwright/', import.meta.url));

let evidenciasDirReady: Promise<unknown> | undefined;
async function evidencePath(title: string) {
  await (evidenciasDirReady ??= mkdir(EVIDENCIAS_DIR, { recursive: true }));
  return `${EVIDENCIAS_DIR}${title.split(' ')[0]}.png`;
}

export const test = base.extend<{ evidencia: void }>({
  evidencia: [
    async ({ page }, use, testInfo) => {
      await use();
      if (!EVIDENCIAS) return;
      await page.screenshot({ path: await evidencePath(testInfo.title) });
    },
    { auto: true },
  ],
});

interface ApiCall {
  url: string;
  status: number;
  contentType: string;
  body: string;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!);

function renderCalls(title: string, passed: boolean, calls: ApiCall[]) {
  const blocks = calls
    .map(
      (c) => `<section>
        <h2>GET ${escapeHtml(c.url)}</h2>
        <p>Status <b class="${c.status < 400 ? 'ok' : 'err'}">${c.status}</b> · ${escapeHtml(c.contentType)}</p>
        <pre>${escapeHtml(c.body)}</pre>
      </section>`,
    )
    .join('');
  return `<html><body style="font-family:monospace;padding:16px">
    <h1>${escapeHtml(title)} - ${passed ? '✔ passou' : '✖ falhou'}</h1>
    <style>section{border:1px solid #ccc;padding:8px;margin:8px 0}pre{white-space:pre-wrap;background:#f5f5f5;padding:8px}.ok{color:green}.err{color:#b00}</style>
    ${blocks}</body></html>`;
}

/** Com EVIDENCIAS=1, registra cada chamada e salva o registro como screenshot do cenário. */
export const apiTest = base.extend<
  { api: Pick<APIRequestContext, 'get'> },
  { evidenceBrowser: () => Promise<Browser> }
>({
  // Aberto só quando há evidência a gerar, e reaproveitado por todo o worker
  evidenceBrowser: [
    async ({ playwright }, use) => {
      let browser: Browser | undefined;
      await use(async () => (browser ??= await playwright.chromium.launch()));
      await browser?.close();
    },
    { scope: 'worker' },
  ],

  api: async ({ request, evidenceBrowser }, use, testInfo) => {
    if (!EVIDENCIAS) return use(request);

    const calls: ApiCall[] = [];
    await use({
      get: async (url, options) => {
        const res = await request.get(url, options);
        calls.push({
          url: res.url(),
          status: res.status(),
          contentType: res.headers()['content-type'] ?? '',
          body: (await res.text()).slice(0, 600),
        });
        return res;
      },
    });

    const browser = await evidenceBrowser();
    const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
    await page.setContent(renderCalls(testInfo.title, testInfo.status === 'passed', calls));
    await page.screenshot({ path: await evidencePath(testInfo.title), fullPage: true });
    await page.close();
  },
});

export { expect };
