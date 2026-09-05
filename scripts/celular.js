(function () {
  "use strict";

  var celular = window.matchMedia("(max-width: 900px)");
  var menu = document.querySelector(".menu-app");
  var principal = document.querySelector(".app-principal");

  if (menu && principal) {
    var seletor = document.createElement("details");
    seletor.className = "navegacao-celular";
    var resumo = document.createElement("summary");
    var rotulo = document.createElement("strong");
    rotulo.textContent = "☰ Menu";
    var destino = document.createElement("span");
    destino.className = "destino-atual";
    var linkAtual = menu.querySelector("a.ativo .menu-rotulo");
    destino.textContent = linkAtual ? linkAtual.textContent : principal.querySelector("h1").textContent;
    resumo.append(rotulo, destino);
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
    seletor.append(resumo, destinos);
    principal.prepend(seletor);

    document.addEventListener("click", function (evento) {
      if (!celular.matches || !seletor.open) return;
      if (!seletor.contains(evento.target) || evento.target.closest(".navegacao-celular a")) seletor.open = false;
    });
    document.addEventListener("keydown", function (evento) {
      if (celular.matches && evento.key === "Escape" && seletor.open) {
        seletor.open = false;
        resumo.focus();
      }
    });
    celular.addEventListener("change", function () { seletor.open = false; });
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
