const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const searchInput = document.getElementById("searchInput");

const maxRecords = 151;
const limit = 10;
let offset = 0;
let loadedPokemons = [];

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}" tabindex="0" role="link" onclick="goToPokemon(${pokemon.number})" onkeydown="if(event.key === 'Enter') goToPokemon(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => 
                        `<li class="type ${type}">${type}</li>`).join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  loadMoreButton.disabled = true;
  loadMoreButton.textContent = "Carregando...";
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    loadedPokemons = [...loadedPokemons, ...pokemons];
    renderPokemons();
  }).catch(() => {
    loadMoreButton.textContent = "Tentar novamente";
  }).finally(() => {
    if (document.body.contains(loadMoreButton)) {
      loadMoreButton.disabled = false;
      loadMoreButton.innerHTML = 'Carregar mais <span aria-hidden="true">↓</span>';
    }
  });
}

function renderPokemons() {
  const query = searchInput.value.trim().toLowerCase();
  const visiblePokemons = loadedPokemons.filter(({ name, number }) =>
    name.includes(query) || String(number).includes(query)
  );
  pokemonList.innerHTML = visiblePokemons.map(convertPokemonToLi).join("");
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

searchInput.addEventListener("input", renderPokemons);

/* function ir para pagina de detalhes */
function goToPokemon(id) {
  window.location.href = `pokemon.html?id=${id}`;
}
