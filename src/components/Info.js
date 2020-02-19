import React from 'react';

export default function Info({ details, close }) {
  return (
    <div className="poke-card info">
      <img src={details.sprites.front_default} alt="" />
      <h2>{details.name}</h2>
      <p>Powers:</p>
      {details.powers.map(power => (
        <h4 key={power.ability.name}>{power.ability.name}</h4>
      ))}
      <button className="btn close" onClick={close}>
        Close
      </button>
    </div>
  );
}
