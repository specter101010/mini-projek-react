import "./App.css"
// import {getMovieList} from "./api"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { searchMovie } from "./api";


function App() {
  
  const [PopularMovies, setPopularMovies] = useState([]);
  useEffect(() => {
      const getMovieList = async () => {
        const movie = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=36bc3a789b7ad9af4dd3bd9d3f3df68a`);
        return movie.data.results
      };
  
      getMovieList().then((result) =>{
        setPopularMovies(result)
      })
    }, []);


    const PopularMoviesList =() =>{
      return PopularMovies.map((movie, i) =>{
        return(
                  <div className='container-card' key={i}>
            <div className='title'>{movie.title}</div>
            <img className='picture' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}` }/>
            <div className='date'>{movie.release_date}</div>
            <div className='rate'>{movie.vote_average}</div>
           </div>
        )
      })
    }



  const search = async (q) => {
    if(q.length > 3){
      const query = await searchMovie(q)
      setPopularMovies(query)
    }
  }
  

  
  return (
  <div>
    <div className="container-body">
      <div className="search-btn">
      <input placeholder='cari film...'
            onChange={({target}) => search(target.value)}/>
      </div>
      <div className="movie-container">
        <PopularMoviesList />
      </div>
    </div>
  </div>
  );
}

export default App;
