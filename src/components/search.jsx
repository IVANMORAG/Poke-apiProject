// Search.jsx
import React from 'react';
import SearchIcon from '../assets/icons/busqueda.svg';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    const value = e.target.value;
    this.setState({ search: value });
    
    // Llamamos a la función de búsqueda con cada cambio
    this.props.onHandleSearch(value);
  }

  render() {
    return (
      <div className='search'>
        <div className="search__wrapper">
          <input 
            className='search__input'
            type="search"
            value={this.state.search}
            onChange={this.handleSearch}
            placeholder='Search Pokémon...'
            autoFocus
          />
          <img className='search__icon' src={SearchIcon} alt="" />
        </div>
      </div>
    );
  }
}