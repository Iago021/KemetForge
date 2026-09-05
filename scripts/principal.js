(function () {
  "use strict";

  var linkFavicon = document.querySelector('link[rel~="icon"]');
  if (linkFavicon) {
    var dentroDePaginas = location.pathname.indexOf("/paginas/") >= 0;
    linkFavicon.href = (dentroDePaginas ? "../" : "") + "imagens/logo_simbolo.svg?v=10";
    linkFavicon.type = "image/svg+xml";
  }

  var icones = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    produtos: '<path d="m3 7 9-4 9 4-9 4Z"/><path d="m3 7 9 4 9-4v10l-9 4-9-4Z"/><path d="M12 11v10"/>',
    ingredientes: '<path d="M12 22V8"/><path d="M8 12c-3 0-5-2-5-5 3 0 5 2 5 5Zm8-3c3 0 5-2 5-5-3 0-5 2-5 5Zm-4 1c-3 0-5-2-5-5 3 0 5 2 5 5Zm0 6c3 0 5-2 5-5-3 0-5 2-5 5Z"/>',
    estoque: '<path d="M3 9h18v11H3z"/><path d="M7 9V5h10v4M8 13h8M8 17h5"/>',
    producao: '<path d="M4 15h16l-2 6H6Z"/><path d="M8 15V9a4 4 0 0 1 8 0v6M9 6 7 4m8 2 2-2"/>',
    vendas: '<circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/><path d="M3 4h2l2.4 11h10.8l2-7H6"/>',
    perdas: '<path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6m5 4v7m4-7v7"/>',
    financeiro: '<rect x="2" y="5" width="20" height="15" rx="2"/><path d="M16 13h6M2 10h20"/><circle cx="17" cy="15" r="1"/>',
    calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
    ia: '<path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2Zm6 10 .8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8ZM6 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1Z"/>',
    graficos: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    sair: '<path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 3h6a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-6"/>',
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    lua: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8Z"/>',
    mais: '<path d="M12 5v14M5 12h14"/>',
    alerta: '<path d="M10.3 3.4 2.4 17a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.4a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
    tendencia: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    dinheiro: '<circle cx="12" cy="12" r="9"/><path d="M16 8.5c-.8-.8-2-1.2-3.5-1.2-2 0-3.5.9-3.5 2.3 0 1.4 1.3 2 3.5 2.4 2.1.4 3.5 1.2 3.5 2.6 0 1.5-1.5 2.5-3.7 2.5-1.6 0-3-.5-4-1.4M12 5v14"/>',
    relatorio: '<path d="M4 3h12l4 4v14H4Z"/><path d="M16 3v5h5M8 13h8M8 17h6M8 9h3"/>',
    relógio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    bolo: '<path d="M4 11h16v9H4zM7 11V8m5 3V7m5 4V8"/><path d="M6 16c2-2 4 2 6 0s4 2 6 0"/>',
    bot: '<rect x="4" y="6" width="16" height="13" rx="3"/><path d="M12 2v4M8 11h.01M16 11h.01M9 15h6"/>',
    enviar: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    usuario: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    configuracoes: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    ajuda: '<circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1.2.9-1.2 1.7v.2M12 17h.01"/>',
    chevron: '<path d="m8 10 4 4 4-4"/>'
  };

  function svg(nome) {
    return '<svg class="icone-svg" viewBox="0 0 24 24" aria-hidden="true">' + (icones[nome] || icones.dashboard) + '</svg>';
  }

  function renderizarIcones(raiz) {
    (raiz || document).querySelectorAll("[data-icon]").forEach(function (elemento) {
      elemento.innerHTML = svg(elemento.dataset.icon);
    });
  }

  var tempoAviso;
  function mostrarAviso(mensagem) {
    var aviso = document.querySelector("[data-aviso]");
    if (!aviso) {
      aviso = document.createElement("div");
      aviso.className = "aviso";
      aviso.dataset.aviso = "";
      aviso.setAttribute("role", "status");
      aviso.setAttribute("aria-live", "polite");
      document.body.appendChild(aviso);
    }
    aviso.textContent = mensagem;
    aviso.classList.add("visivel");
    clearTimeout(tempoAviso);
    tempoAviso = setTimeout(function () { aviso.classList.remove("visivel"); }, 3500);
  }

  var botaoTema = null;
  var chaveTema = "kemet_tema";

  function obterTemaSalvo() {
    try {
      var tema = localStorage.getItem(chaveTema);
      return tema === "claro" || tema === "escuro" ? tema : null;
    } catch (erro) {
      return null;
    }
  }

  function aplicarTema(tema) {
    var temaAtual = tema === "claro" || tema === "escuro" ? tema : (document.body.classList.contains("app-body") ? "escuro" : "claro");
    var claro = temaAtual === "claro";
    document.body.classList.toggle("tema-claro", claro);
    document.body.classList.toggle("tema-escuro", !claro);
    document.documentElement.dataset.tema = temaAtual;
    document.documentElement.style.colorScheme = claro ? "light" : "dark";

    if (botaoTema) {
      botaoTema.innerHTML = '<span data-icon="' + (claro ? "lua" : "sol") + '"></span><span>' + (claro ? "Usar tema escuro" : "Usar tema claro") + '</span>';
      renderizarIcones(botaoTema);
    }
  }

  aplicarTema(document.body.classList.contains("app-body") ? obterTemaSalvo() : "claro");

  window.addEventListener("storage", function (evento) {
    if (evento.key === chaveTema && document.body.classList.contains("app-body")) aplicarTema(evento.newValue);
  });

  window.addEventListener("pageshow", function () {
    aplicarTema(document.body.classList.contains("app-body") ? obterTemaSalvo() : "claro");
  });

  var menuApp = document.querySelector(".menu-app");
  if (menuApp) {
    var paginaAtual = location.pathname.split("/").pop() || "painel.html";
    var itensMenu = [
      { href: "painel.html", icone: "dashboard", rotulo: "Visão Geral" },
      { id: "estoque", icone: "estoque", rotulo: "Estoque", filhos: [
        { href: "produtos.html", rotulo: "Itens e preços" },
        { href: "ingredientes.html", rotulo: "Ingredientes" },
        { href: "estoque.html", rotulo: "Movimentações" },
        { href: "receitas.html", rotulo: "Receitas" }
      ] },
      { id: "operacao", icone: "vendas", rotulo: "Operação", filhos: [
        { href: "vendas.html", rotulo: "Vendas diárias" },
        { href: "perdas.html", rotulo: "Perdas" }
      ] },
      { id: "gestao", icone: "financeiro", rotulo: "Gestão", filhos: [
        { href: "financeiro.html", rotulo: "Financeiro" },
        { href: "calendario.html", rotulo: "Calendário" }
      ] },
      { href: "ia_especialista.html", icone: "ia", rotulo: "Assistente" }
    ];
    menuApp.innerHTML = itensMenu.map(function (item) {
      if (item.href) {
        return '<a href="' + item.href + '"' + (paginaAtual === item.href ? ' class="ativo"' : '') + ' title="' + item.rotulo + '"><span class="menu-icone" data-icon="' + item.icone + '"></span><span class="menu-rotulo">' + item.rotulo + '</span></a>';
      }
      var grupoAtivo = item.filhos.some(function (filho) { return filho.href === paginaAtual; });
      var abrirGrupo = grupoAtivo && window.innerWidth > 700;
      return '<div class="menu-grupo' + (abrirGrupo ? ' aberto' : '') + '" data-menu-grupo="' + item.id + '">' +
        '<button class="menu-pai' + (grupoAtivo ? ' ativo' : '') + '" type="button" aria-expanded="' + String(abrirGrupo) + '" title="' + item.rotulo + '" data-menu-pai>' +
        '<span class="menu-icone" data-icon="' + item.icone + '"></span><span class="menu-rotulo">' + item.rotulo + '</span><span class="menu-seta" data-icon="chevron"></span></button>' +
        '<div class="menu-submenu">' + item.filhos.map(function (filho) {
          return '<a href="' + filho.href + '"' + (paginaAtual === filho.href ? ' class="ativo"' : '') + '><span class="submenu-ponto"></span><span class="menu-rotulo">' + filho.rotulo + '</span></a>';
        }).join("") + '</div></div>';
    }).join("") + '<div class="menu-separador"></div><a class="menu-sair" href="../index.html" title="Sair"><span class="menu-icone" data-icon="sair"></span><span class="menu-rotulo">Sair</span></a>';

    menuApp.querySelectorAll("[data-menu-pai]").forEach(function (botaoPai) {
      botaoPai.addEventListener("click", function () {
        if (window.innerWidth > 700 && document.body.classList.contains("menu-recolhido")) {
          document.body.classList.remove("menu-recolhido");
          localStorage.setItem("kemet_menu_recolhido", "0");
        }
        var grupo = botaoPai.closest(".menu-grupo");
        var abrir = !grupo.classList.contains("aberto");
        menuApp.querySelectorAll(".menu-grupo.aberto").forEach(function (outroGrupo) {
          if (outroGrupo !== grupo) {
            outroGrupo.classList.remove("aberto");
            var outroBotao = outroGrupo.querySelector("[data-menu-pai]");
            if (outroBotao) outroBotao.setAttribute("aria-expanded", "false");
          }
        });
        grupo.classList.toggle("aberto", abrir);
        botaoPai.setAttribute("aria-expanded", String(abrir));
      });
    });
    document.addEventListener("keydown", function (evento) {
      if (evento.key !== "Escape") return;
      menuApp.querySelectorAll(".menu-grupo.aberto").forEach(function (grupo) {
        grupo.classList.remove("aberto");
        var botao = grupo.querySelector("[data-menu-pai]");
        if (botao) botao.setAttribute("aria-expanded", "false");
      });
    });

    var botaoBarra = document.querySelector(".barra-menu");
    if (botaoBarra) {
      botaoBarra.innerHTML = '<span data-icon="menu"></span><span class="barra-menu-rotulo">Menu</span>';
      botaoBarra.addEventListener("click", function () {
        document.body.classList.toggle("menu-recolhido");
        localStorage.setItem("kemet_menu_recolhido", document.body.classList.contains("menu-recolhido") ? "1" : "0");
      });
      if (localStorage.getItem("kemet_menu_recolhido") === "1") document.body.classList.add("menu-recolhido");
    }
  }

  if (document.body.classList.contains("app-body")) {
    var menuPerfil = document.querySelector("[data-perfil-menu]");
    if (!menuPerfil) {
      var cabecalhoPagina = document.querySelector(".app-topo");
      if (cabecalhoPagina) {
        var areaPerfil = document.createElement("div");
        areaPerfil.className = "perfil-area perfil-compacto";
        areaPerfil.innerHTML = '<button class="usuario-chip" type="button" aria-label="Abrir perfil" aria-expanded="false" aria-haspopup="true" data-perfil-botao><span class="usuario-avatar">K</span><span class="perfil-seta" data-icon="chevron"></span></button>' +
          '<div class="perfil-menu" role="menu" aria-hidden="true" data-perfil-menu><div class="perfil-menu-topo"><span class="usuario-avatar">K</span><div><strong>Kemet Café</strong><small>contato@exemplo.com</small></div></div>' +
          '<button type="button" role="menuitem" data-prototipo="Seu perfil estará disponível em breve."><span data-icon="usuario"></span>Meu perfil</button>' +
          '<button type="button" role="menuitem" data-prototipo="Central de ajuda em breve."><span data-icon="ajuda"></span>Ajuda</button>' +
          '<a href="../index.html" role="menuitem"><span data-icon="sair"></span>Sair</a></div>';
        (cabecalhoPagina.querySelector(".topo-acoes") || cabecalhoPagina).appendChild(areaPerfil);
        menuPerfil = areaPerfil.querySelector("[data-perfil-menu]");
      }
    }

    botaoTema = document.createElement("button");
    botaoTema.type = "button";
    botaoTema.className = "perfil-tema";
    botaoTema.setAttribute("role", "menuitem");
    botaoTema.setAttribute("aria-label", "Alternar entre os temas claro e escuro");
    if (menuPerfil) {
      var linkSair = menuPerfil.querySelector('a[href="../index.html"]');
      menuPerfil.insertBefore(botaoTema, linkSair);
    }

    var paginaInternaAtual = location.pathname.split("/").pop() || "painel.html";
    if (paginaInternaAtual !== "ia_especialista.html") {
      var atalhoAssistente = document.createElement("a");
      atalhoAssistente.className = "ia-flutuante";
      atalhoAssistente.href = "ia_especialista.html";
      atalhoAssistente.setAttribute("aria-label", "Abrir assistente");
      atalhoAssistente.setAttribute("title", "Assistente");
      atalhoAssistente.innerHTML = '<span data-icon="ia"></span>';
      document.body.appendChild(atalhoAssistente);
      renderizarIcones(atalhoAssistente);
    }

    aplicarTema(obterTemaSalvo());
    botaoTema.addEventListener("click", function () {
      var novoTema = document.body.classList.contains("tema-claro") ? "escuro" : "claro";
      aplicarTema(novoTema);
      try {
        localStorage.setItem(chaveTema, novoTema);
      } catch (erro) {
        mostrarAviso("Não foi possível salvar sua preferência de tema.");
      }
    });
  }

  var iconesBeneficio = ["estoque", "financeiro", "graficos"];
  document.querySelectorAll(".beneficio .icone-circulo").forEach(function (item, indice) { item.dataset.icon = iconesBeneficio[indice] || "dashboard"; });
  var iconesMetrica = ["vendas", "dinheiro", "relatorio", "estoque"];
  document.querySelectorAll(".metrica-icone").forEach(function (item, indice) { item.dataset.icon = iconesMetrica[indice] || "dashboard"; });
  document.querySelectorAll(".produto-item .produto-imagem").forEach(function (item, indice) { item.dataset.icon = indice === 0 ? "bolo" : (indice === 1 ? "dinheiro" : "produtos"); });
  var iconeProdutoDetalhe = document.querySelector("[data-produto-icone]");
  if (iconeProdutoDetalhe) iconeProdutoDetalhe.dataset.icon = "bolo";
  renderizarIcones(document);

  var graficoGeral = document.querySelector(".desempenho-card .linha-dashboard");
  var cardGrafico = graficoGeral ? graficoGeral.closest(".desempenho-card") : null;
  if (graficoGeral && cardGrafico) {
    if (!graficoGeral.querySelector(".linha-perdas")) {
      graficoGeral.insertAdjacentHTML("beforeend", '<path class="linha-perdas"/><g class="grafico-pontos perdas"></g>');
    }

    var dadosGrafico = {
      hoje: {
        rotulo: "Hoje",
        labels: ["08h", "10h", "12h", "14h", "16h", "18h"],
        eixoY: ["R$ 1,6 mil", "R$ 1 mil", "R$ 500", "R$ 0"],
        maximo: 1600,
        vendas: [120, 260, 510, 820, 1110, 1240],
        lucro: [58, 132, 276, 438, 590, 684],
        perdas: [0, 6, 16, 28, 47, 61.2],
        resumo: [
          ["Vendas hoje", 1240],
          ["Lucro hoje", 684],
          ["Perdas hoje", 61.2]
        ]
      },
      semana: {
        rotulo: "Semana",
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        eixoY: ["R$ 9 mil", "R$ 6 mil", "R$ 3 mil", "R$ 0"],
        maximo: 9000,
        vendas: [1240, 2380, 3510, 4890, 6340, 7780, 8290],
        lucro: [684, 1050, 1530, 2180, 2810, 3370, 3610],
        perdas: [61.2, 72.5, 88.4, 108.9, 122.1, 139.4, 147.6],
        resumo: [
          ["Vendas na semana", 8290],
          ["Lucro na semana", 3610],
          ["Perdas na semana", 147.6]
        ]
      },
      mes: {
        rotulo: "Mês",
        labels: ["01", "05", "09", "13", "17", "21", "25", "29"],
        eixoY: ["R$ 30 mil", "R$ 20 mil", "R$ 10 mil", "R$ 0"],
        maximo: 30000,
        vendas: [3200, 6900, 10400, 13900, 17300, 20700, 22800, 24680],
        lucro: [1100, 2350, 3600, 4890, 6120, 7350, 8160, 8750],
        perdas: [42, 82, 117, 163, 205, 238, 261, 284.5],
        resumo: [
          ["Vendas no mês", 24680],
          ["Lucro líquido", 8750],
          ["Perdas no mês", 284.5]
        ]
      }
    };
    var moedaGrafico = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
    var nomesSeries = { vendas: "Vendas", lucro: "Lucro", perdas: "Perdas" };

    function pontosDaSerie(valores, maximo) {
      var inicioX = 20;
      var fimX = 740;
      var topoY = 25;
      var baseY = 195;
      return valores.map(function (valor, indice) {
        var proporcaoX = valores.length > 1 ? indice / (valores.length - 1) : 0;
        return {
          x: inicioX + (fimX - inicioX) * proporcaoX,
          y: baseY - (valor / maximo) * (baseY - topoY)
        };
      });
    }

    function caminhoDaSerie(pontos) {
      return pontos.map(function (ponto, indice) {
        return (indice === 0 ? "M" : "L") + ponto.x.toFixed(1) + " " + ponto.y.toFixed(1);
      }).join(" ");
    }

    function atualizarPontos(tipo, valores, pontos, labels) {
      var grupo = graficoGeral.querySelector(".grafico-pontos." + tipo);
      if (!grupo) return;
      grupo.replaceChildren();
      valores.forEach(function (valor, indice) {
        var descricao = nomesSeries[tipo] + " em " + labels[indice] + ": " + moedaGrafico.format(valor);
        var circulo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        var titulo = document.createElementNS("http://www.w3.org/2000/svg", "title");
        circulo.setAttribute("cx", pontos[indice].x.toFixed(1));
        circulo.setAttribute("cy", pontos[indice].y.toFixed(1));
        circulo.setAttribute("r", tipo === "vendas" ? "5" : "4");
        circulo.setAttribute("tabindex", "0");
        circulo.setAttribute("role", "button");
        circulo.setAttribute("aria-label", descricao);
        titulo.textContent = descricao;
        circulo.appendChild(titulo);
        circulo.addEventListener("click", function () { mostrarAviso(descricao); });
        circulo.addEventListener("keydown", function (evento) {
          if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            mostrarAviso(descricao);
          }
        });
        grupo.appendChild(circulo);
      });
    }

    function atualizarGrafico(periodo) {
      var dados = dadosGrafico[periodo];
      if (!dados) return;
      var pontosVendas = pontosDaSerie(dados.vendas, dados.maximo);
      var pontosLucro = pontosDaSerie(dados.lucro, dados.maximo);
      var pontosPerdas = pontosDaSerie(dados.perdas, dados.maximo);
      var caminhoVendas = caminhoDaSerie(pontosVendas);
      var baseY = 195;
      var primeiroX = pontosVendas[0].x.toFixed(1);
      var ultimoX = pontosVendas[pontosVendas.length - 1].x.toFixed(1);

      cardGrafico.classList.add("grafico-atualizando");
      graficoGeral.querySelector(".linha-dado").setAttribute("d", caminhoVendas);
      graficoGeral.querySelector(".linha-area").setAttribute("d", caminhoVendas + " L" + ultimoX + " " + baseY + " L" + primeiroX + " " + baseY + " Z");
      graficoGeral.querySelector(".linha-lucro").setAttribute("d", caminhoDaSerie(pontosLucro));
      graficoGeral.querySelector(".linha-perdas").setAttribute("d", caminhoDaSerie(pontosPerdas));
      graficoGeral.setAttribute("aria-label", "Relatório geral de " + dados.rotulo.toLowerCase() + ": vendas, lucro e perdas");

      atualizarPontos("vendas", dados.vendas, pontosVendas, dados.labels);
      atualizarPontos("lucro", dados.lucro, pontosLucro, dados.labels);
      atualizarPontos("perdas", dados.perdas, pontosPerdas, dados.labels);

      var eixoX = cardGrafico.querySelector(".grafico-eixo-x");
      var eixoY = cardGrafico.querySelector(".grafico-eixo-y");
      eixoX.replaceChildren();
      eixoY.replaceChildren();
      dados.labels.forEach(function (label) {
        var item = document.createElement("span");
        item.textContent = label;
        eixoX.appendChild(item);
      });
      dados.eixoY.forEach(function (label) {
        var item = document.createElement("span");
        item.textContent = label;
        eixoY.appendChild(item);
      });

      cardGrafico.querySelectorAll(".grafico-resumo > div").forEach(function (item, indice) {
        var resumo = dados.resumo[indice];
        if (!resumo) return;
        item.querySelector("small").textContent = resumo[0];
        item.querySelector("strong").textContent = moedaGrafico.format(resumo[1]);
      });
      window.setTimeout(function () { cardGrafico.classList.remove("grafico-atualizando"); }, 160);
    }

    var periodoPorBotao = { "Hoje": "hoje", "Semana": "semana", "Mês": "mes" };
    cardGrafico.querySelectorAll("[data-filtro]").forEach(function (botao) {
      botao.addEventListener("click", function () {
        atualizarGrafico(periodoPorBotao[botao.textContent.trim()]);
      });
    });
    atualizarGrafico("mes");
  }

  var botaoMenu = document.querySelector("[data-menu-botao]");
  var menu = document.querySelector("[data-menu]");
  if (botaoMenu && menu) {
    botaoMenu.innerHTML = svg("menu");
    botaoMenu.addEventListener("click", function () {
      var aberto = menu.classList.toggle("aberta");
      botaoMenu.setAttribute("aria-expanded", String(aberto));
      botaoMenu.innerHTML = aberto ? "×" : svg("menu");
      document.body.classList.toggle("menu-travado", aberto);
    });
  }

  var perfilBotao = document.querySelector("[data-perfil-botao]");
  var perfilMenu = document.querySelector("[data-perfil-menu]");
  if (perfilBotao && perfilMenu) {
    var perfilArea = perfilBotao.closest(".perfil-area");
    function alternarPerfil(forcarAberto) {
      var abrir = typeof forcarAberto === "boolean" ? forcarAberto : !perfilMenu.classList.contains("aberto");
      perfilMenu.classList.toggle("aberto", abrir);
      perfilBotao.classList.toggle("ativo", abrir);
      perfilBotao.setAttribute("aria-expanded", String(abrir));
      perfilMenu.setAttribute("aria-hidden", String(!abrir));
    }
    perfilBotao.addEventListener("click", function () { alternarPerfil(); });
    document.addEventListener("click", function (evento) {
      if (perfilArea && !perfilArea.contains(evento.target)) alternarPerfil(false);
    });
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && perfilMenu.classList.contains("aberto")) {
        alternarPerfil(false);
        perfilBotao.focus();
      }
    });
  }

  document.querySelectorAll("[data-mensagem], [data-prototipo]").forEach(function (elemento) {
    elemento.addEventListener("click", function (evento) {
      if (acaoPorElemento(elemento)) return;
      if (elemento.tagName === "A" && elemento.getAttribute("href") && elemento.getAttribute("href") !== "#") return;
      evento.preventDefault();
      mostrarAviso(elemento.dataset.mensagem || elemento.dataset.prototipo || "Função visual do protótipo.");
    });
  });

  function normalizarFiltro(texto) {
    return String(texto || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function paginaDoFiltro() {
    return location.pathname.split("/").pop() || "index.html";
  }

  function linhasDoFiltro(pagina) {
    var seletores = {
      "produtos.html": ".produtos-workspace .tabela-dados tbody tr",
      "ingredientes.html": ".ingredientes-workspace .tabela-dados tbody tr",
      "estoque.html": ".estoque-workspace .tabela-dados tbody tr",
      "financeiro.html": ".movimentacoes-financeiras tbody tr",
      "vendas.html": ".vendas-workspace .tabela-dados tbody tr",
      "perdas.html": ".perdas-workspace .tabela-dados tbody tr"
    };
    return Array.prototype.slice.call(document.querySelectorAll(seletores[pagina] || ".seletor-sem-resultados"));
  }

  function dataDaLinha(texto, anoPadrao) {
    var encontrado = String(texto || "").match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?/);
    if (!encontrado) return null;
    return new Date(Number(encontrado[3] || anoPadrao || 2026), Number(encontrado[2]) - 1, Number(encontrado[1]), 12, 0, 0);
  }

  function intervaloPersonalizadoPerdas() {
    var ferramentas = document.querySelector(".perdas-workspace") ? document.querySelector(".pagina-ferramentas") : null;
    if (!ferramentas) return null;
    var bloco = ferramentas.querySelector("[data-periodo-perdas]");
    if (!bloco) {
      bloco = document.createElement("div");
      bloco.className = "filtro-periodo-personalizado";
      bloco.dataset.periodoPerdas = "";
      bloco.hidden = true;
      bloco.innerHTML = '<label class="campo-compacto"><span>De</span><input type="date" value="2026-08-01" data-periodo-inicio></label><label class="campo-compacto"><span>Até</span><input type="date" value="2026-08-31" data-periodo-fim></label>';
      ferramentas.appendChild(bloco);
      bloco.querySelectorAll("input").forEach(function (campo) {
        campo.addEventListener("change", aplicarFiltrosDaPagina);
      });
    }
    return bloco;
  }

  function correspondeAoFiltro(pagina, linha, filtro, contexto) {
    var celulas = linha.cells || [];
    if (pagina === "produtos.html") {
      var statusProduto = normalizarFiltro(celulas[6] ? celulas[6].textContent : "");
      if (filtro === "disponiveis") return statusProduto.indexOf("disponivel") >= 0;
      if (filtro === "estoque baixo") return statusProduto.indexOf("baixo") >= 0;
      return true;
    }

    if (pagina === "ingredientes.html") {
      var statusIngrediente = normalizarFiltro(celulas[7] ? celulas[7].textContent : "");
      if (filtro === "estoque baixo") return statusIngrediente.indexOf("baixo") >= 0;
      if (filtro === "proximo do vencimento") return statusIngrediente.indexOf("vence") >= 0;
      return true;
    }

    if (pagina === "estoque.html") {
      if (filtro === "entradas") return celulas[3] && normalizarFiltro(celulas[3].textContent) !== "—";
      if (filtro === "saidas") return celulas[4] && normalizarFiltro(celulas[4].textContent) !== "—";
      if (filtro === "ajustes") return celulas[8] && normalizarFiltro(celulas[8].textContent).indexOf("ajuste") >= 0;
      return true;
    }

    if (pagina === "financeiro.html") {
      var tipo = normalizarFiltro(celulas[1] ? celulas[1].textContent : "");
      if (filtro === "receitas") return tipo.indexOf("receita") >= 0;
      if (filtro === "despesas") return tipo.indexOf("despesa") >= 0 || tipo.indexOf("custo") >= 0;
      return true;
    }

    if (pagina === "vendas.html") {
      var horario = celulas[1] ? celulas[1].textContent.trim() : "";
      var hora = Number(horario.split(":")[0]);
      if (filtro === "manha" && !(hora < 12)) return false;
      if (filtro === "tarde" && !(hora >= 12)) return false;
      var campoDia = document.querySelector('.pagina-ferramentas input[type="date"]');
      if (campoDia && campoDia.value) {
        var dataLinha = linha.dataset.data || "2026-08-17";
        if (dataLinha !== campoDia.value) return false;
      }
      return true;
    }

    if (pagina === "perdas.html") {
      var data = dataDaLinha(celulas[0] ? celulas[0].textContent : "", 2026);
      if (!data) return true;
      if (filtro === "esta semana" && contexto.inicioSemana) return data >= contexto.inicioSemana && data <= contexto.referencia;
      if (filtro === "este mes" && contexto.referencia) return data.getMonth() === contexto.referencia.getMonth() && data.getFullYear() === contexto.referencia.getFullYear();
      if (filtro === "periodo personalizado") {
        return (!contexto.inicio || data >= contexto.inicio) && (!contexto.fim || data <= contexto.fim);
      }
      return true;
    }

    return true;
  }

  function aplicarFiltrosDaPagina() {
    var pagina = paginaDoFiltro();
    var linhas = linhasDoFiltro(pagina);
    if (!linhas.length) return;

    var filtroAtivo = document.querySelector("[data-filtro].ativo");
    var filtro = normalizarFiltro(filtroAtivo ? filtroAtivo.textContent : "");
    var buscaCampo = document.querySelector('.pagina-ferramentas input[type="search"]');
    var busca = normalizarFiltro(buscaCampo ? buscaCampo.value : "");
    var contexto = {};

    if (pagina === "perdas.html") {
      var datas = linhas.map(function (linha) { return dataDaLinha(linha.cells[0] ? linha.cells[0].textContent : "", 2026); }).filter(Boolean);
      contexto.referencia = datas.length ? new Date(Math.max.apply(null, datas.map(function (data) { return data.getTime(); }))) : new Date(2026, 7, 17, 12);
      contexto.inicioSemana = new Date(contexto.referencia);
      contexto.inicioSemana.setDate(contexto.referencia.getDate() - 6);
      var blocoPeriodo = intervaloPersonalizadoPerdas();
      if (blocoPeriodo) {
        blocoPeriodo.hidden = filtro !== "periodo personalizado";
        var inicioValor = blocoPeriodo.querySelector("[data-periodo-inicio]").value;
        var fimValor = blocoPeriodo.querySelector("[data-periodo-fim]").value;
        contexto.inicio = inicioValor ? new Date(inicioValor + "T12:00:00") : null;
        contexto.fim = fimValor ? new Date(fimValor + "T23:59:59") : null;
      }
    }

    var visiveis = 0;
    linhas.forEach(function (linha) {
      var correspondeBusca = !busca || normalizarFiltro(linha.textContent).indexOf(busca) >= 0;
      var corresponde = correspondeBusca && correspondeAoFiltro(pagina, linha, filtro, contexto);
      linha.hidden = !corresponde;
      if (corresponde) visiveis += 1;
    });

    var tabela = linhas[0].closest(".tabela-dados");
    var contador = tabela ? tabela.querySelector(".modulo-cabecalho small") : null;
    if (contador) {
      if (!contador.dataset.textoOriginal) contador.dataset.textoOriginal = contador.textContent;
      contador.textContent = visiveis + (visiveis === 1 ? " registro exibido" : " registros exibidos");
    }
  }

  document.querySelectorAll("[data-filtro]").forEach(function (filtro) {
    filtro.addEventListener("click", function () {
      var grupo = filtro.parentElement;
      grupo.querySelectorAll("[data-filtro]").forEach(function (item) { item.classList.remove("ativo"); });
      filtro.classList.add("ativo");
      aplicarFiltrosDaPagina();
    });
  });

  document.querySelectorAll('.pagina-ferramentas input[type="search"]').forEach(function (campo) {
    campo.addEventListener("input", aplicarFiltrosDaPagina);
  });

  var diaDasVendas = document.querySelector('.vendas-workspace') ? document.querySelector('.pagina-ferramentas input[type="date"]') : null;
  if (diaDasVendas) diaDasVendas.addEventListener("change", aplicarFiltrosDaPagina);

  aplicarFiltrosDaPagina();

  document.querySelectorAll("[data-telefone]").forEach(function (campo) {
    campo.addEventListener("input", function () {
      var numero = campo.value.replace(/\D/g, "").slice(0, 11);
      campo.value = numero.length > 10 ? numero.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2") : numero.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
    });
  });

  document.querySelectorAll("[data-mostrar-senha]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      var campo = document.querySelector(botao.dataset.mostrarSenha);
      if (!campo) return;
      var mostrar = campo.type === "password";
      campo.type = mostrar ? "text" : "password";
      botao.textContent = mostrar ? "Ocultar" : "Mostrar";
    });
  });

  document.querySelectorAll("[data-formulario]").forEach(function (formulario) {
    formulario.addEventListener("submit", function (evento) {
      if (formulario.classList.contains("chat-form")) return;
      evento.preventDefault();
      var senha = formulario.querySelector("[data-senha]");
      var confirmar = formulario.querySelector("[data-confirmar-senha]");
      if (!formulario.checkValidity()) { formulario.reportValidity(); mostrarAviso("Preencha corretamente os campos obrigatórios."); return; }
      if (senha && confirmar && senha.value !== confirmar.value) { confirmar.focus(); mostrarAviso("As senhas precisam ser iguais."); return; }
      mostrarAviso(formulario.dataset.sucesso || "Ação demonstrada no protótipo.");
      formulario.reset();
      var modal = formulario.closest(".modal-fundo");
      if (modal) setTimeout(function () { modal.classList.add("oculto"); }, 500);
      if (formulario.dataset.destino) setTimeout(function () { window.location.href = formulario.dataset.destino; }, 550);
    });
  });

  document.querySelectorAll("[data-abrir-modal]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      var modal = document.getElementById(botao.dataset.abrirModal);
      if (modal) { modal.classList.remove("oculto"); var campo = modal.querySelector("input, select, textarea"); if (campo) campo.focus(); }
    });
  });
  document.querySelectorAll("[data-fechar-modal]").forEach(function (botao) { botao.addEventListener("click", function () { botao.closest(".modal-fundo").classList.add("oculto"); }); });
  document.querySelectorAll(".modal-fundo").forEach(function (fundo) { fundo.addEventListener("click", function (evento) { if (evento.target === fundo) fundo.classList.add("oculto"); }); });
  document.addEventListener("keydown", function (evento) { if (evento.key === "Escape") document.querySelectorAll(".modal-fundo:not(.oculto)").forEach(function (modal) { modal.classList.add("oculto"); }); });

  var quantidade = document.querySelector("[data-quantidade]");
  var quantidadeAtual = quantidade ? Number(quantidade.textContent) : 0;
  function atualizarQuantidade(valor) { quantidadeAtual = Math.max(0, valor); if (quantidade) quantidade.textContent = quantidadeAtual; }
  var mais = document.querySelector("[data-qtd-mais]");
  var menos = document.querySelector("[data-qtd-menos]");
  if (mais) mais.addEventListener("click", function () { atualizarQuantidade(quantidadeAtual + 1); });
  if (menos) menos.addEventListener("click", function () { atualizarQuantidade(quantidadeAtual - 1); });
  document.querySelectorAll("[data-produto]").forEach(function (produto) {
    produto.addEventListener("click", function () {
      document.querySelectorAll("[data-produto]").forEach(function (item) { item.classList.remove("ativo"); });
      produto.classList.add("ativo");
      var nome = document.querySelector("[data-produto-nome]"); var icone = document.querySelector("[data-produto-icone]");
      if (nome) nome.textContent = produto.dataset.nome;
      if (icone) { icone.dataset.icon = produto.dataset.nome.indexOf("Bolo") >= 0 ? "bolo" : "produtos"; renderizarIcones(icone.parentElement || document); }
      atualizarQuantidade(Number(produto.dataset.qtd));
    });
  });

  var receitas = {
    bolo: ["Massa", ["3 ovos", "2 xícaras de açúcar", "1 xícara de leite", "3 colheres de chocolate", "2 xícaras de farinha"], "Cobertura", ["Leite condensado", "Chocolate em pó", "Manteiga"]],
    brigadeiro: ["Brigadeiro", ["1 lata de leite condensado", "4 colheres de chocolate", "1 colher de manteiga"], "Finalização", ["Granulado", "Forminhas"]],
    pave: ["Creme", ["Leite condensado", "Leite", "Amido de milho", "Gemas"], "Montagem", ["Biscoitos", "Leite", "Chocolate ralado"]]
  };
  document.querySelectorAll("[data-receita]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      var dados = receitas[botao.dataset.receita]; var conteudo = document.querySelector("[data-conteudo-receita]");
      if (!dados || !conteudo) return;
      document.querySelectorAll("[data-receita]").forEach(function (item) { item.classList.remove("ativo"); }); botao.classList.add("ativo");
      conteudo.innerHTML = "<div><h3>" + dados[0] + "</h3><ol>" + dados[1].map(function (item) { return "<li>" + item + "</li>"; }).join("") + "</ol></div><div><h3>" + dados[2] + "</h3><ol>" + dados[3].map(function (item) { return "<li>" + item + "</li>"; }).join("") + "</ol></div>";
    });
  });

  var calendario = document.querySelector("[data-calendario]");
  if (calendario) {
    var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    var nomesDias = ["D", "S", "T", "Q", "Q", "S", "S"];
    meses.forEach(function (nome, indice) {
      var primeiro = new Date(2026, indice, 1).getDay(); var total = new Date(2026, indice + 1, 0).getDate();
      var dias = nomesDias.map(function (dia) { return '<span class="semana">' + dia + "</span>"; }).join("");
      for (var vazio = 0; vazio < primeiro; vazio++) dias += "<span></span>";
      for (var dia = 1; dia <= total; dia++) dias += "<span" + (dia === 17 && indice === 7 ? ' class="marcado"' : "") + ">" + dia + "</span>";
      calendario.insertAdjacentHTML("beforeend", '<article class="mes"><h2>' + nome + '</h2><div class="dias">' + dias + "</div></article>");
    });
  }

  var periodo = document.querySelector("[data-periodo-grafico]");
  if (periodo) periodo.addEventListener("change", function () {
    document.querySelectorAll("[data-grafico-pico] .barra, [data-grafico-lucro] .barra").forEach(function (barra, indice) { barra.style.height = 20 + ((indice * 19 + (periodo.value === "mes" ? 33 : 11)) % 68) + "%"; });
  });


  var chaveDadosFuncionais = "kemetforge_dados_v1";
  var mapaAcoes = {
    "novo compromisso": "compromisso",
    "novo lançamento": "lancamento",
    "registrar venda": "venda",
    "fechar o dia": "fechamento",
    "ver fechamento completo": "fechamento",
    "registrar perda": "perda",
    "comparar com o mês": "comparacao",
    "novo item": "item",
    "editar item": "editar-item",
    "nova receita": "receita"
  };

  function textoBotao(elemento) {
    return (elemento && elemento.textContent ? elemento.textContent : "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function acaoPorElemento(elemento) {
    return mapaAcoes[textoBotao(elemento)] || "";
  }

  function dadosIniciais() {
    return {
      compromissos: [],
      lancamentos: [],
      vendas: [],
      perdas: [],
      itens: [],
      edicoesItens: [],
      receitas: [],
      mensagensIA: []
    };
  }

  function lerDadosFuncionais() {
    var padrao = dadosIniciais();
    try {
      var salvo = JSON.parse(localStorage.getItem(chaveDadosFuncionais) || "{}");
      Object.keys(padrao).forEach(function (chave) {
        if (Array.isArray(salvo[chave])) padrao[chave] = salvo[chave];
      });
    } catch (erro) {
      return padrao;
    }
    return padrao;
  }

  var dadosFuncionais = lerDadosFuncionais();

  function salvarDadosFuncionais() {
    try {
      localStorage.setItem(chaveDadosFuncionais, JSON.stringify(dadosFuncionais));
    } catch (erro) {
      mostrarAviso("Não foi possível salvar os dados neste navegador.");
    }
  }

  function hojeIso() {
    var agora = new Date();
    var mes = String(agora.getMonth() + 1).padStart(2, "0");
    var dia = String(agora.getDate()).padStart(2, "0");
    return agora.getFullYear() + "-" + mes + "-" + dia;
  }

  function horaAtual() {
    var agora = new Date();
    return String(agora.getHours()).padStart(2, "0") + ":" + String(agora.getMinutes()).padStart(2, "0");
  }

  function formatarMoedaFuncional(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function formatarDataFuncional(valor) {
    if (!valor) return "Hoje";
    var partes = valor.split("-");
    return partes.length === 3 ? partes[2] + "/" + partes[1] + "/" + partes[0] : valor;
  }

  function numeroDeMoeda(texto) {
    var limpo = String(texto || "").replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "");
    return Number(limpo) || 0;
  }

  function criarCampoFuncional(campo) {
    var rotulo = document.createElement("label");
    rotulo.className = "campo-compacto" + (campo.largo ? " campo-largo" : "");
    var titulo = document.createElement("span");
    titulo.textContent = campo.rotulo;
    rotulo.appendChild(titulo);

    var controle;
    if (campo.tipo === "select") {
      controle = document.createElement("select");
      (campo.opcoes || []).forEach(function (opcao) {
        var item = document.createElement("option");
        item.value = typeof opcao === "string" ? opcao : opcao[0];
        item.textContent = typeof opcao === "string" ? opcao : opcao[1];
        controle.appendChild(item);
      });
    } else if (campo.tipo === "textarea") {
      controle = document.createElement("textarea");
      controle.rows = campo.linhas || 4;
      controle.style.minHeight = "96px";
      controle.style.padding = "10px";
    } else {
      controle = document.createElement("input");
      controle.type = campo.tipo || "text";
      if (campo.min !== undefined) controle.min = campo.min;
      if (campo.step !== undefined) controle.step = campo.step;
    }

    controle.name = campo.nome;
    controle.required = campo.obrigatorio !== false;
    if (campo.valor !== undefined && campo.valor !== null) controle.value = campo.valor;
    if (campo.placeholder) controle.placeholder = campo.placeholder;
    rotulo.appendChild(controle);
    return rotulo;
  }

  function fecharModalFuncional(fundo) {
    if (fundo && fundo.parentNode) fundo.parentNode.removeChild(fundo);
  }

  function criarBaseModal(titulo) {
    var fundo = document.createElement("div");
    fundo.className = "modal-fundo";
    fundo.setAttribute("role", "presentation");

    var modal = document.createElement("section");
    modal.className = "modal app-card";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", titulo);
    modal.style.maxHeight = "calc(100vh - 40px)";
    modal.style.overflowY = "auto";

    var topo = document.createElement("div");
    topo.className = "modal-topo";
    var h2 = document.createElement("h2");
    h2.textContent = titulo;
    var fechar = document.createElement("button");
    fechar.type = "button";
    fechar.className = "fechar-modal";
    fechar.setAttribute("aria-label", "Fechar");
    fechar.textContent = "×";
    fechar.addEventListener("click", function () { fecharModalFuncional(fundo); });
    topo.appendChild(h2);
    topo.appendChild(fechar);
    modal.appendChild(topo);
    fundo.appendChild(modal);

    fundo.addEventListener("click", function (evento) {
      if (evento.target === fundo) fecharModalFuncional(fundo);
    });
    document.body.appendChild(fundo);
    return { fundo: fundo, modal: modal };
  }

  function configuracaoDaAcao(acao) {
    if (acao === "compromisso") return {
      titulo: "Novo compromisso",
      colecao: "compromissos",
      sucesso: "Compromisso salvo na agenda.",
      campos: [
        { nome: "titulo", rotulo: "Compromisso", placeholder: "Ex.: Receber fornecedor", largo: true },
        { nome: "data", rotulo: "Data", tipo: "date", valor: hojeIso() },
        { nome: "hora", rotulo: "Horário", tipo: "time", valor: horaAtual() },
        { nome: "categoria", rotulo: "Categoria", tipo: "select", opcoes: ["Produção", "Compra", "Conta", "Promoção", "Outro"] },
        { nome: "detalhes", rotulo: "Detalhes", tipo: "textarea", placeholder: "Informações importantes", largo: true, obrigatorio: false }
      ]
    };
    if (acao === "lancamento") return {
      titulo: "Novo lançamento",
      colecao: "lancamentos",
      sucesso: "Lançamento salvo no financeiro.",
      campos: [
        { nome: "tipo", rotulo: "Tipo", tipo: "select", opcoes: ["Receita", "Despesa"] },
        { nome: "data", rotulo: "Data", tipo: "date", valor: hojeIso() },
        { nome: "categoria", rotulo: "Categoria", placeholder: "Ex.: Vendas" },
        { nome: "valor", rotulo: "Valor", tipo: "number", min: "0.01", step: "0.01", placeholder: "0,00" },
        { nome: "descricao", rotulo: "Descrição", placeholder: "Descreva o lançamento", largo: true }
      ]
    };
    if (acao === "venda") return {
      titulo: "Registrar venda",
      colecao: "vendas",
      sucesso: "Venda registrada com sucesso.",
      campos: [
        { nome: "item", rotulo: "Item vendido", placeholder: "Ex.: Bolo de Chocolate", largo: true },
        { nome: "quantidade", rotulo: "Quantidade", tipo: "number", min: "1", step: "1", valor: "1" },
        { nome: "valorUnitario", rotulo: "Valor unitário", tipo: "number", min: "0.01", step: "0.01" },
        { nome: "custoUnitario", rotulo: "Custo unitário", tipo: "number", min: "0", step: "0.01", obrigatorio: false },
        { nome: "pagamento", rotulo: "Pagamento", tipo: "select", opcoes: ["Pix", "Dinheiro", "Cartão", "Outro"] }
      ]
    };
    if (acao === "perda") return {
      titulo: "Registrar perda",
      colecao: "perdas",
      sucesso: "Perda registrada no controle.",
      campos: [
        { nome: "item", rotulo: "Item", placeholder: "Ex.: Pavê Tradicional", largo: true },
        { nome: "quantidade", rotulo: "Quantidade", tipo: "number", min: "1", step: "1", valor: "1" },
        { nome: "custoUnitario", rotulo: "Custo unitário", tipo: "number", min: "0", step: "0.01" },
        { nome: "motivo", rotulo: "Motivo", tipo: "select", opcoes: ["Baixa procura", "Produto danificado", "Erro no preparo", "Validade encerrada", "Produção excessiva", "Outro"], largo: true }
      ]
    };
    if (acao === "item") return {
      titulo: "Novo item",
      colecao: "itens",
      sucesso: "Novo item adicionado ao estoque.",
      campos: [
        { nome: "nome", rotulo: "Nome do item", placeholder: "Ex.: Torta de limão", largo: true },
        { nome: "categoria", rotulo: "Categoria", placeholder: "Ex.: Sobremesas" },
        { nome: "quantidade", rotulo: "Quantidade", tipo: "number", min: "0", step: "1", valor: "0" },
        { nome: "custo", rotulo: "Custo de fabricação", tipo: "number", min: "0", step: "0.01" },
        { nome: "preco", rotulo: "Preço de venda", tipo: "number", min: "0", step: "0.01" },
        { nome: "minimo", rotulo: "Estoque mínimo", tipo: "number", min: "0", step: "1", valor: "5" }
      ]
    };
    if (acao === "receita") return {
      titulo: "Nova receita",
      colecao: "receitas",
      sucesso: "Receita cadastrada com sucesso.",
      campos: [
        { nome: "nome", rotulo: "Nome da receita", placeholder: "Ex.: Torta de limão", largo: true },
        { nome: "rendimento", rotulo: "Rendimento", tipo: "number", min: "1", step: "1", valor: "1" },
        { nome: "unidade", rotulo: "Unidade do rendimento", tipo: "select", opcoes: ["unidades", "fatias", "porções"] },
        { nome: "ingredientes", rotulo: "Ingredientes", tipo: "textarea", placeholder: "Um ingrediente por linha", largo: true },
        { nome: "custo", rotulo: "Custo total", tipo: "number", min: "0", step: "0.01" }
      ]
    };
    return null;
  }

  function itemDaLinha(linha) {
    if (!linha) return null;
    var celulas = linha.querySelectorAll("td");
    if (celulas.length < 7) return null;
    return {
      nome: celulas[0].textContent.trim(),
      categoria: celulas[1].textContent.trim(),
      quantidade: parseInt(celulas[2].textContent, 10) || 0,
      custo: numeroDeMoeda(celulas[3].textContent),
      preco: numeroDeMoeda(celulas[4].textContent),
      minimo: linha.dataset.minimo || 5,
      original: linha.dataset.original || celulas[0].textContent.trim(),
      indice: linha.dataset.itemIndice === undefined ? -1 : Number(linha.dataset.itemIndice),
      linha: linha
    };
  }

  function itemSelecionadoAtual() {
    var linha = document.querySelector(".produtos-workspace tbody tr.linha-selecionada");
    if (!linha) linha = document.querySelector(".produtos-workspace tbody tr");
    return itemDaLinha(linha);
  }

  function configuracaoEditarItem() {
    var item = itemSelecionadoAtual();
    if (!item) return null;
    return {
      titulo: "Editar item",
      colecao: "edicoesItens",
      sucesso: "Item atualizado com sucesso.",
      contexto: item,
      campos: [
        { nome: "nome", rotulo: "Nome do item", valor: item.nome, largo: true },
        { nome: "categoria", rotulo: "Categoria", valor: item.categoria },
        { nome: "quantidade", rotulo: "Quantidade", tipo: "number", min: "0", step: "1", valor: item.quantidade },
        { nome: "custo", rotulo: "Custo de fabricação", tipo: "number", min: "0", step: "0.01", valor: item.custo },
        { nome: "preco", rotulo: "Preço de venda", tipo: "number", min: "0", step: "0.01", valor: item.preco },
        { nome: "minimo", rotulo: "Estoque mínimo", tipo: "number", min: "0", step: "1", valor: item.minimo }
      ]
    };
  }

  function normalizarRegistro(configuracao, formulario) {
    var dados = {};
    configuracao.campos.forEach(function (campo) {
      var controle = formulario.elements.namedItem(campo.nome);
      var valor = controle && controle.value !== undefined ? String(controle.value).trim() : "";
      if (campo.tipo === "number") valor = Number(valor || 0);
      dados[campo.nome] = valor;
    });
    dados.id = Date.now();
    dados.criadoEm = new Date().toISOString();
    return dados;
  }

  function salvarRegistroDaAcao(acao, configuracao, registro) {
    if (acao === "venda" && !registro.data) {
      var campoDiaVenda = document.querySelector('.vendas-workspace') ? document.querySelector('.pagina-ferramentas input[type="date"]') : null;
      registro.data = campoDiaVenda && campoDiaVenda.value ? campoDiaVenda.value : hojeIso();
    }
    if (acao === "editar-item") {
      var contexto = configuracao.contexto;
      if (contexto.indice >= 0 && dadosFuncionais.itens[contexto.indice]) {
        registro.id = dadosFuncionais.itens[contexto.indice].id;
        dadosFuncionais.itens[contexto.indice] = registro;
      } else {
        registro.original = contexto.original;
        var posicao = dadosFuncionais.edicoesItens.findIndex(function (item) { return item.original === contexto.original; });
        if (posicao >= 0) dadosFuncionais.edicoesItens[posicao] = registro;
        else dadosFuncionais.edicoesItens.push(registro);
      }
    } else {
      dadosFuncionais[configuracao.colecao].push(registro);
    }
    salvarDadosFuncionais();
    renderizarDadosFuncionais();
  }

  function abrirFormularioAcao(acao) {
    if (acao === "fechamento") {
      abrirFechamentoCompleto();
      return;
    }
    if (acao === "comparacao") {
      abrirComparacaoMensal();
      return;
    }

    var configuracao = acao === "editar-item" ? configuracaoEditarItem() : configuracaoDaAcao(acao);
    if (!configuracao) {
      mostrarAviso(acao === "editar-item" ? "Selecione um item para editar." : "Ação indisponível.");
      return;
    }

    var base = criarBaseModal(configuracao.titulo);
    var formulario = document.createElement("form");
    formulario.className = "mini-form";
    var grade = document.createElement("div");
    grade.className = "form-grade";
    configuracao.campos.forEach(function (campo) { grade.appendChild(criarCampoFuncional(campo)); });
    formulario.appendChild(grade);

    var acoes = document.createElement("div");
    acoes.className = "topo-acoes";
    acoes.style.justifyContent = "flex-end";
    var cancelar = document.createElement("button");
    cancelar.type = "button";
    cancelar.className = "app-botao secundario";
    cancelar.textContent = "Cancelar";
    cancelar.addEventListener("click", function () { fecharModalFuncional(base.fundo); });
    var salvar = document.createElement("button");
    salvar.type = "submit";
    salvar.className = "app-botao";
    salvar.textContent = "Salvar";
    acoes.appendChild(cancelar);
    acoes.appendChild(salvar);
    formulario.appendChild(acoes);

    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
      if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
      }
      var registro = normalizarRegistro(configuracao, formulario);
      salvarRegistroDaAcao(acao, configuracao, registro);
      fecharModalFuncional(base.fundo);
      mostrarAviso(configuracao.sucesso);
    });

    base.modal.appendChild(formulario);
    var primeiro = formulario.querySelector("input, select, textarea");
    if (primeiro) primeiro.focus();
  }

  function criarCelula(linha, texto, classe) {
    var celula = document.createElement("td");
    celula.textContent = texto;
    if (classe) celula.className = classe;
    linha.appendChild(celula);
    return celula;
  }

  function removerRegistrosRenderizados(seletor) {
    document.querySelectorAll(seletor + " .registro-salvo").forEach(function (elemento) { elemento.remove(); });
  }

  function renderizarLancamentos() {
    var corpo = document.querySelector(".movimentacoes-financeiras tbody");
    if (!corpo) return;
    removerRegistrosRenderizados(".movimentacoes-financeiras tbody");
    dadosFuncionais.lancamentos.forEach(function (registro) {
      var linha = document.createElement("tr");
      linha.className = "registro-salvo";
      criarCelula(linha, formatarDataFuncional(registro.data));
      var tipo = document.createElement("td");
      var status = document.createElement("span");
      status.className = "status" + (registro.tipo === "Receita" ? "" : " alerta");
      status.textContent = registro.tipo;
      tipo.appendChild(status);
      linha.appendChild(tipo);
      criarCelula(linha, registro.categoria);
      criarCelula(linha, registro.descricao);
      criarCelula(linha, "Manual");
      criarCelula(linha, (registro.tipo === "Receita" ? "+ " : "− ") + formatarMoedaFuncional(registro.valor), registro.tipo === "Receita" ? "bom" : "valor-perda");
      corpo.appendChild(linha);
    });
    var rodape = document.querySelector(".movimentacoes-financeiras .tabela-rodape span");
    if (rodape) rodape.textContent = (4 + dadosFuncionais.lancamentos.length) + " movimentações exibidas";
  }

  function renderizarVendas() {
    var corpo = document.querySelector(".vendas-workspace .tabela-dados tbody");
    if (!corpo) return;
    removerRegistrosRenderizados(".vendas-workspace .tabela-dados tbody");
    dadosFuncionais.vendas.forEach(function (registro, indice) {
      var quantidade = Number(registro.quantidade || 0);
      var valor = Number(registro.valorUnitario || 0);
      var custoUnitario = Number(registro.custoUnitario || 0);
      var total = quantidade * valor;
      var custo = quantidade * custoUnitario;
      var linha = document.createElement("tr");
      linha.className = "registro-salvo";
      linha.dataset.data = registro.data || (registro.criadoEm ? registro.criadoEm.slice(0, 10) : hojeIso());
      criarCelula(linha, "#N" + String(indice + 1).padStart(2, "0"));
      criarCelula(linha, registro.criadoEm ? new Date(registro.criadoEm).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : horaAtual());
      criarCelula(linha, registro.item);
      criarCelula(linha, quantidade + " un.");
      criarCelula(linha, formatarMoedaFuncional(valor));
      criarCelula(linha, formatarMoedaFuncional(total), "bom");
      criarCelula(linha, formatarMoedaFuncional(custo));
      criarCelula(linha, formatarMoedaFuncional(total - custo), "bom");
      corpo.appendChild(linha);
    });
    var rodape = document.querySelector(".vendas-workspace .tabela-rodape span");
    if (rodape) rodape.textContent = (14 + dadosFuncionais.vendas.length) + " vendas registradas";
  }

  function renderizarPerdas() {
    var corpo = document.querySelector(".perdas-workspace .tabela-dados tbody");
    if (!corpo) return;
    removerRegistrosRenderizados(".perdas-workspace .tabela-dados tbody");
    dadosFuncionais.perdas.forEach(function (registro) {
      var total = Number(registro.quantidade || 0) * Number(registro.custoUnitario || 0);
      var linha = document.createElement("tr");
      linha.className = "registro-salvo";
      criarCelula(linha, formatarDataFuncional(registro.criadoEm ? registro.criadoEm.slice(0, 10) : hojeIso()) + " • " + (registro.criadoEm ? new Date(registro.criadoEm).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : horaAtual()));
      criarCelula(linha, registro.item);
      criarCelula(linha, registro.quantidade + " un.");
      criarCelula(linha, registro.motivo);
      criarCelula(linha, "Registro manual");
      criarCelula(linha, formatarMoedaFuncional(registro.custoUnitario));
      criarCelula(linha, formatarMoedaFuncional(total), "valor-perda");
      corpo.appendChild(linha);
    });
    var rodape = document.querySelector(".perdas-workspace .tabela-rodape span");
    if (rodape) rodape.textContent = (5 + dadosFuncionais.perdas.length) + " registros exibidos";
  }

  function preencherLinhaItem(linha, registro) {
    var lucro = Number(registro.preco || 0) - Number(registro.custo || 0);
    var baixo = Number(registro.quantidade || 0) <= Number(registro.minimo || 0);
    linha.innerHTML = "";
    var nome = criarCelula(linha, registro.nome);
    nome.className = "celula-principal";
    criarCelula(linha, registro.categoria);
    criarCelula(linha, registro.quantidade + " un.");
    criarCelula(linha, formatarMoedaFuncional(registro.custo));
    criarCelula(linha, formatarMoedaFuncional(registro.preco));
    criarCelula(linha, formatarMoedaFuncional(lucro), "bom");
    var statusCelula = document.createElement("td");
    var status = document.createElement("span");
    status.className = "status" + (baixo ? " alerta" : "");
    status.textContent = baixo ? "Estoque baixo" : "Disponível";
    statusCelula.appendChild(status);
    linha.appendChild(statusCelula);
    linha.dataset.minimo = registro.minimo;
  }

  function registroDaLinhaItem(linha) {
    return itemDaLinha(linha);
  }

  function atualizarDetalhesItem(registro) {
    var destaque = document.querySelector(".produtos-workspace .produto-destaque");
    if (!destaque || !registro) return;
    var titulo = destaque.querySelector("h2");
    var status = destaque.querySelector(".status");
    if (titulo) titulo.textContent = registro.nome;
    if (status) status.textContent = registro.quantidade + " unidades disponíveis";
    var metricas = document.querySelectorAll(".produtos-workspace .resumo-metricas strong");
    var lucro = Number(registro.preco || 0) - Number(registro.custo || 0);
    var margem = Number(registro.preco || 0) ? Math.round((lucro / Number(registro.preco)) * 100) : 0;
    if (metricas[0]) metricas[0].textContent = formatarMoedaFuncional(registro.custo);
    if (metricas[1]) metricas[1].textContent = formatarMoedaFuncional(registro.preco);
    if (metricas[2]) metricas[2].textContent = formatarMoedaFuncional(lucro);
    if (metricas[3]) metricas[3].textContent = margem + "%";
  }

  function ativarSelecaoItens() {
    document.querySelectorAll(".produtos-workspace tbody tr").forEach(function (linha) {
      if (linha.dataset.selecaoPronta) return;
      linha.dataset.selecaoPronta = "1";
      linha.style.cursor = "pointer";
      linha.addEventListener("click", function () {
        document.querySelectorAll(".produtos-workspace tbody tr").forEach(function (item) { item.classList.remove("linha-selecionada"); });
        linha.classList.add("linha-selecionada");
        atualizarDetalhesItem(registroDaLinhaItem(linha));
      });
    });
  }

  function renderizarItens() {
    var corpo = document.querySelector(".produtos-workspace .tabela-dados tbody");
    if (!corpo) return;
    removerRegistrosRenderizados(".produtos-workspace .tabela-dados tbody");

    dadosFuncionais.edicoesItens.forEach(function (registro) {
      var linhas = Array.prototype.slice.call(corpo.querySelectorAll("tr:not(.registro-salvo)"));
      var linha = linhas.find(function (item) { return (item.dataset.original || item.cells[0].textContent.trim()) === registro.original; });
      if (linha) {
        linha.dataset.original = registro.original;
        preencherLinhaItem(linha, registro);
      }
    });

    dadosFuncionais.itens.forEach(function (registro, indice) {
      var linha = document.createElement("tr");
      linha.className = "registro-salvo";
      linha.dataset.itemIndice = indice;
      preencherLinhaItem(linha, registro);
      corpo.appendChild(linha);
    });
    ativarSelecaoItens();
    var contador = document.querySelector(".produtos-workspace .modulo-cabecalho small");
    if (contador) contador.textContent = (4 + dadosFuncionais.itens.length) + " itens cadastrados • salvo neste navegador";
  }

  function renderizarCompromissos() {
    var lista = document.querySelector(".agenda-dia .linha-tempo");
    if (!lista) return;
    removerRegistrosRenderizados(".agenda-dia .linha-tempo");
    dadosFuncionais.compromissos.forEach(function (registro) {
      var linha = document.createElement("div");
      linha.className = "registro-salvo";
      var hora = document.createElement("time");
      hora.textContent = registro.hora || "--:--";
      var marcador = document.createElement("i");
      marcador.className = registro.categoria === "Compra" ? "compra" : registro.categoria === "Conta" ? "conta" : registro.categoria === "Promoção" ? "promocao" : "producao";
      var texto = document.createElement("span");
      var forte = document.createElement("strong");
      forte.textContent = registro.titulo;
      var detalhe = document.createElement("small");
      detalhe.textContent = formatarDataFuncional(registro.data) + (registro.detalhes ? " • " + registro.detalhes : "");
      texto.appendChild(forte);
      texto.appendChild(detalhe);
      linha.appendChild(hora);
      linha.appendChild(marcador);
      linha.appendChild(texto);
      lista.appendChild(linha);
    });
    var contador = document.querySelector(".agenda-dia .modulo-cabecalho small");
    if (contador) contador.textContent = (4 + dadosFuncionais.compromissos.length) + " compromissos";
  }

  function mostrarReceitaSalva(registro) {
    var ficha = document.querySelector(".ficha-tecnica");
    if (!ficha) return;
    var titulo = ficha.querySelector(".modulo-cabecalho h2");
    var subtitulo = ficha.querySelector(".modulo-cabecalho small");
    if (titulo) titulo.textContent = registro.nome;
    if (subtitulo) subtitulo.textContent = "Rende " + registro.rendimento + " " + registro.unidade;
    var corpo = ficha.querySelector("tbody");
    if (corpo) {
      corpo.innerHTML = "";
      String(registro.ingredientes || "").split(/\n|,/).filter(function (item) { return item.trim(); }).forEach(function (ingrediente) {
        var linha = document.createElement("tr");
        criarCelula(linha, ingrediente.trim());
        criarCelula(linha, "Informado no cadastro");
        criarCelula(linha, "—");
        criarCelula(linha, "—");
        corpo.appendChild(linha);
      });
    }
    var totais = ficha.querySelectorAll(".ficha-rodape strong");
    if (totais[2]) totais[2].textContent = formatarMoedaFuncional(registro.custo);
  }

  function renderizarReceitas() {
    var lista = document.querySelector(".receitas-workspace .lista-selecao");
    if (!lista) return;
    removerRegistrosRenderizados(".receitas-workspace .lista-selecao");
    var observacao = lista.querySelector(".receita-observacao");
    dadosFuncionais.receitas.forEach(function (registro) {
      var botao = document.createElement("button");
      botao.type = "button";
      botao.className = "item-selecao registro-salvo";
      var conteudo = document.createElement("span");
      var nome = document.createElement("strong");
      nome.textContent = registro.nome;
      var detalhe = document.createElement("small");
      detalhe.textContent = registro.rendimento + " " + registro.unidade + " • cadastrada agora";
      conteudo.appendChild(nome);
      conteudo.appendChild(detalhe);
      botao.appendChild(conteudo);
      botao.addEventListener("click", function () {
        lista.querySelectorAll(".item-selecao").forEach(function (item) { item.classList.remove("ativo"); });
        botao.classList.add("ativo");
        mostrarReceitaSalva(registro);
      });
      lista.insertBefore(botao, observacao);
    });
    var contador = lista.querySelector(".modulo-cabecalho small");
    if (contador) contador.textContent = (3 + dadosFuncionais.receitas.length) + " cadastradas";
  }

  function abrirResumoFuncional(titulo, itens) {
    var base = criarBaseModal(titulo);
    var grade = document.createElement("div");
    grade.className = "resumo-metricas";
    grade.style.marginTop = "20px";
    itens.forEach(function (item) {
      var bloco = document.createElement("div");
      var rotulo = document.createElement("small");
      rotulo.textContent = item[0];
      var valor = document.createElement("strong");
      valor.textContent = item[1];
      bloco.appendChild(rotulo);
      bloco.appendChild(valor);
      grade.appendChild(bloco);
    });
    base.modal.appendChild(grade);
    var fechar = document.createElement("button");
    fechar.type = "button";
    fechar.className = "app-botao largura-total";
    fechar.style.marginTop = "20px";
    fechar.textContent = "Fechar";
    fechar.addEventListener("click", function () { fecharModalFuncional(base.fundo); });
    base.modal.appendChild(fechar);
  }

  function abrirFechamentoCompleto() {
    var receitaNova = dadosFuncionais.vendas.reduce(function (total, venda) { return total + Number(venda.quantidade || 0) * Number(venda.valorUnitario || 0); }, 0);
    var custoNovo = dadosFuncionais.vendas.reduce(function (total, venda) { return total + Number(venda.quantidade || 0) * Number(venda.custoUnitario || 0); }, 0);
    var itensNovos = dadosFuncionais.vendas.reduce(function (total, venda) { return total + Number(venda.quantidade || 0); }, 0);
    var receita = 1240 + receitaNova;
    var custo = 486.2 + custoNovo;
    abrirResumoFuncional("Fechamento completo do dia", [
      ["Itens vendidos", String(72 + itensNovos)],
      ["Receita", formatarMoedaFuncional(receita)],
      ["Custo das vendas", formatarMoedaFuncional(custo)],
      ["Lucro estimado", formatarMoedaFuncional(receita - custo)],
      ["Vendas adicionadas", String(dadosFuncionais.vendas.length)]
    ]);
  }

  function abrirComparacaoMensal() {
    var totalSalvo = dadosFuncionais.perdas.reduce(function (total, perda) { return total + Number(perda.quantidade || 0) * Number(perda.custoUnitario || 0); }, 0);
    var atual = 147.6 + totalSalvo;
    var anterior = 168.5;
    var diferenca = atual - anterior;
    var percentual = anterior ? Math.abs(diferenca / anterior * 100) : 0;
    abrirResumoFuncional("Comparação mensal das perdas", [
      ["Mês atual", formatarMoedaFuncional(atual)],
      ["Mês anterior", formatarMoedaFuncional(anterior)],
      [diferenca <= 0 ? "Redução" : "Aumento", percentual.toFixed(1).replace(".", ",") + "%"],
      ["Diferença", formatarMoedaFuncional(Math.abs(diferenca))],
      ["Novos registros", String(dadosFuncionais.perdas.length)]
    ]);
  }

  function ativarAcoesFuncionais() {
    document.querySelectorAll("button, a").forEach(function (elemento) {
      var acao = acaoPorElemento(elemento);
      if (!acao || elemento.dataset.acaoPronta) return;
      elemento.dataset.acaoPronta = "1";
      elemento.addEventListener("click", function (evento) {
        evento.preventDefault();
        abrirFormularioAcao(acao);
      });
    });
  }

  function adicionarMensagemNaTela(tipo, texto, salvar) {
    var mensagens = document.querySelector("[data-mensagens]");
    if (!mensagens) return;
    var mensagem = document.createElement("div");
    mensagem.className = "mensagem " + tipo + " registro-salvo";
    mensagem.textContent = texto;
    mensagens.appendChild(mensagem);
    if (salvar !== false) {
      mensagens.scrollTop = mensagens.scrollHeight;
      mensagem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    if (salvar !== false) {
      dadosFuncionais.mensagensIA.push({ tipo: tipo, texto: texto, criadoEm: new Date().toISOString() });
      salvarDadosFuncionais();
    }
  }

  function respostaDaIA(pergunta) {
    var texto = pergunta.toLowerCase();
    var totalVendas = dadosFuncionais.vendas.reduce(function (total, venda) { return total + Number(venda.quantidade || 0) * Number(venda.valorUnitario || 0); }, 0);
    var totalLucro = dadosFuncionais.vendas.reduce(function (total, venda) { return total + Number(venda.quantidade || 0) * (Number(venda.valorUnitario || 0) - Number(venda.custoUnitario || 0)); }, 0);
    var totalPerdas = dadosFuncionais.perdas.reduce(function (total, perda) { return total + Number(perda.quantidade || 0) * Number(perda.custoUnitario || 0); }, 0);
    var itemBaixo = dadosFuncionais.itens.find(function (item) { return Number(item.quantidade || 0) <= Number(item.minimo || 0); });

    if (texto.indexOf("lucro") >= 0) return "O lucro líquido demonstrado do mês é de " + formatarMoedaFuncional(8750 + totalLucro) + ". As vendas registradas por você acrescentaram " + formatarMoedaFuncional(totalLucro) + " de lucro estimado.";
    if (texto.indexOf("acabando") >= 0 || texto.indexOf("estoque") >= 0) return itemBaixo ? itemBaixo.nome + " está com estoque baixo: " + itemBaixo.quantidade + " unidades para um mínimo de " + itemBaixo.minimo + "." : "O Pavê Tradicional continua sendo o item de atenção, com 6 unidades disponíveis.";
    if (texto.indexOf("perdi") >= 0 || texto.indexOf("perda") >= 0) return "As perdas da semana somam " + formatarMoedaFuncional(147.6 + totalPerdas) + ", incluindo " + formatarMoedaFuncional(totalPerdas) + " nos registros adicionados por você.";
    if (texto.indexOf("promo") >= 0 || texto.indexOf("sobra") >= 0) return "Uma boa opção é criar um combo de café com o item que mais sobrou e oferecer desconto leve no fim da tarde. Assim você reduz perdas sem derrubar muito a margem.";
    if (texto.indexOf("data comemorativa") >= 0 || texto.indexOf("próxima data") >= 0) return "Para a próxima data comemorativa, monte um kit de café com doce, uma caixa de brigadeiros ou uma promoção leve 3, pague 2.";
    if (texto.indexOf("venda") >= 0 || texto.indexOf("fatur") >= 0) return "O faturamento demonstrado é de " + formatarMoedaFuncional(24680 + totalVendas) + ". Você adicionou " + dadosFuncionais.vendas.length + " nova(s) venda(s) neste navegador.";
    if (texto.indexOf("compromisso") >= 0 || texto.indexOf("agenda") >= 0) return "Você possui " + dadosFuncionais.compromissos.length + " compromisso(s) adicionado(s). Use o Calendário para conferir os horários e detalhes.";
    return "Posso analisar vendas, lucro, estoque, perdas, agenda e promoções. Pergunte, por exemplo: quanto lucrei, qual item está acabando ou quanto perdi.";
  }

  function enviarMensagemParaIA(texto) {
    var pergunta = String(texto || "").trim();
    if (!pergunta) return;
    adicionarMensagemNaTela("usuario", pergunta, true);
    window.setTimeout(function () {
      adicionarMensagemNaTela("ia", respostaDaIA(pergunta), true);
    }, 350);
  }

  function ativarChatIA() {
    var mensagens = document.querySelector("[data-mensagens]");
    if (mensagens) {
      mensagens.querySelectorAll(".registro-salvo").forEach(function (item) { item.remove(); });
      dadosFuncionais.mensagensIA.forEach(function (item) { adicionarMensagemNaTela(item.tipo, item.texto, false); });
    }

    var formulario = document.querySelector(".chat-form");
    if (formulario && !formulario.dataset.chatPronto) {
      formulario.dataset.chatPronto = "1";
      formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        var campo = formulario.querySelector("input");
        if (!campo || !campo.value.trim()) return;
        enviarMensagemParaIA(campo.value);
        campo.value = "";
        campo.focus();
      });
    }

    document.querySelectorAll("[data-ia-sugestao]").forEach(function (botao) {
      if (botao.dataset.chatPronto) return;
      botao.dataset.chatPronto = "1";
      botao.addEventListener("click", function () { enviarMensagemParaIA(botao.textContent.trim()); });
    });
  }

  function renderizarDadosFuncionais() {
    renderizarLancamentos();
    renderizarVendas();
    renderizarPerdas();
    renderizarItens();
    renderizarCompromissos();
    renderizarReceitas();
    aplicarFiltrosDaPagina();
  }

  renderizarDadosFuncionais();
  ativarAcoesFuncionais();
  ativarChatIA();
})();
