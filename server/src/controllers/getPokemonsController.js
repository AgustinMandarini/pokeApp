const axios = require("axios");

const getPokemonsController = async (url) => {
  const response = await axios(url);
  const data = response.data;
  const pokemonsPromises = data.results.map(async (pokemon) => {
    const detailsResponse = await axios(pokemon.url);
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    return {
      name: name,
      base_experience: detailsResponse.data.base_experience,
      height: detailsResponse.data.height,
      weight: detailsResponse.data.weight,
      image:
        detailsResponse.data.sprites.other["official-artwork"].front_default,
      abilities: detailsResponse.data.abilities
        .map((elem) => elem.ability.name)
        .join(", "),
    };
  });
  const pokemons = await Promise.all(pokemonsPromises);

  return pokemons;
};

module.exports = {
  getPokemonsController,
};
