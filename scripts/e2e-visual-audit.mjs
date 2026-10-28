// Auditoria visual de rotas do Crônicas do Conhecimento (leitura contínua, sem páginas de livro).
// Execute depois de npm run build: npm run test:visual
// Capturas e métricas são evidências de inspeção; candidatos a clipping exigem revisão humana.
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const PORT = Number(process.env.VISUAL_AUDIT_PORT || 4323);
const BASE = 'http://127.0.0.1:' + PORT;
const OUT = resolve(process.env.VISUAL_AUDIT_DIR || 'artifacts/visual-audit');
const WAIT_MS = Number(process.env.VISUAL_AUDIT_WAIT_MS || 250);

const VIEWPORTS = [
  { width: 360, height: 640, id: '360x640' },
  { width: 390, height: 844, id: '390x844' },
  { width: 1280, height: 800, id: '1280x800' },
];
const THEMES = ['light', 'dark'];
const CHAPTERS = [
  'cap.prim.01', 'cap.prim.02', 'cap.seg.01', 'cap.seg.02', 'cap.ia.01', 'cap.ia.02', 'cap.ia.03', 'cap.ia.04',
  'cap.dev.01', 'cap.dev.02', 'cap.dev.03', 'cap.dev.04', 'cap.infra.01', 'cap.infra.02', 'cap.infra.03',
  'cap.dados.01', 'cap.dados.02', 'cap.gov.01', 'cap.gov.02', 'cap.leg.01', 'cap.leg.02', 'cap.es.01', 'cap.es.02',
  'cap.devops.01', 'cap.devops.02', 'cap.ingles.01', 'cap.ingles.02', 'cap.port.01', 'cap.port.02',
  'cap.inst.01', 'cap.inst.02', 'cap.mat.01', 'cap.mat.02',
];
const FULL_ROUTES = [
  '/', '/trilha', '/explorar', '/biblioteca', '/estudos', '/revisar', '/progresso', '/edital',
  '/conta', '/conta/acesso', '/conta/sincronizacao', '/conta/aparencia', '/conta/sons', '/conta/dados', '/conta/sobre', '/conta/tela',
  '/personalizar', '/plano', '/treino', '/simulado', '/discursiva', '/flashcards', '/relampago', '/historico', '/revisao',
  '/materia/grim.primeiros', '/aprender/cap.prim.01/computador/prim.computador.1',
  '/pratica/cap.prim.01/computador', '/licao/prim.computador.1', '/sala', '/sala?aula=prim.computador.1',
  '/escritorio', '/simulador', '/simulador/suporte-lento', '/aula-narrada/narrada.prim.historia',
  '/video/yt-YJyY6A_MOQc', '/download',
  '/conta/dados?qa=1',
  ...CHAPTERS.map((id) => '/capitulo/' + id),
];

const ROUTES = process.env.VISUAL_AUDIT_PROFILE === 'smoke'
  ? [
      '/',
      '/trilha',
      '/explorar',
      '/conta/aparencia',
      '/personalizar',
      '/revisar',
      '/progresso',
      '/simulado',
      '/download',
      '/aprender/cap.prim.01/computador/prim.computador.1',
      '/aula-narrada/narrada.prim.historia',
      '/capitulo/cap.prim.01',
      '/capitulo/cap.dev.01',
    ]
  : FULL_ROUTES;

const slug = (s) => s.replace(/[^a-zA-Z0-9-]+/g, '-').replace(/^-|-$/g, '').slice(0, 110) || 'home';
const failures = [];
const reports = [];
let server;

function killServer(proc) {
  if (!proc || !proc.pid) return;
  try { process.kill(-proc.pid, 'SIGTERM'); } catch { try { proc.kill('SIGTERM'); } catch {} }
}

async function startServer() {
  const proc = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], {
    stdio: 'ignore',
    detached: process.platform !== 'win32',
  });
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return proc;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  killServer(proc);
  throw new Error('vite preview não respondeu em ' + BASE);
}

/**
 * React.lazy chunks are requested after the shell mounts. Wait for the accessible
 * fallback to disappear before measuring or capturing a route.
 */
async function waitForDeferredRoute(page) {
  // The shell mounts before React.lazy resolves. Wait for the fallback to vanish,
  // then allow one short paint window for the routed component to commit. Some
  // full-screen routes render through portals outside <main>.
  await page.waitForFunction(() => {
    return !Array.from(document.querySelectorAll('[role="status"]'))
      .some((element) => element.textContent?.includes('Carregando esta área'));
  }, undefined, { timeout: 15000 });
  await page.waitForTimeout(100);
}

async function inspect(page, where) {
  return page.evaluate(() => {
    const root = document.documentElement;
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const candidates = [];
    const selector = '.leaf-body, .book-page, [data-testid], [class*="overflow-hidden"], [class*="overflow-clip"]';
    for (const el of document.querySelectorAll(selector)) {
      if (!(el instanceof HTMLElement)) continue;
      const style = getComputedStyle(el);
      const clipped = /hidden|clip/.test(style.overflowY) && el.scrollHeight > el.clientHeight + 4;
      if (!clipped || el.clientHeight < 12) continue;
      const meaningful = el.innerText?.trim().length > 0 || !!el.querySelector('button, a, input, select, textarea');
      if (!meaningful) continue;
      candidates.push({
        tag: el.tagName.toLowerCase(),
        className: String(el.className || '').slice(0, 100),
        testId: el.dataset.testid || '',
        clientHeight: el.clientHeight,
        scrollHeight: el.scrollHeight,
        scrollExcess: el.scrollHeight - el.clientHeight,
        text: (el.innerText || '').replace(/\s+/g, ' ').slice(0, 160),
      });
      if (candidates.length >= 40) break;
    }
    const fixedActions = [];
    for (const el of document.querySelectorAll('button, a, input[type="submit"]')) {
      const style = getComputedStyle(el);
      if (style.position !== 'fixed' || style.display === 'none' || style.visibility === 'hidden') continue;
      const rect = el.getBoundingClientRect();
      if (rect.width && (rect.top < -2 || rect.bottom > viewport.height + 2)) {
        fixedActions.push({
          text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 90),
          top: Math.round(rect.top), bottom: Math.round(rect.bottom),
          viewportHeight: viewport.height,
        });
      }
    }
    return {
      url: location.pathname + location.search + location.hash,
      title: document.title,
      viewport,
      document: { width: root.scrollWidth, height: Math.max(root.scrollHeight, document.body.scrollHeight) },
      horizontalOverflow: root.scrollWidth > viewport.width + 1,
      mainCount: document.querySelectorAll('main').length,
      clippingCandidates: candidates,
      fixedActionsOutsideViewport: fixedActions,
    };
  });
}

async function run() {
  await mkdir(OUT, { recursive: true });
  server = await startServer();
  const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  try {
    for (const vp of VIEWPORTS) {
      for (const theme of THEMES) {
        const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, colorScheme: theme });
        await context.addInitScript((mode) => {
          try { localStorage.setItem('cronicas:prefs:v4', JSON.stringify({ fontScale: 1, theme: mode })); } catch {}
        }, theme);
        const page = await context.newPage();
        page.setDefaultTimeout(10000);
        const jsErrors = [];
        page.on('pageerror', (e) => jsErrors.push(String(e)));
        for (const route of ROUTES) {
          const name = slug(route);
          const tag = vp.id + '-' + theme + '-' + name;
          jsErrors.length = 0; // cada rota recebe apenas seus próprios erros
          try {
            await page.goto(BASE + route, { waitUntil: 'load', timeout: 20000 });
            await waitForDeferredRoute(page);
            await page.waitForTimeout(WAIT_MS);
            const report = await inspect(page, tag);
            report.route = route;
            report.viewportId = vp.id;
            report.theme = theme;
            report.jsErrors = [...jsErrors];
            reports.push(report);

            await page.screenshot({ path: resolve(OUT, tag + '--viewport.png') });
            if (report.document.height > vp.height + 4) {
              await page.screenshot({ path: resolve(OUT, tag + '--full.png'), fullPage: true });
              await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
              await page.waitForTimeout(80);
              await page.screenshot({ path: resolve(OUT, tag + '--bottom.png') });
              await page.evaluate(() => window.scrollTo(0, 0));
            }
            if (report.horizontalOverflow) failures.push(tag + ': rolagem horizontal (' + report.document.width + 'px para viewport ' + vp.width + 'px)');
            if (report.mainCount === 0) failures.push(tag + ': elemento <main> ausente; verificar rota, shell ou erro de renderização');
            if (jsErrors.length) failures.push(tag + ': erro JavaScript: ' + jsErrors.join(' | '));
            if (report.fixedActionsOutsideViewport.length) failures.push(tag + ': botão/link fixo fora da viewport: ' + JSON.stringify(report.fixedActionsOutsideViewport));
            if (report.clippingCandidates.length) {
              console.log('REVISAR CLIPPING ' + tag + ': ' + report.clippingCandidates.length + ' candidato(s)');
            }
            console.log('OK ' + tag + (report.clippingCandidates.length ? ' (candidatos a clipping: ' + report.clippingCandidates.length + ')' : ''));
            jsErrors.length = 0;
          } catch (e) {
            failures.push(tag + ': falha ao abrir/inspecionar: ' + String(e));
            reports.push({ route, viewportId: vp.id, theme, error: String(e) });
          }
        }
        await context.close();
      }
    }
  } finally {
    await browser.close();
    killServer(server);
  }
  await writeFile(resolve(OUT, 'report.json'), JSON.stringify({ generatedAt: new Date().toISOString(), routeCount: ROUTES.length, combinations: reports.length, failures, reports }, null, 2));
  const candidates = reports.reduce((n, r) => n + (r.clippingCandidates || []).length, 0);
  const md = [
    '# Relatório da auditoria visual',
    '',
    '- Gerado em: ' + new Date().toISOString(),
    '- Rotas declaradas: ' + ROUTES.length,
    '- Viewports: ' + VIEWPORTS.map((v) => v.id).join(', '),
    '- Temas: ' + THEMES.join(', '),
    '- Combinações registradas: ' + reports.length,
    '- Falhas bloqueantes: ' + failures.length,
    '- Candidatos de clipping para inspeção humana: ' + candidates,
    '',
    '## Falhas bloqueantes',
    ...(failures.length ? failures.map((f) => '- ' + f) : ['- Nenhuma detectada automaticamente.']),
    '',
    '## Revisão humana obrigatória',
    'Abra as capturas --viewport, --full e --bottom. Candidatos de clipping são heurísticos: confirme visualmente se há texto, imagem ou controle cortado. Não considere a auditoria aprovada apenas porque este script terminou sem falhas.',
    '',
    'A verificação do modo imersivo e das barras do sistema deve ocorrer no APK, em Android físico; o navegador desktop não prova esse comportamento.',
  ].join('\n');
  await writeFile(resolve(OUT, 'report.md'), md + '\n');
  if (failures.length) {
    console.error('Auditoria visual: ' + failures.length + ' falha(s) bloqueante(s). Veja ' + OUT + '/report.md');
    process.exitCode = 1;
  } else {
    console.log('Auditoria automática finalizada sem falhas bloqueantes; revise as capturas e candidatos a clipping em ' + OUT);
  }
}
run().catch((e) => {
  console.error(e);
  killServer(server);
  process.exitCode = 1;
});
