import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardMedia } from '@mui/material';
import './popular.css';
import { Modal } from 'antd';

import { Carousel } from 'antd';

const UpComingMovies = () => {
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [modalInfo, setModalInfo] = useState({
    imageUrl: '',
    title: '',
    overview: '',
    id: '',
    popularity: '',
  });
  const [modal2Open, setModal2Open] = useState(false);

  useEffect(() => {
    const getMovieList = async () => {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=36bc3a789b7ad9af4dd3bd9d3f3df68a'
      );
      setUpComingMovies(response.data.results);
    };

    getMovieList();
  }, []);

  const handleOpenModal = (imageUrl, title, overview, id, popularity) => {
    setModalInfo({ imageUrl, title, overview, id, popularity });
    setModal2Open(true);
  };

  return (
    <div>
      <Carousel
        autoplay
        style={{
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          width: '100vw',
        }}
      >
        {upComingMovies.map((movie) => (
          <div
            key={movie.id}
            style={{
              flex: '0 0 auto',
              scrollSnapAlign: 'start',
              width: '100%',
              minHeight: '500px',
              marginLeft: '1rem',
            }}
          >
            <h3 style={{ margin: 0 }}>
              <Card
                sx={{ maxWidth: '100%', backgroundColor: '#1f2022' }}
                onClick={() =>
                  handleOpenModal(
                    `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    movie.title,
                    movie.overview,
                    movie.id,
                    movie.popularity
                  )
                }
              >
                <CardMedia
                  component="img"
                  style={{ width: '100%', height: 'auto' }}
                  image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                />
              </Card>
            </h3>
          </div>
        ))}
      </Carousel>

      <div style={{ textAlign: 'left' }}>
        <h1>Upcoming Movies</h1>
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
    </div>
  );
};

export default UpComingMovies;
