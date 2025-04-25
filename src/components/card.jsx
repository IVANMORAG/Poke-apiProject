// Card.jsx
import React from 'react';
import PokeballImage from '../assets/icons/pokeball.png';
import {searchIcon} from '../utils/icons';

export default class Card extends React.Component {
  render() {
    const {pokemon} = this.props;
    const pokemonType = pokemon.types[0].type.name;
    
    return (
      <div className='card'>
        <div className='card__title'>
          <img className='card__title-img' src={PokeballImage} alt="" />
          <span className='card__title-text'></span>
        </div>
        <div className="card__badge">
          <img className='card__badge-Icon' src={searchIcon(pokemonType)} alt="" />
          <span className='card__badge-text'>{pokemonType}</span>
        </div>
        <img className='card__image' src={pokemon.sprites['front_default']} alt="" loading='lazy'/>
        <h3>{pokemon.name}</h3>
        
        <div className="pokemon-stats">
          <div className="stat-row">
            <span>Hp</span>
            <div className="stat-bar">
              <div className="stat-fill hp" style={{width: `${Math.min(pokemon.stats[0].base_stat, 100)}%`}}></div>
            </div>
          </div>
          <div className="stat-row">
            <span>Attack</span>
            <div className="stat-bar">
              <div className="stat-fill attack" style={{width: `${Math.min(pokemon.stats[1].base_stat, 100)}%`}}></div>
            </div>
          </div>
          <div className="stat-row">
            <span>Defense</span>
            <div className="stat-bar">
              <div className="stat-fill defense" style={{width: `${Math.min(pokemon.stats[2].base_stat, 100)}%`}}></div>
            </div>
          </div>
          <div className="stat-row">
            <span>Special Attack</span>
            <div className="stat-bar">
              <div className="stat-fill special-attack" style={{width: `${Math.min(pokemon.stats[3].base_stat, 100)}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}