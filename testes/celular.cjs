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
        if (await page.locator('.navegacao-celular').count()) {
          assert.equal(await page.locator('.barra-lateral:visible').count(), 0);
          const summary = page.locator('.abrir-menu-celular');
          const headerBefore = await page.locator('h1').boundingBox();
          await summary.tap();
          const links = page.locator('.menu-lateral-celular nav a');
          assert.equal(await links.count(), 11);
          const drawer = page.locator('.menu-lateral-celular');
          assert.ok(await drawer.evaluate(e => e.matches(':modal')), 'Menu deve sobrepor toda a página como modal');
          const menuBounds = await drawer.boundingBox();
          assert.equal(menuBounds.y, 0);
          assert.equal(menuBounds.height, width === 844 ? 390 : 844);
          assert.ok(menuBounds.width <= width - 43, 'Fundo deve ficar acessível para fechar');
          const headerBounds = await page.locator('h1').boundingBox();
          assert.equal(headerBounds.y, headerBefore.y, 'Abrir menu não deve empurrar o conteúdo');
          assert.equal(await page.locator('body').evaluate(e => getComputedStyle(e).overflow), 'hidden');
          for (const link of [links.first(), links.nth(4), links.last()]) {
            await link.tap({ trial: true });
            const r = await link.boundingBox();
            assert.ok(r.x >= 0 && r.x + r.width <= width + 1 && r.y >= 0 && r.height >= 44);
          }
          await page.touchscreen.tap(width - 10, 100);
          await page.waitForFunction(() => !document.querySelector('.menu-lateral-celular').open && !document.body.classList.contains('menu-celular-aberto'));
          assert.equal(await summary.getAttribute('aria-expanded'), 'false');
        }
        if (await page.locator('.autenticacao').count()) {
          const decorations = await page.locator('.autenticacao').evaluate(e => ['::before', '::after'].map(p => getComputedStyle(e, p).display));
          assert.deepEqual(decorations, ['none', 'none'], 'Faixas não devem cobrir o formulário');
          const logo = await page.locator('.logo-canto').boundingBox();
          const back = await page.locator('.voltar').boundingBox();
          assert.ok(logo.x + logo.width <= back.x, 'Logo não deve sobrepor o link');
          await page.locator('input').first().fill('teste');
          await page.locator('input').first().scrollIntoViewIfNeeded();
          const input = await page.locator('input').first().boundingBox();
          assert.ok(await page.evaluate(r => document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)?.tagName === 'INPUT', input));
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
    await page.locator('.abrir-menu-celular').tap();
    await page.locator('.menu-lateral-celular a[href="receitas.html"]').tap();
    await page.waitForURL('**/receitas.html');
    assert.equal(await page.evaluate(() => localStorage.getItem('kemet_menu_recolhido')), '1');
    await page.setViewportSize({ width: 1366, height: 900 });
    assert.ok(await page.locator('body').evaluate(e => e.classList.contains('menu-recolhido')));
    await page.setViewportSize({ width: 390, height: 700 });
    await page.locator('.abrir-menu-celular').tap();
    await page.locator('.menu-lateral-celular a[href="calendario.html"]').tap();
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
    await page.goto(base + '/paginas/criar_conta.html');
    await page.locator('#nome').fill('Teste celular');
    await page.locator('#cad-email').fill('teste@example.com');
    await page.locator('#telefone').fill('11999999999');
    await page.locator('#negocio').fill('Loja teste');
    await page.locator('#senha').fill('SenhaTeste123');
    await page.locator('[data-mostrar-senha]').tap();
    assert.equal(await page.locator('#senha').getAttribute('type'), 'text');
    await page.locator('#confirmar').fill('SenhaTeste123');
    await page.locator('#categoria').selectOption('Cafeteria');
    await page.locator('input[type=checkbox]').check();
    await page.getByRole('button', { name: 'Criar conta', exact: true }).tap();
    await page.waitForURL('**/painel.html');
    await page.locator('.abrir-menu-celular').tap();
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('.menu-lateral-celular').open && !document.body.classList.contains('menu-celular-aberto'));
    assert.equal(await page.locator('.abrir-menu-celular').getAttribute('aria-expanded'), 'false');
    // O dialog prende o foco e devolve a rolagem ao fechar.
    await page.locator('.abrir-menu-celular').tap();
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Sair');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('aria-label')), 'Fechar menu');
    await page.getByRole('button', { name: 'Fechar menu', exact: true }).tap();
    await page.waitForFunction(() => !document.body.classList.contains('menu-celular-aberto'));
    await page.evaluate(() => window.scrollTo(0, 300));
    const scrollBefore = await page.evaluate(() => window.scrollY);
    // Dispara o mesmo botão sem o teste reposicionar a página antes do clique.
    await page.locator('.abrir-menu-celular').evaluate(e => e.click());
    await page.getByRole('button', { name: 'Fechar menu', exact: true }).tap();
    await page.waitForFunction(y => window.scrollY === y && !document.body.classList.contains('menu-celular-aberto'), scrollBefore);
    await page.locator('.abrir-menu-celular').tap();
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.waitForFunction(() => !document.body.classList.contains('menu-celular-aberto'));
    assert.equal(await page.locator('.menu-lateral-celular').getAttribute('open'), null);
    await page.setViewportSize({ width: 390, height: 700 });
    await page.goto(base + '/index.html');
    await page.locator('[data-menu-botao]').tap();
    assert.equal(await page.locator('[data-menu-botao]').getAttribute('aria-expanded'), 'true');
    await page.locator('h1').tap();
    assert.equal(await page.locator('[data-menu-botao]').getAttribute('aria-expanded'), 'false');
    console.log(`${checks} combinações de página/tela aprovadas; navegação, calendário, modal, tema e preferência de PC aprovados.`);
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
