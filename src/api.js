import axios from 'axios'

export const getMovieList = async() =>{
    const movie = await axios.get(`https://api.themoviedb.org/3/movie/popular?page=1&api_key=36bc3a789b7ad9af4dd3bd9d3f3df68a`)
     console.log({MovieList : movie})
     console.log({list : movie})
    return movie.data.results
}

export const searchMovie = async(q) =>{
    const search = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${q}&page=1&api_key=36bc3a789b7ad9af4dd3bd9d3f3df68a`)
    return search.data.results
}