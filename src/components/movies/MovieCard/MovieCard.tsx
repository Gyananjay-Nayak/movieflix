import React from 'react';
import { Movie } from '../../../types/movie.types';
import { FaStar } from 'react-icons/fa';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageBaseUrl = process.env.REACT_APP_TMDB_IMAGE_BASE_URL;
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}/w500${movie.poster_path}`
    : '/placeholder-movie.png';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  return (
    <div className={styles.movieCard}>
      <div className={styles.posterContainer}>
        <img
          src={posterUrl}
          alt={movie.title}
          className={styles.poster}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <button className={styles.playButton}>▶ Play</button>
        </div>
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.meta}>
          <span className={styles.year}>{releaseYear}</span>
          <span className={styles.rating}>
            <FaStar className={styles.star} />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
