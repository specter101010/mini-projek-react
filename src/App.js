// File: App.js
import React from "react";
import { Container } from "@mui/material";
import PopularMovies from './components/popular';
import Login from "./components/login";
import './App.css'
import TrendingMovies from "./components/trending";

function App() {
  return (
    <div className="body">
      <Login/>
      <Container>
        <div className="container-card">
         
        <PopularMovies />
        <TrendingMovies/>

        </div>      
      </Container>
    </div>
  );
}

export default App;
