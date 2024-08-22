// Modal.js
import React from "react";

function Modal({ card, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card">
        <p className="hp">
          <span>HP</span>
          {/* {card.stats[0].base_stat} */}60
        </p>
        <img src="pikachuu.png" alt="" />
        <h2 className="poke-name">Pikachu</h2>
        <div className="typ">
          {/* {card.types.map((type, typeIndex) => (
            <div className="types" key={typeIndex}>
              <span>{type.type.name}</span>
            </div>
          ))} */}
          <div className="types">
            <span>Electric</span>
          </div>
        </div>
        <div className="stats">
          <div>
            <h3>60</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3> 45</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>80</h3>
            <p>Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
