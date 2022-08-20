import React from 'react';
import { Link } from 'react-router-dom';
import Movie from '../components/Movie';
import '../styles/WatchMovie.css';

function WatchMovie() {
  return (
    <div className="movie-page">
      <Movie />
      <div className="credits">
        <p>
          Copyright © 1997 - 2020 Simon Jansen
          {' '}
          <br />
          jansens@asciimation.co.nz
        </p>
        <a href="https://www.asciimation.co.nz/">Asciimation</a>
      </div>
      <Link to="/">Go back</Link>
    </div>
  );
}

export default WatchMovie;
