(function () {
  "use strict";

  var celular = window.matchMedia("(max-width: 700px)");
  var menu = document.querySelector(".menu-app");

  if (menu) {
    function atualizarSubmenus() {
      menu.querySelectorAll(".menu-grupo").forEach(function (grupo) {
        grupo.querySelector(".menu-submenu").inert = celular.matches && !grupo.classList.contains("aberto");
      });
    }

    function fecharSubmenus() {
      menu.querySelectorAll(".menu-grupo.aberto").forEach(function (grupo) {
        grupo.classList.remove("aberto");
        grupo.querySelector("[data-menu-pai]").setAttribute("aria-expanded", "false");
      });
      atualizarSubmenus();
    }

    document.addEventListener("click", function (evento) {
      if (!celular.matches) return;
      if (!menu.contains(evento.target) || evento.target.closest(".menu-submenu a")) fecharSubmenus();
      else atualizarSubmenus();
    });
    document.addEventListener("keydown", function (evento) {
      if (celular.matches && evento.key === "Escape") atualizarSubmenus();
    });
    celular.addEventListener("change", function () {
      if (celular.matches) fecharSubmenus();
      else atualizarSubmenus();
    });
    atualizarSubmenus();
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
