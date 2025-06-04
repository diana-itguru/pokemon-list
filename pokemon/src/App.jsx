import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then(res => res.json())
            .then(data => {
                Promise.all(
                    data.results.map(pokemon =>
                        fetch(pokemon.url).then(res => res.json())
                    )
                ).then(fullData => {
                    setPokemonList(fullData);
                });
            });
    }, []);

    return (
        <div className="App">
            <h1>Pokemon List</h1>
            <div className="container">
                {pokemonList.map(pokemon => (
                    <div className="card" key={pokemon.id}>
                        <div className="card-body">
                            <h3>{pokemon.name}</h3>
                        </div>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
