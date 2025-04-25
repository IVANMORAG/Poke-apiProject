import React from 'react';
import {searchIcon} from '../utils/icons';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal() {
    this.props.onHandleModal();
  }

  getTypeColor(type) {
    const typeColors = {
      normal: '#A8A878',
      fighting: '#C03028',
      flying: '#A890F0',
      poison: '#A040A0',
      ground: '#E0C068',
      rock: '#B8A038',
      bug: '#A8B820',
      ghost: '#705898',
      steel: '#B8B8D0',
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      psychic: '#F85888',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      fairy: '#EE99AC'
    };
    
    return typeColors[type] || '#A8A878';
  }

  render() {
    const pokemon = this.props.pokemon;
    const mainType = pokemon.types[0].type.name;
    
    return (
      <div className='modal'>
        <button className='modal__close' onClick={this.handleModal}>Close X</button>
        <div className='modal__content'>
          <div className="modal__content-features" style={{backgroundColor: this.getTypeColor(mainType)}}>
            <div className="modal__content-featuresRight">
              <span className='modal__content-featuresHabitat'>
                <img className='modal__content-featuresImage' src={searchIcon(mainType)} alt="" />
              </span>
              {pokemon['past_types'] && pokemon['past_types'].length > 0 && 
                <span className='modal__content-featuresGeneration'>{pokemon['past_types'][0].generation.name}</span>
              }
            </div>
            <div className="modal__content-featuresLeft">
              <span className='modal__content-featuresHeight'>Height: {pokemon.height/10}m</span>
              <span className='modal__content-featuresWeight'>Weight: {pokemon.weight/10}kg</span>
            </div>
          </div>
          
          <div className="modal__content-description">
            <img className='modal__content-descriptionImage' src={pokemon.sprites['front_default']} alt="" />
            <h3 className='modal__content-descriptionTitle'>{pokemon.name}</h3>
            <div className="type-badges">
              {pokemon.types.map(type => (
                <span key={type.type.name} className={`type-badge type-${type.type.name}`}>
                  {type.type.name}
                </span>
              ))}
            </div>
            <p className='modal__content-descriptionParagraph'>
              A {pokemon.types[0].type.name}-type Pokémon known for its unique abilities and characteristics.
            </p>
          </div>
          
          <div className="modal__content-other">
            <div className="modal__content-otherBreadcrumb">
              <h4 className='modal__content-otherBreadcrumbAbilities'>Abilities</h4>
              {pokemon.abilities.map(({ability}) => (
                <span key={ability.name} className='modal__content-otherBreadcrumbAbility'>{ability.name}</span>
              ))}
            </div>
            
            <div className="modal__content-otherStats">
              <h4 className='modal__content-otherStatsTitle'>Stats</h4>
              {pokemon.stats.map((stat, index) => (
                <div className='modal__content-otherStat' key={stat.stat.name}>
                  <div className='modal__content-otherStatContent'>
                    <span className='modal__content-otherStatContentPower'>{stat.stat.name}</span>
                    <span className='modal__content-otherStatContentValue'>{stat.base_stat}</span>
                  </div>
                  <div className='modal__content-otherStatTimeLine'>
                    <div 
                      className='modal__content-otherStatTimeLineStat' 
                      style={{
                        width: stat.base_stat >= 100 ? '100%' : `${stat.base_stat}%`,
                        backgroundColor: [
                          '#FC6B6E', // HP
                          '#F44336', // Attack
                          '#2196F3', // Defense
                          '#094BE8', // Special Attack
                          '#3ED1E0', // Special Defense
                          '#CF9B48'  // Speed
                        ][index]
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}