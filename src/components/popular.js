import React, { useState, useEffect } from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './popular.css'
import { searchMovie } from '../api';


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

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    }
  }));

  const [expanded, setExpanded] = useState(Array(popularMovies.length).fill(false));

  const handleExpandClick = (index) => {
    const expandedCopy = [...expanded];
    expandedCopy[index] = !expandedCopy[index];
    setExpanded(expandedCopy);
  };

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


 
  return(
    <div>
           <div className='search-container'>
        <input type='text' value={searchQuery} onChange={handleSearchChange} />
        <button onClick={handleSearchSubmit}>Search</button>
      </div>

      <div className='container-card'>
        {popularMovies.map((movie, i)=>{
            return(
                <Card sx={{ maxWidth: 250, backgroundColor: '#1f2022' }}>
                <CardHeader
                  title={
                    <Typography variant="h6" component="div" style={{ color: '#fff', fontSize: '0.8rem' }}>
                      {movie.title}
                    </Typography>
                  }
                  subheader={movie.release_date}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="Paella dish"
                   style={{ height: "inherit", width: "100%", objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" style={{color: '#fff'}}>
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites" style={{color: '#fff'}}>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share" style={{color: '#fff'}}>
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded[i]}
                    onClick={() => handleExpandClick(i)}
                    aria-expanded={expanded[i]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded[i]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph style={{color: '#fff'}}>Method:</Typography>
                    <Typography paragraph style={{color: '#fff'}}>
                      {movie.overview}
                    </Typography>
                  </CardContent>
                </Collapse>
      
              </Card>
            )
        })}
     
      </div>
           
    </div>
  )
};

export default PopularMovies;
