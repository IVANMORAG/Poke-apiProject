import React from 'react';
import Card from '../components/card';

export default class Grid extends React.Component{

  constructor(props){
    super(props);
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton(){
    this.props.next();
  }
  
 // Grid.jsx
render() {
  return(
    <div className='grid'>
      <div className='grid__pokemon'>
        {this.props.pokemons.map(poke => (           
          <Card key={poke.name} pokemon={poke}></Card>
        ))}
      </div>
      {
        (this.props.pokemons.length >= 20 && this.props.next) && 
          <div className="grid__wrapper-button">
            <button className='grid__button' type='button' onClick={this.handleButton}>Show more</button>
          </div>
      }
    </div>
  )
}
}