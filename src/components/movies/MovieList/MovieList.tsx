import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../../types/movie.types';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.scss';

interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
  category?: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies, loading, category }) => {
  const navigate = useNavigate();

  if (loading) {
    return <div className={styles.loading}>Loading movies...</div>;
  }

  if (movies.length === 0) {
    return <div className={styles.empty}>No movies found</div>;
  }

  const handleSeeMore = () => {
    if (category) {
      navigate(`/movies/${category}`);
    }
  };

  return (
    <div className={styles.movieListWrapper}>
      <div className={styles.movieList}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        
        {category && (
          <div className={styles.seeMoreCard} onClick={handleSeeMore}>
            <div className={styles.seeMoreContent}>
              <span className={styles.arrow}>→</span>
              <span className={styles.text}>See More</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
