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

    // Get sprite image URL from the "art" folder
    const spriteUrl = `art/${pokemonData.id}.png`;

    // Convert height from decimeters to feet and inches
    const totalInches = pokemonData.height * 3.93701;
    const feet = parseInt(totalInches / 12); // Extract feet without rounding
    const inches = totalInches % 12; // Extract remaining inches

    // Convert weight from hectograms to pounds
    const weightInLbs = (pokemonData.weight) * 0.220462;

    // Get type images from the "types" folder
    const typeImages = pokemonData.types.map(type => `types/${type.type.name}.png`);

    pokemonInfoDiv.innerHTML = `
        <h2>ID: ${pokemonData.id}</h2>
        <h2>Name: ${capitalizedPokemonName}</h2>
        <img src="${spriteUrl}" alt="${capitalizedPokemonName}">
        <p class="height">Height: ${feet}' ${inches.toFixed()}"</p>
        <p class="weight">Weight: ${weightInLbs.toFixed(2)} lbs</p>
        <p class="types">Types:</p>
        <ul class="typesImg">
            ${pokemonData.types.map((type, index) => `<li><img src="${typeImages[index]}" alt="${type.type.name}"></li>`).join('')}
        </ul>
        <p class="moves">Moves:</p>
        <ul class="abilities">
            ${pokemonData.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
        </ul>
    `;
}
