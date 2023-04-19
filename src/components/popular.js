import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Card,  CardHeader,  CardMedia,  Typography,} from '@mui/material';
import './popular.css';
import { searchMovie } from '../api';
import { Modal } from 'antd';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';



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

  const handleOpenModal = (imageUrl, title, overview, id, popularity) => {
    setModalInfo({ imageUrl, title, overview ,id, popularity});
    setModal2Open(true);
  };
  

  return(
    <div>
     <div style={{ textAlign: "center", padding: "20px" }}>
  <input type="text" 
    value={searchQuery} 
    onChange={handleSearchChange} 
    style={{ 
      borderRadius: "10px", 
      border: "1px solid #ccc", 
      padding: "10px",
      marginRight:"10px"
    }} 
  />
  <button 
    onClick={handleSearchSubmit} 
    style={{ 
      backgroundColor: "#0099ff", 
      color: "#fff", 
      borderRadius: "10px", 
      padding: "10px",
      border: "none"
    }}
  >
    Search
  </button>
</div>
 <div style={{ textAlign: "center" }}>
 <h1>Popular movies</h1>
</div>




      <Modal
  title={modalInfo.title}
  centered
  visible={modal2Open}
  onOk={() => setModal2Open(false)}
  onCancel={() => setModal2Open(false)}
>
  <div style={{ marginBottom: "10px" }}>Id :{modalInfo.id}</div>
  <div style={{ fontSize: "12px", color: "#666" }}>Popularity: {modalInfo.popularity}</div>
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <img src={modalInfo.imageUrl} alt={modalInfo.title} style={{ height: "inherit", width: "50%", borderRadius: "4px" }} />
  </div>
  <p style={{ fontSize: "14px", lineHeight: "1.5", marginTop: "20px", textAlign: "justify", textJustify: "inter-word" }}>{modalInfo.overview}</p>
</Modal>



      <div className='container-card'>
        {popularMovies.map((movie, i)=>{
            return(
                <div className='card-container'>
                  <Card sx={{ maxWidth: 150, backgroundColor: '#1f2022' }}>
                    <div className='card-media-container'>
                    <CardMedia
  component="img"
  height="194"
  image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
  alt="Paella dish"
  style={{ height: "inherit", width: "100%", objectFit: "cover" }}
  
/>

                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div onClick={() => handleOpenModal(`https://image.tmdb.org/t/p/w500/${movie.poster_path}`, movie.title, movie.overview, movie.id, movie.popularity)} style={{ margin : '10px 0 0 0' ,cursor:"pointer"}}>
                      <RemoveRedEyeOutlinedIcon/>
                      </div>
                      </div>

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
