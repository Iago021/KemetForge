/* Requer Playwright e servidor local; veja testes/README.md. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.KEMET_URL || 'http://127.0.0.1:8765';
const paginas = ['index.html', ...fs.readdirSync(path.join(__dirname, '../paginas')).filter(p => p.endsWith('.html')).map(p => 'paginas/' + p)];

(async () => {
  const browser = await chromium.launch({ headless: true });
  let checks = 0;
  try {
    for (const width of (process.argv.includes('--interacoes') ? [] : [320, 360, 390, 430, 700, 844])) {
      const context = await browser.newContext({ viewport: { width, height: width === 844 ? 390 : 844 }, hasTouch: true });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      for (const pagina of paginas) {
        await page.goto(base + '/' + pagina);
        const problemas = await page.evaluate(() => {
          const fora = [...document.querySelectorAll('main, .app-topo, .workspace-grade, .dashboard-card, .app-card, .acoes-rapidas, .semana-cabecalho, .mes-grid')].filter(e => {
            const r = e.getBoundingClientRect();
            return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1);
          }).map(e => e.className || e.tagName);
          return { fora, largura: document.documentElement.scrollWidth };
        });
        assert.deepEqual(problemas.fora, [], `${width} ${pagina}: conteúdo cortado`);
        assert.ok(problemas.largura <= width + 1, `${width} ${pagina}: rolagem da página`);
        if (width <= 700 && await page.locator('.menu-app').count()) {
          const nav = await page.locator('.menu-app').evaluate(e => ({ width: e.clientWidth, scroll: e.scrollWidth }));
          assert.ok(nav.scroll <= nav.width + 1, `${width} ${pagina}: menu cortado`);
          assert.equal(await page.locator('.menu-app > a:visible, .menu-pai:visible').count(), 5);
          await page.locator('[data-menu-grupo="estoque"] > button').tap();
          const links = page.locator('[data-menu-grupo="estoque"] .menu-submenu a');
          assert.equal(await links.count(), 4);
          for (const link of await links.all()) {
            await link.tap({ trial: true });
            const r = await link.boundingBox();
            assert.ok(r.x >= 0 && r.x + r.width <= width + 1 && r.y >= 0 && r.height >= 44);
          }
          await page.locator('h1').tap();
          assert.equal(await page.locator('[data-menu-grupo="estoque"] > button').getAttribute('aria-expanded'), 'false');
        }
        checks++;
      }
      assert.deepEqual(errors, []);
      console.log(`${width}px: ${paginas.length} páginas aprovadas.`);
      await context.close();
    }

    // A preferência de barra recolhida do PC não deve impedir a navegação móvel.
    const context = await browser.newContext({ viewport: { width: 390, height: 700 }, hasTouch: true });
    await context.addInitScript(() => localStorage.setItem('kemet_menu_recolhido', '1'));
    const page = await context.newPage();
    await page.goto(base + '/paginas/painel.html');
    await page.locator('[data-menu-grupo="estoque"] > button').tap();
    await page.locator('.menu-submenu a[href="receitas.html"]').tap();
    await page.waitForURL('**/receitas.html');
    assert.equal(await page.evaluate(() => localStorage.getItem('kemet_menu_recolhido')), '1');
    await page.setViewportSize({ width: 1366, height: 900 });
    assert.ok(await page.locator('body').evaluate(e => e.classList.contains('menu-recolhido')));
    await page.setViewportSize({ width: 390, height: 700 });
    await page.locator('[data-menu-grupo="gestao"] > button').tap();
    await page.locator('.menu-submenu a[href="calendario.html"]').tap();
    await page.waitForURL('**/calendario.html');
    const titulo = await page.locator('.calendario-navegacao h2').textContent();
    await page.getByRole('button', { name: 'Próximo mês', exact: true }).tap();
    assert.notEqual(await page.locator('.calendario-navegacao h2').textContent(), titulo);
    await page.locator('.mes-grid button:not(.fora)').first().tap();
    await page.getByRole('button', { name: 'Novo compromisso', exact: false }).tap();
    const modal = page.getByRole('dialog');
    await modal.waitFor();
    await page.setViewportSize({ width: 390, height: 360 });
    const bounds = await modal.boundingBox();
    assert.ok(bounds.y >= 0 && bounds.y + bounds.height <= 361, 'Modal deve caber com pouco espaço vertical');
    await modal.locator('input').first().fill('Teste de celular');
    await modal.locator('button[type="submit"]').tap({ trial: true });
    await modal.getByRole('button', { name: 'Fechar', exact: true }).tap();
    await page.setViewportSize({ width: 390, height: 700 });
    await page.locator('[data-perfil-botao]').tap();
    await page.getByRole('menuitem', { name: 'Alternar entre os temas claro e escuro' }).tap();
    assert.ok(await page.locator('body').evaluate(e => e.classList.contains('tema-claro')));
    await page.goto(base + '/index.html');
    await page.locator('[data-menu-botao]').tap();
    assert.equal(await page.locator('[data-menu-botao]').getAttribute('aria-expanded'), 'true');
    await page.locator('h1').tap();
    assert.equal(await page.locator('[data-menu-botao]').getAttribute('aria-expanded'), 'false');
    console.log(`${checks} combinações de página/tela aprovadas; navegação, calendário, modal, tema e preferência de PC aprovados.`);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
