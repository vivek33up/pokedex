import React, { useEffect, useState } from "react";
import axios from "axios";

function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?`);
        const results = response.data.results;

        const pokemonPromises = results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          console.log(pokemonResponse);
          return pokemonResponse.data;
        });

        const pokemonDetails = await Promise.all(pokemonPromises);
        setPokemonData(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div>
      <h1>Pokémon List</h1>
      <ul>
        {pokemonData.map((pokemon, index) => (
          <li key={index}>
            <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
            <div>
              <h2>{pokemon.name}</h2>
              <p>Types:</p>
              <ul>
                {pokemon.types.map((type, typeIndex) => (
                  <li key={typeIndex}>{type.type.name}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
