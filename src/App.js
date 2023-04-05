import "./App.css"
// import {getMovieList} from "./api"
import Card from "./components/card";
import Wrapper from "./components/wrapper";
import Header from "./components/header"
import SearchMovie from "./components/search";

function App() {

  const name = 'yasyir';

  
  return (
  <div>
    <div className="container-body">
    <Header nama={name}/>
        <SearchMovie />
        <Wrapper />
      <div className="movie-container">
        <Card />
      </div>
    </div>
  </div>
  );
}

export default App;
