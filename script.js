let maxPokemon = 50;
const cardsContainer = document.getElementById("cards-container");
const searchInput = document.getElementById("search-input");
const numberFilter = document.getElementById("number");
const nameFilter = document.getElementById("name");
const notFoundMessage = document.getElementById("not-found-message");
const clearSearchButton = document.getElementById("clear-search-button");
const detailedOverlay = document.querySelector(".detailed-overlay");
const navBar = document.getElementById("nav-bar");

let allPokemons = [];
let allTypes = [];
let allWeights = [];
let allHeights = [];
let allStats = [];


function initialFetch() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxPokemon}`)
    .then((response) => response.json())
    .then((data) => {
        allPokemons = data.results;
        displayPokemons(allPokemons);
    })
}

initialFetch()

searchInput.addEventListener("keyup", handleSearch);
clearSearchButton.addEventListener("click", clearSearch);


async function fetchPokemonData(id) {
    try {
        const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => res.json());
        const types = pokemonData.types.map((typeObject) => typeObject.type.name);
        const weight = pokemonData.weight;
        const height = pokemonData.height;
        const stats = pokemonData.stats.map((statObject) => ({
            name: statObject.stat.name,
            value: statObject.base_stat
        }));

        allTypes.push(types);
        allWeights.push(weight);
        allHeights.push(height);
        allStats.push(stats);

        return { types, weight, height, stats}
    } catch(error) {
        console.error("Failed to fetch Pokemon data:", error);
        return null;
    }
}


async function displayPokemons(pokemonList) {
    cardsContainer.innerHTML = "";

    // Fetch all Pokemon data in parallel
    const pokemonDataPromises = pokemonList.map(pokemon => fetchPokemonData(pokemon.url.split("/")[6]));
    const pokemonDataArray = await Promise.all(pokemonDataPromises);

    pokemonDataArray.forEach((pokemonData, index) => {
        const pokemon = pokemonList[index];
        const pokemonID = pokemon.url.split("/")[6];
        const listItem = document.createElement("div");
        const pokemonName = capitalizeFirstLetter(pokemon.name);

        renderAllCards(pokemon, pokemonID, listItem, pokemonName);

        listItem.addEventListener("click", async() => {
            const success = await fetchPokemonData(pokemonID);
            if(success) {
                let pokemonSelector = pokemonID - 1;
                let type_first = allTypes[pokemonSelector][0];
                let type_second = allTypes[pokemonSelector][1] || "";
                showDetailedOverlay(pokemonID, pokemonName, type_first, type_second);
            }
        });

        cardsContainer.appendChild(listItem);
    });
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    let filteredPokemons;

    if(searchTerm == 1 || searchTerm == 2 || searchTerm == 3 || searchTerm == 4 || searchTerm == 5
        || searchTerm == 6 || searchTerm == 7 || searchTerm == 8 || searchTerm == 9 || searchTerm == 0) {
        filteredPokemons = allPokemons.filter((pokemon) => {
            const pokemonID = pokemon.url.split("/")[6];
            return pokemonID.startsWith(searchTerm);
        });
    } else {
        filteredPokemons = allPokemons.filter((pokemon) => {
            return pokemon.name.toLowerCase().startsWith(searchTerm)
        });
    }

    displayPokemons(filteredPokemons);

    if (filteredPokemons.length === 0) {
        notFoundMessage.style.display = "block";
    } else {
        notFoundMessage.style.display = "none";
    }
}


function clearSearch() {
    searchInput.value = "";
    displayPokemons(allPokemons);
    notFoundMessage.style.display = "none";
}


async function showDetailedOverlay(pokemonID, pokemonName, 
    type_first, type_second) {

    detailedOverlay.style.display = "flex";
    document.documentElement.classList.add("remove-scrolling");
    navBar.style.display = "none";

    const cardDisplay = document.querySelector(".card-display");
    
    try {
        const { types, weight, height, stats } = await fetchPokemonData(pokemonID);

        const type_first = types[0];
        const type_second = types[1] || "";
        const pokemonWeight = allWeights[pokemonID-1] / 10;
        const pokemonHeight = allHeights[pokemonID-1] * 10;

        const hpValue = stats.find(stat => stat.name === "hp")?.value || 0;
        const attackValue = stats.find(stat => stat.name === "attack")?.value || 0;
        const defenseValue = stats.find(stat => stat.name === "defense")?.value || 0;
        const spAttackValue = stats.find(stat => stat.name === "special-attack")?.value || 0;
        const spDefenseValue = stats.find(stat => stat.name === "special-defense")?.value || 0;
        const speedValue = stats.find(stat => stat.name === "speed")?.value || 0;

        renderDeatailedCard(pokemonID, pokemonName, cardDisplay, type_first, type_second, pokemonWeight, pokemonHeight, hpValue, attackValue, defenseValue, spAttackValue, spDefenseValue, speedValue);
        
    } catch (error) {
        console.error("Error fetching Pokemon data:", error);
    } 
}


function hideDetailedOverlay(event) {
    detailedOverlay.style.display = "none";
    document.documentElement.classList.remove("remove-scrolling");
    navBar.style.display = "flex";
}


function stopPropagation(event) {
    event.stopPropagation();
}


function nextPokemonRight(pokemonID) {
    if(pokemonID < maxPokemon) {
        const newPokemonID = pokemonID + 1; 
        const newPokemonName = allPokemons[pokemonID]["name"];
        const pokemonName = capitalizeFirstLetter(newPokemonName);
        const type_first = allTypes[pokemonID][0];
        let type_second = "";

        if(allTypes[pokemonID][1]) {
            type_second = allTypes[pokemonID][1];
        }

        pokemonID = newPokemonID;
        showDetailedOverlay(pokemonID, pokemonName, type_first, type_second);
    } else {
        const newPokemonID = 1; 
        const newPokemonName = allPokemons[1]["name"];
        const pokemonName = capitalizeFirstLetter(newPokemonName);
        const type_first = allTypes[pokemonID][0];
        let type_second = "";

        if(allTypes[pokemonID][1]) {
            type_second = allTypes[pokemonID][1];
        }

        pokemonID = newPokemonID;
        showDetailedOverlay(pokemonID, pokemonName, type_first, type_second);
    }
}


function nextPokemonLeft(pokemonID) {
    let maxPokemonSelector = maxPokemon - 1;

    if (pokemonID > 1) {
        const newPokemonID = pokemonID - 1;
        const pokemonSelector = pokemonID - 2;

        let newPokemonName, type_first, type_second;
        if (pokemonSelector >= 0) {
            newPokemonName = allPokemons[pokemonSelector]["name"];
            type_first = allTypes[pokemonSelector][0];
            type_second = allTypes[pokemonSelector][1] || ""; 
        } else {
            newPokemonName = allPokemons[maxPokemonSelector]["name"];
            type_first = allTypes[maxPokemonSelector][0];
            type_second = allTypes[maxPokemonSelector][1] || ""; 
        }

        const pokemonName = capitalizeFirstLetter(newPokemonName);

        pokemonID = newPokemonID;
        showDetailedOverlay(pokemonID, pokemonName, type_first, type_second);
    } else {
        const newPokemonID = maxPokemon; 
        const newPokemonName = allPokemons[maxPokemonSelector]["name"];
        const pokemonName = capitalizeFirstLetter(newPokemonName);
        const type_first = allTypes[maxPokemonSelector][0];
        const type_second = allTypes[maxPokemonSelector][1] || "";

        pokemonID = newPokemonID;
        showDetailedOverlay(pokemonID, pokemonName, type_first, type_second);
    }
}


function addMorePokemon() {
    if (maxPokemon <= 200) {
        maxPokemon += 50;
        initialFetch()
    } else {
        alert("no more pokemon to load! U got them all!")
    }
}


