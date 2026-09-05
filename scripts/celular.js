(function () {
  "use strict";

  var celular = window.matchMedia("(max-width: 900px)");
  var menu = document.querySelector(".menu-app");
  var principal = document.querySelector(".app-principal");

  if (menu && principal) {
    var seletor = document.createElement("div");
    seletor.className = "navegacao-celular";
    var abrir = document.createElement("button");
    abrir.type = "button";
    abrir.className = "abrir-menu-celular";
    abrir.setAttribute("aria-haspopup", "dialog");
    abrir.setAttribute("aria-controls", "menu-lateral-celular");
    abrir.setAttribute("aria-expanded", "false");
    var rotulo = document.createElement("strong");
    rotulo.textContent = "☰ Menu";
    var destino = document.createElement("span");
    destino.className = "destino-atual";
    var linkAtual = menu.querySelector("a.ativo .menu-rotulo");
    destino.textContent = linkAtual ? linkAtual.textContent : principal.querySelector("h1").textContent;
    abrir.append(rotulo, destino);
    seletor.appendChild(abrir);
    principal.prepend(seletor);

    var painel = document.createElement("dialog");
    painel.id = "menu-lateral-celular";
    painel.className = "menu-lateral-celular";
    painel.setAttribute("aria-labelledby", "titulo-menu-celular");
    var cabecalho = document.createElement("div");
    cabecalho.className = "menu-celular-cabecalho";
    var titulo = document.createElement("h2");
    titulo.id = "titulo-menu-celular";
    titulo.textContent = "KemetForge";
    var fechar = document.createElement("button");
    fechar.type = "button";
    fechar.className = "fechar-menu-celular";
    fechar.setAttribute("aria-label", "Fechar menu");
    fechar.textContent = "×";
    cabecalho.append(titulo, fechar);
    var destinos = document.createElement("nav");
    destinos.setAttribute("aria-label", "Escolha onde entrar");

    function adicionarLink(original) {
      var link = document.createElement("a");
      link.href = original.getAttribute("href");
      link.textContent = original.querySelector(".menu-rotulo").textContent;
      if (original.classList.contains("ativo")) link.setAttribute("aria-current", "page");
      destinos.appendChild(link);
    }

    Array.prototype.forEach.call(menu.children, function (item) {
      if (item.matches("a")) adicionarLink(item);
      if (item.matches(".menu-grupo")) {
        var grupo = document.createElement("p");
        grupo.textContent = item.querySelector(".menu-pai .menu-rotulo").textContent;
        destinos.appendChild(grupo);
        item.querySelectorAll(".menu-submenu a").forEach(adicionarLink);
      }
    });
    painel.append(cabecalho, destinos);
    document.body.appendChild(painel);
    var rolagemAnterior = 0;

    abrir.addEventListener("click", function () {
      if (!celular.matches || painel.open) return;
      rolagemAnterior = window.scrollY;
      document.body.style.setProperty("--rolagem-menu-celular", -rolagemAnterior + "px");
      document.body.classList.add("menu-celular-aberto");
      painel.showModal();
      destinos.scrollTop = 0;
      abrir.setAttribute("aria-expanded", "true");
      fechar.focus();
    });
    fechar.addEventListener("click", function () { painel.close(); });
    painel.addEventListener("click", function (evento) {
      if (evento.target.closest("a")) painel.close();
      // O backdrop pertence ao dialog; somente toques fora da área fecham.
      if (evento.target === painel) {
        var limites = painel.getBoundingClientRect();
        if (evento.clientX < limites.left || evento.clientX > limites.right || evento.clientY < limites.top || evento.clientY > limites.bottom) painel.close();
      }
    });
    painel.addEventListener("close", function () {
      document.body.classList.remove("menu-celular-aberto");
      document.body.style.removeProperty("--rolagem-menu-celular");
      abrir.setAttribute("aria-expanded", "false");
      window.scrollTo(0, rolagemAnterior);
    });
    // Mantém Tab/Shift+Tab nos controles do menu, inclusive nas extremidades.
    painel.addEventListener("keydown", function (evento) {
      if (evento.key !== "Tab") return;
      var controles = painel.querySelectorAll("button, a[href]");
      var primeiro = controles[0];
      var ultimo = controles[controles.length - 1];
      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    });
    // O dialog nativo bloqueia o fundo e fecha com Escape.
    celular.addEventListener("change", function () { if (painel.open) painel.close(); });
    window.addEventListener("pageshow", function () { if (painel.open) painel.close(); });
  }

  var botaoPublico = document.querySelector("[data-menu-botao]");
  var menuPublico = document.querySelector("[data-menu]");
  if (botaoPublico && menuPublico) {
    document.addEventListener("click", function (evento) {
      if (window.innerWidth > 980 || !menuPublico.classList.contains("aberta")) return;
      // O botão troca o SVG ao abrir; o alvo original pode já estar removido.
      if (evento.composedPath().includes(botaoPublico)) return;
      if (!menuPublico.contains(evento.target) || evento.target.closest("a")) botaoPublico.click();
    });
    document.addEventListener("keydown", function (evento) {
      if (window.innerWidth <= 980 && evento.key === "Escape" && menuPublico.classList.contains("aberta")) {
        botaoPublico.click();
        botaoPublico.focus();
      }
    });
  }
})();
