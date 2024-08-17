import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./MovieInfoComponent.css";
import { API_KEY } from "../App";
import close from '../assests/images/close.png'
const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedMovie, onMovieSelect } = props;

  useEffect(() => {
    const fetchMovieInfo = async () => {
      setLoading(true);
      try {
        const response = await Axios.get(
          `https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`
        );
        setMovieInfo(response.data);
      } catch (err) {
        setError("Failed to fetch movie information.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieInfo();
  }, [selectedMovie]);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className="container">
      {movieInfo ? (
        <>
           <span className="close" onClick={() => onMovieSelect()}>
           <img style={{width:'18px'}}
        src={close}
        alt='cross'
      />
          </span>
       <div style={{display:'flex', padding:10}}>
       <img
            className="cover-image"
            src={movieInfo?.Poster}
            alt={movieInfo?.Title}
          />
       
          <div className="info-column">
            <span className="movie-name">
              {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
            </span>
            <span className="movie-info">
              IMDB Rating: <span>{movieInfo?.imdbRating}</span>
            </span>
            <span className="movie-info">
              Year: <span>{movieInfo?.Year}</span>
            </span>
            <span className="movie-info">
              Language: <span>{movieInfo?.Language}</span>
            </span>
            <span className="movie-info">
              Rated: <span>{movieInfo?.Rated}</span>
            </span>
            <span className="movie-info">
              Released: <span>{movieInfo?.Released}</span>
            </span>
            <span className="movie-info">
              Runtime: <span>{movieInfo?.Runtime}</span>
            </span>
            <span className="movie-info">
              Genre: <span>{movieInfo?.Genre}</span>
            </span>
            <span className="movie-info">
              Director: <span>{movieInfo?.Director}</span>
            </span>
            <span className="movie-info">
              Actors: <span>{movieInfo?.Actors}</span>
            </span>
            <span className="movie-info" >
              Plot: <span style={{overflowWrap:'break-word',wordWrap:'break-word'}}>{movieInfo?.Plot}</span>
            </span>
          </div>
       </div>
        </>
      ) : (
        <div className="container">No movie information available.</div>
      )}
    </div>
  );
};

export default MovieInfoComponent;
