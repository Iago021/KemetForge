# Verificação em celular

Pré-requisitos: Node.js, Playwright (`npm install --no-save playwright`) e Chromium (`npx playwright install chromium`).

Na raiz do projeto, execute `python3 -m http.server 8765 --bind 127.0.0.1` e, em outro terminal, `node testes/celular.cjs`. Para outro endereço, defina `KEMET_URL`.

O teste cobre as 18 páginas em larguras de 320, 360, 390, 430, 700 e 844 pixels, incluindo paisagem, menu lateral modal por toque, fechamento ao tocar fora/Escape, preferência de menu do PC, calendário, modal com altura reduzida e troca de tema. Verifica também que as faixas decorativas não cobrem o cadastro/login, que o logo não sobrepõe o link de entrada e que o cadastro demonstrativo completo funciona. Usa contextos de navegador isolados e não envia dados a serviços externos.

Os ajustes estão em `estilos/celular.css`, carregado após as folhas existentes. Até 900px, um botão no topo abre um menu lateral sobre a tela, com fundo escurecido. O dialog nativo mantém o foco dentro do menu; a página ao fundo fica bloqueada até fechar. Os testes também verificam fechamento pelo X/fundo/Escape, restauração da rolagem e retorno ao layout de PC. Acima de 980px nenhuma nova regra visual se aplica. A validação inicial também comparou capturas das 18 páginas a 1366px antes e depois: todas idênticas.
