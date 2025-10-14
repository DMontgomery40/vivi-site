import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

test('AGRO GUI loads and routes API calls', async ({ page }) => {
  const site = 'https://vivified.dev/agro';
  const apiPrefix = 'https://vivified.dev/agro-api';

  const consoleErrors: string[] = [];
  const consoleAll: Array<{ type: string; text: string }> = [];
  page.on('console', (msg) => {
    const entry = { type: msg.type(), text: msg.text() };
    consoleAll.push(entry);
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // Capture network responses to /agro-api/* for reporting
  const apiResponses: Array<{ url: string; status: number; ct: string | null }> = [];
  page.on('response', async (resp) => {
    const url = resp.url();
    if (url.startsWith(`${apiPrefix}/`)) {
      apiResponses.push({ url, status: resp.status(), ct: resp.headers()['content-type'] || null });
    }
  });

  // Bypass caches using a unique query param to force fresh HTML and assets
  await page.goto(site + `?cb=${Date.now()}`, { waitUntil: 'networkidle' });

  // Check CoreUtils presence and values but do not fail early; gather evidence first
  const values = await page.evaluate(async () => {
    const CU = (window as any).CoreUtils;
    const apiBase = CU?.API_BASE || '';
    const built = CU?.api ? CU.api('/config') : '';
    return { apiBase, built };
  });

  // Persist diagnostics for review
  try {
    const outDir = path.resolve(process.cwd(), 'test-results');
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'smoke-console.json'), JSON.stringify(consoleAll, null, 2));
    fs.writeFileSync(path.join(outDir, 'smoke-api.json'), JSON.stringify(apiResponses, null, 2));
    fs.writeFileSync(path.join(outDir, 'smoke-values.json'), JSON.stringify(values, null, 2));
  } catch {}

  // No parse errors like "Unexpected token" from HTML served as JS
  expect(consoleErrors.join('\n')).not.toContain('Unexpected token');

  // Health endpoint from within the page
  const healthResp = await page.evaluate(async () => {
    const r = await fetch('/agro-api/health');
    return { ok: r.ok, ct: r.headers.get('content-type'), body: await r.text() };
  });
  expect(healthResp.ok).toBeTruthy();
  expect(String(healthResp.ct)).toContain('application/json');

  // Reload config (POST /agro-api/env/reload)
  const reload = await page.evaluate(async () => {
    const res = await fetch('/agro-api/env/reload', { method: 'POST' });
    return { ok: res.ok, ct: res.headers.get('content-type'), status: res.status };
  });
  expect(reload.ok).toBeTruthy();

  // Cards list (GET /agro-api/cards) should be JSON
  const cards = await page.evaluate(async () => {
    const res = await fetch('/agro-api/cards');
    return { ok: res.ok, ct: res.headers.get('content-type'), status: res.status };
  });
  expect(cards.ok).toBeTruthy();
  expect(String(cards.ct)).toContain('application/json');

  // Assertions and diagnostics at the end
  console.log('Console (all):', consoleAll);
  console.log('API responses seen:', apiResponses);

  // No parse errors like "Unexpected token" from HTML served as JS
  expect(consoleErrors.join('\n')).not.toContain('Unexpected token');

  // Verify CoreUtils override
  expect(values.apiBase).toBe(apiPrefix);
  expect(values.built).toBe(`${apiPrefix}/config`);
});
