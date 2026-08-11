const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const container = document.getElementById("pokemonDetail");

pokeApi.getPokemons(id - 1, 1).then((pokemons) => {
  const pokemon = pokemons[0];
  container.innerHTML = `
    <div class="card ${pokemon.type}">
      <div class="top">
        <h1 class="name">${pokemon.name}</h1>
        <span class="number">#${pokemon.number}</span>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <ul class="types">${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}</ul>
      </div>
      <div class="bottom">
        <div class="tabs">
          <button class="active" type="button" onclick="showTab('about', this)">Sobre</button>
          <button type="button" onclick="showTab('stats', this)">Status</button>
        </div>
        <div class="tab-content" id="about">
          <p><strong>Altura</strong><br>${pokemon.height / 10} m</p>
          <p><strong>Peso</strong><br>${pokemon.weight / 10} kg</p>
        </div>
        <div class="tab-content hidden" id="stats">
          ${pokemon.stats.map(stat => `<div class="stat"><div class="stat-info"><span>${stat.name.replace('-', ' ')}</span><span class="stat-value">${stat.value}</span></div><div class="bar"><div class="fill" style="width: ${Math.min(stat.value / 2, 100)}%"></div></div></div>`).join('')}
        </div>
      </div>
    </div>`;
}).catch(() => { container.innerHTML = '<p>Não foi possível carregar este Pokémon.</p>'; });

function showTab(tab, button) {
  document.getElementById('about').classList.add('hidden');
  document.getElementById('stats').classList.add('hidden');
  document.getElementById(tab).classList.remove('hidden');
  document.querySelectorAll('.tabs button').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
}
