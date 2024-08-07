function renderDeatailedCard(
    pokemonID, pokemonName, cardDisplay, type_first, 
    type_second, pokemonWeight, pokemonHeight, hpValue, 
    attackValue, defenseValue, spAttackValue, 
    spDefenseValue, speedValue) {
    
    cardDisplay.innerHTML = /*html*/ `
            <div class="detailed-card border-${type_first}" onclick="stopPropagation(event)">
                <div class="${type_first}">
                    <!-- ID -->
                    <div class="detailed-number-container">
                        <p class="nr-text">id. ${pokemonID}</p>

                        <!-- NAME -->
                        <div class="name-container">
                            <p>${pokemonName}</p>
                        </div>

                        <div class="close-button" onclick="hideDetailedOverlay()">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                    </div>
    
                    <!-- IMG -->
                    <div class="detailed-img-container">
                        <div onclick="nextPokemonLeft(${pokemonID})" class="ui-arrow-left" id="left-arrow">
                            <i class="fa-solid fa-chevron-left"></i>
                        </div>
                        <div class="img-spacer-container">
                            <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemonName}"/>
                        </div>
                        <div onclick="nextPokemonRight(${pokemonID})" class="ui-arrow-right" id="right-arrow">
                            <i class="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                </div>

                <!-- TYPES / WEIGHT / HEIGHT -->
                <div class="description-container">
                    <div class="sub-description-container">
                        <p>Type:</p> 
                        <p class="type-indicator ${type_first}">${type_first}</p> 
                        <p class="type-indicator ${type_second}">${type_second}</p>
                    </div>
                    
                    
                    <!-- weight -->
                    <div class="sub-description-container">
                        <p><i class="fa-solid fa-weight-hanging"></i> :</p> 
                        <p class="description-text">${pokemonWeight} kg</p>
                    </div>

                    <!-- height -->
                    <div class="sub-description-container">
                        <p><i class="fa-solid fa-ruler-combined"></i> :</p> 
                        <p class="description-text">${pokemonHeight} cm</p>
                    </div>
                </div>

                <!-- STATS -->
                <div class="stats-container">
                    <div class="stats-header">
                        <hr>
                        <h2>STATS</h2> 
                        <hr>
                    </div>

                    <div class="stat-line">
                        <p class="stat-label">HP</p><progress value="${hpValue}" max="200"></progress><p>${hpValue}</p>
                    </div> 
                    <div class="stat-line">
                        <p class="stat-label">Atk</p><progress value="${attackValue}" max="200"></progress><p>${attackValue}</p>
                    </div> 
                    <div class="stat-line">
                        <p class="stat-label">Def</p><progress value="${defenseValue}" max="200"></progress><p>${defenseValue}</p>
                    </div> 
                    <div class="stat-line">
                        <p class="stat-label">Sp. Atk</p><progress value="${spAttackValue}" max="200"></progress><p>${spAttackValue}</p>
                    </div> 
                    <div class="stat-line">
                        <p class="stat-label">Sp. Def</p><progress value="${spDefenseValue}" max="200"></progress><p>${spDefenseValue}</p>
                    </div> 
                    <div class="stat-line">
                        <p class="stat-label">Speed</p><progress value="${speedValue}" max="200"></progress><p>${speedValue}</p>
                    </div> 

                </div>
            </div>     
        `;
}


function renderAllCards(pokemon, pokemonID, listItem, pokemonName) {
    listItem.className = "list-item";
    listItem.innerHTML = /*html*/ `
        <div class="card wiggle">
            <!-- NUMBER -->
            <div class="number-container">
                <p class="caption-fonts">nr. ${pokemonID}</p>
            </div>

            <!-- IMG -->
            <div class="img-container">
                <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}"/>
            </div>

            <!-- NAME -->
            <div class="name-container">
                <p>${pokemonName}</p>
            </div>
        </div>     
    `;
}
