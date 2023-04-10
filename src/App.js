// File: App.js
import React from "react";
import { Container } from "@mui/material";
import Navbar from "./components/navbar";
import PopularMovies from './components/popular';
import Login from "./components/login";
import './App.css'

function App() {
  return (
    <div className="body">
      <Navbar/>
      <Container>
        <div className="container-card">
        <PopularMovies />
        </div>
        <Login />
      </Container>
    </div>
  );
}

export default App;
