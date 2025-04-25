import React from 'react';
import Search from './components/search';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Grid from './layout/grid';
import Container from './layout/container';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      total: 0,
      notFound: false,
      search: [],
      searching: false,
      loading: true,
      limit: 20, // Añadimos límite
      offset: 0  // Añadimos offset
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.showPokemons = this.showPokemons.bind(this);
    this.nextPokemon = this.nextPokemon.bind(this);
  }

  async handleSearch(textSearch) {
    if (!textSearch) {
      this.setState({
        search: [],
        notFound: false,
        searching: false
      });
      return;
    }
    
    this.setState({
      notFound: false,
      searching: true,
    });
    
    try {
      // Obtenemos todos los Pokémon (o un número grande)
      const api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
      const data = await api.json();
      
      // Filtramos los que coincidan con el texto
      const filtered = data.results.filter(pokemon => 
        pokemon.name.toLowerCase().includes(textSearch.toLowerCase())
      );
      
      // Obtenemos los datos completos de los Pokémon filtrados
      const promises = filtered.map(async pokemon => {
        const result = await fetch(pokemon.url);
        return await result.json();
      });
      
      const results = await Promise.all(promises);
      
      this.setState({
        search: results,
        notFound: results.length === 0,
        searching: false
      });
    } catch (error) {
      this.setState({
        notFound: true,
        searching: false
      });
    }
  }
  async showPokemons() {
    this.setState({ loading: true });
    
    try {
      const api = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${this.state.limit}&offset=${this.state.offset}`
      );
      const data = await api.json();
      
      const promises = data.results.map(async pokemon => {
        const result = await fetch(pokemon.url);
        const res = await result.json();
        return res;
      });
      
      const results = await Promise.all(promises);
      
      this.setState(prev => ({
        search: [],
        pokemons: [...prev.pokemons, ...results],
        notFound: false,
        total: prev.total + results.length,
        loading: false,
        offset: prev.offset + prev.limit
      }));
    } catch (error) {
      this.setState({
        loading: false,
        notFound: true
      });
    }
  }

  nextPokemon() {
    this.showPokemons();
  }

  componentDidMount() {
    if (!this.state.searching) {
      this.showPokemons();
    }
  }

  // App.js (parte del render)
render() {
  const poke = this.state.search.length > 0 || this.state.searching ? 
    this.state.search : 
    this.state.pokemons;
  
  return (
    <>
      <Container>
        <Navbar title="Pokédex" />
        <Search onHandleSearch={this.handleSearch} />
        
        {this.state.loading ? (
          <div className="loading">Loading Pokémon...</div>
        ) : this.state.notFound ? (
          <div className="not-found">Pokémon not found</div>
        ) : (
          <Grid pokemons={poke} next={this.state.search.length === 0 ? this.nextPokemon : null} />
        )}
      </Container>
      <Footer />
    </>
  );
}
}