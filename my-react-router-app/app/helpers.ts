// --- API / API data ---
const apiURL = "https://pokeapi.co/api/v2/pokemon";

// gets pikachu JSON file then displays pikachu's data
export async function getJSON() {

    try {

        // get response
        const response = await fetch(`${apiURL}?limit=10000`)

        // check response
        if (!response.ok) {

            throw new Error(`response status = ${response.status}`);

        };

        // get pikachu data from JSON
        const pokemonData = await response.json();

        return pokemonData

    }

    // if there is an error getting the json
    catch(err) {

        console.error(err)
    
    };

};