import React, { useState, useEffect } from "react";
import './App.css';
import './MovieCard'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

const ApiUrl = 'http://www.omdbapi.com?apikey=9ee95ca4';
const movie1 = {
    "Title": "Amazing Spiderman Syndrome",
    "Year": "2012",
    "imdbID": "tt2586634",
    "Type": "movie",
    "Poster": "N/A"
};

 const App = () =>{
  const[movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async( title) =>{
            const response= await fetch(`${ApiUrl}&s=${title}`);
            const data = await response.json();
            setMovies(data.Search); 
  }

  useEffect(() =>{
     searchMovies('Spiderman');
  },[]);
  return(
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}   
    </div>
  );
 }
 export default App;
