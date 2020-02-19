import React, { Component } from 'react';

import Header from './Header';
import Card from './Card';
import Info from './Info';

export default class App extends Component {
  state = {
    limit: 12,
    offset: 0,
    pokemon: {
      results: [
        {
          name: 'Bulbasaur',
        },
        {
          name: 'Ivysaur',
        },
        {
          name: 'Venusaur',
        },
      ],
    },
    details: { name: '', powers: [], sprites: {} },
    isInfoShowing: false,
  };

  componentDidMount() {
    this.fetchPokemon();
  }

  fetchPokemon = async (
    url = `https://pokeapi.co/api/v2/pokemon/?limit=${this.state.limit}&offset=0`
  ) => {
    const res = await fetch(url).catch(error => console.log(error));
    const pokes = await res.json();
    this.setState({ pokemon: pokes });
    console.log(pokes);
  };

  previous = () => {
    if (!this.state.pokemon.previous) return;
    this.fetchPokemon(this.state.pokemon.previous);
  };

  next = () => {
    if (!this.state.pokemon.next) return;
    this.fetchPokemon(this.state.pokemon.next);
  };

  handleClose = () => {
    this.setState({ isInfoShowing: false });
  };

  select = async name => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    ).catch(error => console.log(error));
    const deets = await res.json();
    console.log(deets);
    this.setState({
      details: { name, powers: deets.abilities, sprites: deets.sprites },
    });
    this.setState({ isInfoShowing: true });
  };

  render() {
    const { pokemon, details, isInfoShowing } = this.state;
    return (
      <div className="App">
        <Header />

        <main id="main-content">
          {isInfoShowing ? (
            <Info details={details} close={this.handleClose} />
          ) : (
            <ul className="pokemon">
              {pokemon.results.map(poke => (
                <Card name={poke.name} key={poke.name} select={this.select} />
              ))}
            </ul>
          )}

          <button id="previous" className="btn" onClick={this.previous}>
            Previous
          </button>
          <button id="next" className="btn" onClick={this.next}>
            Next
          </button>
        </main>

        <img
          id="pikachu"
          className="hvr-hang"
          src="https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pikachu.png"
          alt="Pikachu"
        />
      </div>
    );
  }
}
