import { useEffect, useState } from 'react';
// import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Movies from './Components/Movies/Movies';
import Loading from './Components/Loading/Loading';
import axios from 'axios';

function App() {

  const dbUrl = "http://localhost:3003";
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {

    //axios request to fetch movies and info about it
    axios.get(dbUrl + "/movies")
      .then(function (response) {
        
        if (response.data.length === 12) {
          setMovies(response.data);
        } else {
          fetchMovies();
        }

      })
      .catch(function (error) {
        console.log(error);
      })

  }

  useEffect(fetchMovies, []);

  return (
    <div className="App">

      {/* Nav Bar */}
      <Navbar />

      {/* Grid for Movies */}
      <div className="container center">
        <div className="row">
          {

            movies.length !== 0 ?
              <Movies movies={movies} />
              :
              <Loading />

          }
        </div>
      </div>

    </div>
  );
}

export default App;
