import React from 'react'
import axios from 'axios';

function SearchMovie(){
    const search =async (q) =>{
       if(q.length > 3){
        const searchMovie = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${q}&api_key=36bc3a789b7ad9af4dd3bd9d3f3df68a`)
        console.log({searchMovie:searchMovie})
        console.log(searchMovie.request)
       }
    }


    // const searchMovieFinish = async (q) =>{
    //     if(q.length > 3){
    //         const query = await.searchMovie(q)
    //         console.log({query : query})
    //     }
    // }
    return(
        <div className='search-container'>
            <input placeholder='cari film...'
            onChange={({target}) => search(target.value)}/>
        </div>
    );
}

export default SearchMovie;