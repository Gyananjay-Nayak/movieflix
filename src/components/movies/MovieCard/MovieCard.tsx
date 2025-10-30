import React from 'react';
import { Movie } from '../../../types/movie.types';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { IconBaseProps } from "react-icons";
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addToFavorites, removeFromFavorites } from '../../../store/slices/favoritesSlice';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
}

const HeartIcon = FaHeart as React.FC<IconBaseProps>;
const RegHeartIcon = FaRegHeart as React.FC<IconBaseProps>;
const StarIcon = FaStar as React.FC<IconBaseProps>;

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

    const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items: favorites } = useAppSelector((state) => state.favorites);

  const imageBaseUrl = process.env.REACT_APP_TMDB_IMAGE_BASE_URL;
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}/w500${movie.poster_path}`
    : '/placeholder-movie.png';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

    
  const isFavorited = favorites.some((m) => m.id === movie.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault()
    
    if (!user) return;

    if (isFavorited) {
      dispatch(removeFromFavorites({ userId: user.id, movieId: movie.id }));
    } else {
      dispatch(addToFavorites({ userId: user.id, movie }));
    }
  };
  return (
    <Link to={`/${movie.media_type}/${movie.id}`} className={styles.movieCard}>
      <div className={styles.posterContainer}>
        <img
          src={posterUrl}
          alt={movie.title}
          className={styles.poster}
          loading="lazy"
        />
        <button className={styles.favoriteButton} onClick={handleFavoriteClick}>
          {isFavorited ? (
            <HeartIcon className={styles.favoritedIcon} />
          ) : (
            <RegHeartIcon className={styles.favoriteIcon} />
          )}
        </button>
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.meta}>
          <span className={styles.year}>{releaseYear}</span>
          <span className={styles.rating}>
            <StarIcon className={styles.star} />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
