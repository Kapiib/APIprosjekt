function searchPokemon() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayPokemonInfo(data);
        })
        .catch(error => {
            document.getElementById('pokemonInfo').innerHTML = 'Pokemon not found!';
        });
}

function displayPokemonInfo(pokemonData) {
    const pokemonInfoDiv = document.getElementById('pokemonInfo');
    const capitalizedPokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    pokemonInfoDiv.innerHTML = `
        <h2>Name: ${capitalizedPokemonName}</h2>
        <p>Height: ${pokemonData.height}</p>
        <p>Weight: ${pokemonData.weight}</p>
        <p>Abilities:</p>
        <ul>
            ${pokemonData.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
        </ul>
    `;
}
