// Verificação de layout no navegador (regra de testes de layout, ver docs/TESTING.md).
// Sobe o build (vite preview), abre as telas no Chromium em tamanhos de celular e confere:
//  1. nenhuma página rola para os lados;
//  2. todo overlay de tela cheia (position: fixed cobrindo a tela) ocupa a tela inteira;
//  3. o cartão de certo ou errado das atividades vai de borda a borda e encosta na base;
//  4. os modais (Entender, Sumário) cobrem a tela inteira;
// tudo também com o estilo de cartões "vidro" (backdrop-filter), que já prendeu overlays antes.
// Uso: npm run build && npm run test:e2e
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const PORT = 4321;
const BASE = `http://localhost:${PORT}`;
const VIEWPORTS = [
  { width: 360, height: 640 },
  { width: 390, height: 844 },
];
const PAGES = [
  // Fluxos principais e leitura do conteúdo.
  '/',
  '/trilha',
  '/explorar',
  '/biblioteca',
  '/grimorio/grim.primeiros',
  '/capitulo/cap.prim.01',
  '/aprender/cap.prim.01/computador/prim.computador.1',
  '/pratica/cap.prim.01/computador',
  '/revisar',
  '/historico',
  '/progresso',
  '/edital',
  '/plano',
  '/simulado',
  '/discursiva',
  '/flashcards?capitulo=cap.prim.01',
  '/relampago',

  // Configurações e mídia: inclui as rotas que carregam seus módulos sob demanda.
  '/conta',
  '/conta/acesso',
  '/conta/sincronizacao',
  '/conta/aparencia',
  '/conta/sons',
  '/conta/dados',
  '/conta/sobre',
  '/conta/tela',
  '/video/yt-YJyY6A_MOQc',
  '/download',
  '/personalizar',

  // Telas mais pesadas com importação dinâmica.
  '/sala',
  '/sala?aula=prim.computador.1',
  '/missao/missao.sql.01',
  '/simulador',
  '/escritorio',
  '/aula-narrada/narrada.prim.historia',

];
const LESSON = '/aprender/cap.prim.01/computador/prim.computador.1';
const GUIDE_LESSON = '/aprender/cap.infra.03/arquivos';
const TOL = 1.5;

const failures = [];
const fail = (msg) => failures.push(msg);

function stopServer(proc) {
  try {
    process.kill(-proc.pid, 'SIGTERM');
  } catch {
    /* já encerrado */
  }
}

async function startServer() {
  // detached: o servidor ganha um grupo de processos próprio, encerrado inteiro no fim (o npx deixaria
  // o vite vivo e o processo não terminaria).
  const proc = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore', detached: true });
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(BASE);
      if (r.ok) return proc;
    } catch {
      /* ainda subindo */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  stopServer(proc);
  throw new Error('vite preview não respondeu');
}

// Confere todos os elementos fixed visíveis que tentam cobrir a tela (inset 0).
async function checkFullScreenOverlays(page, where) {
  const bad = await page.evaluate((tol) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.position !== 'fixed' || cs.display === 'none' || cs.visibility === 'hidden') continue;
      if (!(cs.top === '0px' && cs.left === '0px' && cs.right === '0px' && cs.bottom === '0px')) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (Math.abs(r.left) > tol || Math.abs(r.top) > tol || Math.abs(r.width - vw) > tol || Math.abs(r.height - vh) > tol) {
        out.push(`${el.className.toString().slice(0, 60)} => ${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}x${Math.round(r.height)} (tela ${vw}x${vh})`);
      }
    }
    return out;
  }, TOL);
  for (const b of bad) fail(`${where}: overlay fixo não cobre a tela: ${b}`);
}

/**
 * Waits for React.lazy routes to resolve instead of guessing with a long fixed delay.
 * The fallback is visually hidden for accessibility, so this does not change screenshots.
 */
async function waitForDeferredRoute(page) {
  await page.locator('main').first().waitFor({ state: 'attached', timeout: 15000 });
  const loading = page.locator('[role="status"]').filter({ hasText: 'Carregando esta área' });
  if (await loading.count()) {
    await loading.first().waitFor({ state: 'detached', timeout: 15000 });
  }
}

async function checkNoHorizontalScroll(page, where) {
  const { sw, vw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, vw: window.innerWidth }));
  if (sw > vw + 1) fail(`${where}: rolagem horizontal (${sw}px > ${vw}px)`);
}

async function checkNarratedSceneWidth(page, where) {
  const scene = page.locator('[data-testid="narrada-cena-cinematica"]').first();
  const box = await scene.boundingBox();
  const vw = await page.evaluate(() => window.innerWidth);
  if (!box) {
    fail(`${where}: cena cinematográfica da aula narrada não está visível`);
    return;
  }
  // A cena pode sangrar 1 px para cada lado para evitar hairlines de arredondamento,
  // mas nunca pode deixar uma faixa do viewport sem o fundo da cena.
  if (box.x > TOL || box.x + box.width < vw - TOL) {
    fail(`${where}: cena narrada deixa uma faixa lateral (x=${box.x.toFixed(2)}, direita=${(box.x + box.width).toFixed(2)}, viewport=${vw}px)`);
  }
}

async function setLook(page, cards) {
  await page.evaluate((c) => {
    if (c) document.documentElement.setAttribute('data-cards', c);
    else document.documentElement.removeAttribute('data-cards');
  }, cards);
}

async function run() {
  const server = await startServer();
  const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  try {
    for (const vp of VIEWPORTS) {
      for (const cards of [null, 'vidro']) {
        const tag = `${vp.width}x${vp.height}${cards ? ' vidro' : ''}`;
        const page = await browser.newPage({ viewport: vp });
        page.setDefaultTimeout(10000);
        console.log(`Conferindo ${tag}...`);
        const go = async (path) => {
          await page.goto(BASE + path, { waitUntil: 'load', timeout: 20000 });
          await waitForDeferredRoute(page);
          await setLook(page, cards);
          await page.waitForTimeout(250); // termina as animações de entrada sem esconder falhas de carga
        };

        for (const path of PAGES) {
          await go(path);
          await checkNoHorizontalScroll(page, `${tag} ${path}`);
          await checkFullScreenOverlays(page, `${tag} ${path}`);
          if (path.startsWith('/aula-narrada/')) await checkNarratedSceneWidth(page, `${tag} ${path}`);
        }

        // Cartão de certo ou errado.
        await go(LESSON);
        const options = page.locator('main button:not([disabled])').filter({ hasNotText: /Verificar|Entender|^$/ });
        if ((await options.count()) === 0) fail(`${tag}: sem alternativas em ${LESSON}`);
        else {
          await options.last().click();
          await page.locator('main button', { hasText: 'Verificar' }).click();
          await page.waitForTimeout(600);
          const sheet = page.locator('[role=status]').filter({ hasText: /Correto|Ainda não/ }).last();
          const r = await sheet.boundingBox();
          if (!r) fail(`${tag}: cartão de correção não apareceu`);
          else {
            if (Math.abs(r.x) > TOL || Math.abs(r.width - vp.width) > TOL) fail(`${tag}: cartão de correção não vai de borda a borda (x=${r.x}, largura ${r.width} de ${vp.width})`);
            if (Math.abs(r.y + r.height - vp.height) > TOL) fail(`${tag}: cartão de correção não encosta na base (fim em ${Math.round(r.y + r.height)} de ${vp.height})`);
            const btn = await sheet.locator('button', { hasText: 'Continuar' }).boundingBox();
            if (!btn || btn.y + btn.height > vp.height + TOL) fail(`${tag}: botão Continuar do cartão cortado ou ausente`);
          }
        }

        // Modal "Entender" da barra de etapas.
        await go(GUIDE_LESSON);
        const entender = page.getByRole('button', { name: 'Entender' });
        if (await entender.count()) {
          await entender.first().click();
          await page.waitForTimeout(500);
          if ((await page.getByRole('dialog').count()) === 0) fail(`${tag}: modal Entender não abriu`);
          await checkFullScreenOverlays(page, `${tag} modal Entender`);
        } else fail(`${tag}: botão Entender não encontrado em ${GUIDE_LESSON}`);

        // Sumário do livro.
        await go('/capitulo/cap.prim.01');
        const sumario = page.getByRole('button', { name: 'Sumário' });
        if (await sumario.count()) {
          await sumario.first().click();
          await page.waitForTimeout(500);
          await checkFullScreenOverlays(page, `${tag} sumário do livro`);
        } else fail(`${tag}: botão Sumário não encontrado`);

        await page.close();
      }
    }
  } finally {
    await browser.close();
    stopServer(server);
  }
  if (failures.length) {
    console.error(`Layout: ${failures.length} problema(s)`);
    for (const f of failures) console.error(' - ' + f);
    process.exit(1);
  }
  console.log('Layout: tudo certo (overlays, cartão de correção, modais e rolagem lateral).');
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
