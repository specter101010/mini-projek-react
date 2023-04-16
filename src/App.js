// File: App.js
import React from "react";
import { Container } from "@mui/material";
import PopularMovies from './components/popular';
import Login from "./components/login";
import './App.css'
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="body">
      <Login/>
      <Container>
        <div className="container-card">
          <h1>Popular movies</h1>
          <br></br>
        <PopularMovies />
        </div>      
      </Container>
    </div>
  );
}

export default App;
