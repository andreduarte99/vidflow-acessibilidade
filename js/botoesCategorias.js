const botoesCategorias = document.querySelectorAll(".botao-categoria");

botoesCategorias.forEach((botao) => {
  botao.addEventListener("click", () => {
    const categoriaSelecionada = botao.getAttribute("name");
    associarPainel(categoriaSelecionada);
    filtrarPorCategoria(categoriaSelecionada);
    atualizarEstadosDosBotoes(categoriaSelecionada);
  });

  botao.addEventListener("keydown", mudarFocoPorTeclado);
});

function associarPainel(categoriaSelecionada) {
  const painelVideos = document.querySelector('[role="tabpanel"]');
  const idBotao = document.querySelector(`[name="${categoriaSelecionada}"]`);

  painelVideos.setAttribute("aria-labelledby", idBotao);
}

function filtrarPorCategoria(filtro) {
  const videos = document.querySelectorAll(".videos__item");

  for (const video of videos) {
    const categoria = video
      .querySelector(".categoria")
      .textContent.toLowerCase();
    const valorFiltro = filtro.toLowerCase();

    const mostrarVideo =
      valorFiltro === "tudo" || categoria.includes(valorFiltro);

    video.classList.toggle("escondido", !mostrarVideo);
  }
}

function atualizarEstadosDosBotoes(categoriaSelecionada) {
  botoesCategorias.forEach((botao) => {
    const botaoFoiSelecionado =
      botao.getAttribute("name") === categoriaSelecionada;

    //botao.classList.toggle("selecionado", botaoFoiSelecionado);
    botao.ariaSelected = botaoFoiSelecionado;
    botao.setAttribute("tabindex", botaoFoiSelecionado ? 0 : -1);
  });
}

const tablist = document.querySelector('[role="tablist"]');

function mudarFocoPorTeclado(evento) {
  const botaoAtual = evento.target;
  let novoBotao;

  switch (evento.key) {
    case "ArrowRight":
      evento.preventDefault();
      if (botaoAtual === tablist.lastElementChild) {
        novoBotao = tablist.firstElementChild;
      } else {
        novoBotao = botaoAtual.nextElementSibling;
      }
      break;
    case "ArrowLeft":
      evento.preventDefault();
      if (botaoAtual === tablist.firstElementChild) {
        novoBotao = tablist.lastElementChild;
      } else {
        novoBotao = botaoAtual.previousElementSibling;
      }
      break;
    case "Home":
      novoBotao = tablist.firstElementChild;
      break;
    case "End":
      novoBotao = tablist.lastElementChild;
      break;
  }

  novoBotao.focus();
  novoBotao.scrollIntoView({
    behavior: "smooth",
  });
}
