const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos() {
  try {
    const busca = await fetch(
      "https://gist.githubusercontent.com/andreduarte99/c4efbdee8461151fa9103e8ef6d7fe32/raw/5e282d6d92d2838c257735e1a174ebfd00c058b0/videos.txt"
    );
    const videos = await busca.json();

    console.log(videos);

    videos.forEach((video) => {
      if (video.categoria === "") {
        throw new Error("Vídeo não tem categoria");
      }
      containerVideos.innerHTML += `
        <li class="videos__item">
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
                <a class="link-img-canal" href="#">
                    <img src="${video.imagem}" alt="Canal ${video.canal}">
                </a>
                <a href="#">
                    <h3 class="titulo-video">${video.titulo}</h3>
                </a>
                <p class="titulo-canal">${video.descricao}</p>
                <p class="categoria" hidden>${video.categoria}</p>
            </div>
        </li>
      `;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`;
  }
}

buscarEMostrarVideos();
