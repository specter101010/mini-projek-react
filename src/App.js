import "./App.css"
// import {getMovieList} from "./api"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Wrapper from "./components/wrapper";
import Header from "./components/header"
import Search from "./components/search";

function App() {


  // const [popularMove, setPopularMovies] = useState([])


  // useEffect(() => {
  //   getMovieList().then((result) => {
  //     setPopularMovies(result)
  //   })
  // },[]
  // )
  const name = 'yasyir';
  // console.log({popularMove : popularMove})

  const [PopularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const getMovieList = async () => {
      const movie = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=36bc3a789b7ad9af4dd3bd9d3f3df68a');
      return movie.data.results
    };

    getMovieList().then((result) =>{
      setPopularMovies(result)
    })
  }, []);
  
console.log({PopularMovies : PopularMovies})
  
  return (
  <div>
    <div className="container-body">
      <div className="movie-container">
        <Header nama={name}/>
        <Search />
       <Wrapper />
       <Wrapper />
      </div>
    </div>
  </div>
  );
}

export default App;
