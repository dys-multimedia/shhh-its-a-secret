import React from 'react';

export default function Card({ name, select }) {
  return (
    <li className="poke-card" onClick={() => select(name)}>
      <h3>{name}</h3>
    </li>
  );
}
