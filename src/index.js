import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

const Pokedex = require('pokeapi-js-wrapper');

const PokeClient = new Pokedex.Pokedex({
  protocol: 'https',
  cache: true,
  timeout: 5000,
});

function App() {
  const [offset, setOffset] = useState(0);
  const [pokeList, setPokeList] = useState([]);
  const [details, setDetails] = useState({ name: '', powers: [], sprites: {} });
  const [isInfoShowing, setIsInfoShowing] = useState(false);

  useEffect(() => {
    fetchPokemon({ limit: 12, offset });
  }, [offset]); // Only re-run the effect if offset changes

  const fetchPokemon = async interval => {
    const pokes = await PokeClient.getPokemonsList(interval).catch(error =>
      console.log(error)
    );
    const results = pokes.results;
    setPokeList(results);
    console.log(results);
  };

  const previous = () => {
    offset >= 12 ? setOffset(prevState => prevState - 12) : setOffset(0);
  };
  const next = () => {
    setOffset(prevState => prevState + 12);
  };
  const select = async name => {
    const deets = await PokeClient.getPokemonByName(name).catch(error =>
      console.log(error)
    );
    console.log(deets);
    setDetails({ name, powers: deets.abilities, sprites: deets.sprites });
    setIsInfoShowing(true);
  };

  return (
    <div className="App">
      <div className="header">
        <img
          className="header-logo"
          src="https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pokedex.png"
          alt="pokedex logo"
        />
        <h1>Pok&eacute;dex</h1>
      </div>

      <div id="main-content">
        {isInfoShowing ? (
          <div className="poke-card info">
            <img src={details.sprites.front_default} alt="" />
            <h2>{details.name}</h2>
            <p>Powers:</p>
            {details.powers.map(power => (
              <h4 key={power.ability.name}>{power.ability.name}</h4>
            ))}
            <button
              className="btn close"
              onClick={() => setIsInfoShowing(false)}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <ul className="pokemon">
              {pokeList.map(poke => (
                <li
                  className="poke-card"
                  key={poke.name}
                  onClick={() => select(poke.name)}
                >
                  <h3>{poke.name}</h3>
                </li>
              ))}
            </ul>
            <button id="previous" className="btn" onClick={previous}>
              Previous
            </button>
            <button id="next" className="btn" onClick={next}>
              Next
            </button>
          </>
        )}
      </div>

      <img
        id="pikachu"
        className="hvr-hang"
        src="https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pikachu.png"
        alt="Pikachu"
      />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
