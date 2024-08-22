import React from "react";

export default function Navbar() {
  return (
    <nav>
      <img className="poke" src="poke.png" alt="Pokedex" />

      <input type="text" placeholder="Search for Pokemon" />
      <img src="pokeball.png" alt="" />
    </nav>
  );
}
