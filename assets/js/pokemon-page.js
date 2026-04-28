/*
    Pegamndo os parâmetros da URL
    Exemplo: pokemon.html?id=1
*/
const params = new URLSearchParams(window.location.search);

/*
    Pegando o ID do pokemon
*/
const id = params.get("id");

/*
   Pegando a div onde vamos colocar o conteúdo
*/
const container = document.getElementById("pokemonDetail");

/*
    Buscar o pokemon na API

    Estamos reutilizando sua função:
    getPokemons(offset, limit)

    Para pegar só 1:
    offset = id - 1
    limit = 1
*/
pokeApi.getPokemons(id - 1, 1).then((pokemons) => {
  const pokemon = pokemons[0];

  /*
    Inserimos o HTML na tela
    */
  container.innerHTML = `
    <div class="card ${pokemon.type}">

        <div class="top">
            <h1 class="name">${pokemon.name}</h1>
            <span class="number">#${pokemon.number}</span>

            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>

        <div class="bottom">
            <div class="tabs">
                <button onclick="showTab('about')">About</button>
                <button onclick="showTab('stats')">Stats</button>
            </div>

            <div class="tab-content" id="about">
                <p><strong>Height:</strong> ${pokemon.height}</p>
                <p><strong>Weight:</strong> ${pokemon.weight}</p>
            </div>

            <div class="tab-content hidden" id="stats">
                ${pokemon.stats.map(stat => `
                    <div class="stat">
                        <span>${stat.name}</span>
                        <div class="bar">
                            <div class="fill" style="width: ${stat.value / 2}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

    </div>
`;
  setTimeout(() => {
    document.querySelectorAll('.fill').forEach(bar => {
      bar.style.width = bar.dataset.value + '%'
    })
  }, 100);
});
/* Mostra uma aba e esconde a outra*/
function showTab(tab) {
    document.getElementById('about').classList.add('hidden')
    document.getElementById('stats').classList.add('hidden')
    document.getElementById(tab).classList.remove('hidden')
}