import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './card.css'


// const apiPopular =process.env.REACT_APP_POPULAR

function Card(){
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
      return PopularMovies.map((movie, i) =>{
        return(
                  <div className='container' key={i}>
            <div className='title'>{movie.title}</div>
            <img className='picture' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}` }/>
            <div className='date'>{movie.release_date}</div>
            <div className='rate'>{movie.vote_average}</div>
           </div>
        )
      })
      
}

export default Card;