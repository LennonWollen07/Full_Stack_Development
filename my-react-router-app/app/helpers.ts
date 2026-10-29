// --- API / API data ---
const apiURL = "http://localhost:3000/pokemon";
const apiURL2 = "http://localhost:3000/2pokemon";

// gets JSON file then displays the data
export async function getPokemon(pokemonName : string) {

    try {

        // get response
        const response = await fetch(`${apiURL}?name=${pokemonName}`)

        // check response
        if (!response.ok) {

            throw new Error(`response status = ${response.status}`);

        };

        // get data from JSON
        const pokemonData = await response.json();

        return pokemonData

    }

    // if there is an error getting the json
    catch(err) {

        console.error(err)
    
    };

};

// gets JSON file then displays the data
export async function getTwoPokemon() {

    try {

        // get response
        const response = await fetch(`${apiURL2}`)

        // check response
        if (!response.ok) {

            throw new Error(`response status = ${response.status}`);

        };

        // get data from JSON
        const twoPokemonData = await response.json();

        return twoPokemonData

    }

    // if there is an error getting the json
    catch(err) {

        console.error(err)
    
    };

};