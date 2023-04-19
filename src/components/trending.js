import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Card,  CardHeader,  CardMedia,  Typography,} from '@mui/material';
import './popular.css';
import {  Modal } from 'antd';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';



const TrendingMovies = () => {
  const [TrendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const getMovieList = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=36bc3a789b7ad9af4dd3bd9d3f3df68a`);
      return response.data.results;
    };

    getMovieList().then((result) => {
      setTrendingMovies(result);
    });
  }, []);

 


 

  const [modalInfo, setModalInfo] = useState({ imageUrl: '', title: '', overview: '' });
  const [modal2Open, setModal2Open] = useState(false);

  const handleOpenModal = (imageUrl, title, overview, id, popularity) => {
    setModalInfo({ imageUrl, title, overview ,id, popularity});
    setModal2Open(true);
  };
  

  return(
    <div>
  
 <div style={{ textAlign: "center" }}>
 <h1>Trending Movies</h1>
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
        {TrendingMovies.map((movie, i)=>{
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
    <Typography variant="h6" component="div" style={{ color: '#fff', fontSize: '0.8rem', textAlign:"center" , borderBottom: "1px solid #111",paddingBottom: "5px"}}>
      {movie.title || movie.name}
    </Typography>
  }                       
  subheader={movie.release_date || movie.first_air_date }  
  style={{ fontSize: '0.8rem', textAlign:"center"}}
/>

                    
                
                  </Card>
                </div>
            );
        })}
      </div>
   

    </div>
  );
};

export default TrendingMovies;
