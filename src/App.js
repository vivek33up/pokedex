import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";

function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);
  const [card, setCard] = useState(false);
  const [poke, setPoke] = useState("");
  // const [searchedPokemon, setSearchedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=150`
        );
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
  function handleCard(pokemon) {
    setCard(pokemon);
  }
  function handleClose() {
    setCard(false);
  }

  async function search(poke) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`
      );
      const searchedPokemonData = response.data;
      // setSearchedPokemon(searchedPokemonData);
      console.log(searchedPokemonData);
      setCard(searchedPokemonData); // Display the searched Pokemon card
    } catch (error) {
      console.error("Error searching for Pokémon:", error);
      // setSearchedPokemon(null);
    }
  }

  return (
    <body>
      <nav>
        <a href="https://www.textstudio.com/">
          {" "}
          <img className="poke" src="poke.png" alt="Pokedex" />
        </a>

        <input
          type="text"
          placeholder="Search for Pokemon"
          value={poke}
          onChange={(e) => setPoke(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(poke);
            }
          }}
        />
        <a href="https://pokeapi.co/">
          <img src="pokeball.png" alt="" />
        </a>
      </nav>
      {!card && (
        <header>
          {pokemonData.map((pokemon, index) => (
            <div
              className="card"
              onClick={() => handleCard(pokemon)}
              key={index}
            >
              <p className="hp">
                <span>HP</span>
                {pokemon.stats[0].base_stat}
              </p>
              <img src={pokemon.sprites.front_shiny} alt="" />
              <h2 className="poke-name">{pokemon.name}</h2>
              <div className="typ">
                {pokemon.types.map((type, typeIndex) => (
                  <div className="types" key={typeIndex}>
                    <span>{type.type.name}</span>
                  </div>
                ))}
              </div>
              <div className="stats">
                <div>
                  <h3> {pokemon.stats[1].base_stat}</h3>
                  <p>Attack</p>
                </div>
                <div>
                  <h3> {pokemon.stats[2].base_stat}</h3>
                  <p>Defense</p>
                </div>
                <div>
                  <h3> {pokemon.stats[5].base_stat}</h3>
                  <p>Speed</p>
                </div>
              </div>
            </div>
          ))}

          {/* Modal Card */}
        </header>
      )}
      {card && (
        <div className="modal-overlay">
          <div className="card">
            <button className="close-button" onClick={handleClose}>
              &times;
            </button>
            <p className="hp">
              <span>HP</span>
              {card.stats[0].base_stat}
            </p>
            <img src={card.sprites.front_default} alt="" />
            <h2 className="poke-name">{card.name}</h2>
            <div className="typ">
              {card.types.map((type, typeIndex) => (
                <div className="types">
                  <span>{type.type.name}</span>
                </div>
              ))}
            </div>
            <div className="stats">
              <div>
                <h3>{card.stats[1].base_stat}</h3>
                <p>Attack</p>
              </div>
              <div>
                <h3> {card.stats[2].base_stat}</h3>
                <p>Defense</p>
              </div>
              <div>
                <h3>{card.stats[5].base_stat}</h3>
                <p>Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </body>
  );
}

export default PokemonList;
