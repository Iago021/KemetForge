# Verificação em celular

Pré-requisitos: Node.js, Playwright (`npm install --no-save playwright`) e Chromium (`npx playwright install chromium`).

Na raiz do projeto, execute `python3 -m http.server 8765 --bind 127.0.0.1` e, em outro terminal, `node testes/celular.cjs`. Para outro endereço, defina `KEMET_URL`.

O teste cobre as 18 páginas em larguras de 320, 360, 390, 430, 700 e 844 pixels, incluindo paisagem, navegação por toque, submenus, preferência de menu do PC, calendário, modal com altura reduzida e troca de tema. Usa contextos de navegador isolados e não envia dados a serviços externos.

Os ajustes estão em `estilos/celular.css`, carregado após as folhas existentes. O menu inferior é usado até 700px; de 701px a 900px a barra compacta continua lateral. Acima de 980px nenhuma nova regra visual se aplica. A validação inicial também comparou capturas das 18 páginas a 1366px antes e depois: todas idênticas.
