import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Card,  CardHeader,  CardMedia,  Typography,} from '@mui/material';
import './popular.css';
import { searchMovie } from '../api';
import { Button, Modal } from 'antd';



const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const getMovieList = async () => {
      const response = await axios.get(process.env.REACT_APP_POPULAR);
      return response.data.results;
    };

    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

 


  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearchSubmit = async () => {
    if (searchQuery.length > 3) {
      const query = await searchMovie(searchQuery);
      setPopularMovies(query);
    }
  };

  const [modalInfo, setModalInfo] = useState({ imageUrl: '', title: '', overview: '' });
  const [modal2Open, setModal2Open] = useState(false);

  const handleOpenModal = (imageUrl, title, overview, id) => {
    setModalInfo({ imageUrl, title, overview ,id});
    setModal2Open(true);
  };
  

  return(
    <div>
      <div className='search-container'>
        <input type='text' value={searchQuery} onChange={handleSearchChange} />
        <button onClick={handleSearchSubmit}>Search</button>
      </div>



      <Modal
  title={modalInfo.title}
  centered
  visible={modal2Open}
  onOk={() => setModal2Open(false)}
  onCancel={() => setModal2Open(false)}
>
    <div>{modalInfo.id}</div>
  <img src={modalInfo.imageUrl} alt={modalInfo.title}  style={{ height: "inherit", width: "50%" }} />
  <p>{modalInfo.overview}</p>
</Modal>


      <div className='container-card'>
        {popularMovies.map((movie, i)=>{
            return(
                <div className='card-container'>
                  <Card sx={{ maxWidth: 250, backgroundColor: '#1f2022' }}>
                    <div className='card-media-container'>
                    <CardMedia
  component="img"
  height="194"
  image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
  alt="Paella dish"
  style={{ height: "inherit", width: "100%", objectFit: "cover" }}
  
/>

                    </div>
                    <Button type="primary" onClick={() => handleOpenModal(`https://image.tmdb.org/t/p/w500/${movie.poster_path}`, movie.title, movie.overview, movie.id)}>
  View Details
</Button>


                    <CardHeader
                      title={
                        <Typography variant="h6" component="div" style={{ color: '#fff', fontSize: '0.8rem' }}>
                          {movie.title}
                        </Typography>
                      }                       
                  subheader={movie.release_date}
                />
                    
                
                  </Card>
                </div>
            );
        })}
      </div>
   

    </div>
  );
};

export default PopularMovies;
