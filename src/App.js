import "./App.css"
// import {getMovieList} from "./api"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { searchMovie } from "./api";
import Login from "./components/login";
import { Container } from "@mui/material";
import ResponsiveAppBar from "./components/navbar";
import RecipeReviewCard from "./components/card";


// card
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


function App() {



  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  //    const RecipeReviewCard =() => {
  //   const [expanded, setExpanded] = React.useState(false);
  
  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };
  
  //   return (
  
  //   );
  // }





  const [PopularMovies, setPopularMovies] = useState([]);
  useEffect(() => {
    console.log(process.env.REACT_APP_POPULAR)
      const getMovieList = async () => {
        const movie = await axios.get(process.env.REACT_APP_POPULAR);
        return movie.data.results
      };
  
      getMovieList().then((result) =>{
        setPopularMovies(result)
      })
    }, []);


    const PopularMoviesList =() =>{

      const [expanded, setExpanded] = React.useState(false);
  
      const handleExpandClick = () => {
        setExpanded(!expanded);
      };

      return PopularMovies.map((movie, i) =>{
        return(
           
              

<div className='container-card' key={i}>
<Card sx={{ maxWidth: 345 }}>
            {/* <div className='title'>{movie.title}</div>
            <img className='picture' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}` }/>
            <div className='date'>{movie.release_date}</div>
            <div className='rate'>{movie.vote_average}</div> */}

<CardHeader
              title={movie.title}
              subheader={movie.release_date}
            />
            <CardMedia
              component="img"
              height="194"
              image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}` }
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                {movie.overview}
                </Typography>
               
              </CardContent>
            </Collapse>

            </Card>
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
    <div className="body">
         <ResponsiveAppBar />
          <Container>
         <div className="container-body">
      <div className="search-btn">
      <input placeholder='cari film...'
            onChange={({target}) => search(target.value)}/>
      </div>
      <div className="movie-container">
        <PopularMoviesList />
      </div>
    </div>
    {/* <RecipeReviewCard /> */}
    <Login />
    </Container>
    </div>
  );
}

export default App;
