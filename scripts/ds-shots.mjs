import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 3199;
const BASE_URL = `http://localhost:${PORT}`;
const OUT_DIR = path.join(process.cwd(), 'public', 'design-system', 'templates');

const TARGETS = [
  { name: 'home', route: '/' },
  { name: 'archive', route: '/archive' },
  { name: 'detail', route: '/structures/trellick-tower' },
  { name: 'anatomy', route: '/anatomy' },
];

async function isServerReady(url) {
  try {
    const res = await fetch(url);
    return res.ok;
  } catch {
    return false;
  }
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isServerReady(url)) return true;
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Timed out waiting for server at ${url}`);
}

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    const localAppData = process.env.LOCALAPPDATA;
    if (localAppData) {
      const npxDir = path.join(localAppData, 'npm-cache', '_npx');
      if (fs.existsSync(npxDir)) {
        for (const entry of fs.readdirSync(npxDir)) {
          const candidate = path.join(npxDir, entry, 'node_modules', 'playwright', 'index.mjs');
          if (fs.existsSync(candidate)) {
            const { pathToFileURL } = await import('node:url');
            return await import(pathToFileURL(candidate).href);
          }
        }
      }
    }
    throw new Error('Playwright not found');
  }
}

async function main() {
  let chromium;
  try {
    ({ chromium } = await loadPlaywright());
  } catch {
    console.error(
      'Playwright is not installed. Install it with `npm i -D playwright` and `npx playwright install chromium`.'
    );
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let serverProc = null;
  const alreadyRunning = await isServerReady(BASE_URL);

  if (!alreadyRunning) {
    console.log(`Starting Next.js production server on ${BASE_URL}...`);
    serverProc = spawn(
      process.execPath,
      [
        path.join(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next'),
        'start',
        '-p',
        String(PORT),
      ],
      {
        stdio: 'ignore',
        detached: false,
      }
    );
    await waitForServer(BASE_URL);
  }

async function launchBrowser(chromium) {
  try {
    return await chromium.launch();
  } catch (err) {
    const localAppData = process.env.LOCALAPPDATA;
    if (localAppData) {
      const msDir = path.join(localAppData, 'ms-playwright');
      if (fs.existsSync(msDir)) {
        const dirs = fs.readdirSync(msDir).filter((d) => d.startsWith('chromium_headless_shell-'));
        for (const dir of dirs.sort().reverse()) {
          const exe = path.join(msDir, dir, 'chrome-headless-shell-win64', 'chrome-headless-shell.exe');
          if (fs.existsSync(exe)) {
            return await chromium.launch({ executablePath: exe });
          }
        }
      }
    }
    throw err;
  }
}

  let browser = null;
  try {
    browser = await launchBrowser(chromium);
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const target of TARGETS) {
      const targetUrl = `${BASE_URL}${target.route}`;
      console.log(`Capturing ${targetUrl} -> ${target.name}.png`);
      await page.goto(targetUrl, { waitUntil: 'networkidle' });
      await page.waitForTimeout(350);
      await page.screenshot({
        path: path.join(OUT_DIR, `${target.name}.png`),
        fullPage: false,
      });
    }
  } finally {
    if (browser) await browser.close();
    if (serverProc) {
      serverProc.kill();
    }
  }

  console.log(`Captured ${TARGETS.length} template thumbnails in ${OUT_DIR}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
