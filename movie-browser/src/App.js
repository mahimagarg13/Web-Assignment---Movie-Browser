import React, { useState } from "react";
import Axios from "axios";
import "./App.css";  // Import the CSS file
import MovieInfoComponent from "./components/MovieInfoComponent";
import MovieComponent from "./components/MovieComponent";
import popcornImage from './assests/images/popcorn.png';
import VideoPlayer from './assests/images/video-player.png';
import searchPng from './assests/images/search.png';

export const API_KEY = "a9118a3a";

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchString}`);
    updateMovieList(response.data.Search || []);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <div className="container">
      <header className="header">
        <div style={{display:'flex',alignItems:'center'}}>
          <img src={VideoPlayer} alt="Movie Icon" className="movie-image" />
          Movie App
        </div>
        <div className="search-box">
          <img src={searchPng} alt="Search Icon" className="search-icon" />
          <input
            className="search-input"
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </div>
      </header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}
      <div className="movie-list-container">
        {movieList.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <img src={popcornImage} alt="movie" className="placeholder" />
        )}
      </div>
    </div>
  );
}

export default App;
