import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMovieDetails, clearMovieDetails } from '../../store/slices/moviesSlice';
import Header from '../../components/layout/Header/Header';
import Loader from '../../components/common/Loader/Loader';
import styles from './MovieDetails.module.scss';

const MovieDetails: React.FC = () => {
  const { id, type = 'movie' } = useParams<{ id?: string; type?: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { movieDetails: data, detailsLoading: loading, detailsError: error } = useAppSelector(
    (state) => state.movies
  );

  const isTV = type === 'tv' || data?.media_type === 'tv';

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails({ 
        id: Number(id), 
        type: (type as 'movie' | 'tv') || 'movie' 
      }));
    }
    return () => {
      dispatch(clearMovieDetails());
    };
  }, [dispatch, id, type]);

  if (loading) {
    return (
      <div className={styles.detailsPage}>
        <Header />
        <Loader fullPage={true} size="small" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.detailsPage}>
        <Header />
        <div className={styles.error}>Failed to load details: {error}</div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const {
    title,
    name,
    poster_path,
    overview,
    release_date,
    first_air_date,
    original_language,
    vote_average,
    genres,
    credits,
    tagline,
  } = data;

  const displayTitle = title || name;
  const displayDate = release_date || first_air_date;
  const year = displayDate ? new Date(displayDate).getFullYear() : '';
  const imageBaseUrl = process.env.REACT_APP_TMDB_IMAGE_BASE_URL;

  return (
    <div className={styles.detailsPage}>
      <Header />
      <div className={styles.detailsContainer}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className={styles.main}>
          <img
            src={poster_path ? `${imageBaseUrl}/w500${poster_path}` : '/placeholder-movie.png'}
            alt={displayTitle}
            className={styles.poster}
          />
          <div className={styles.info}>
            <h1 className={styles.title}>{displayTitle}</h1>
            {tagline && <p className={styles.tagline}>{tagline}</p>}
            <div className={styles.meta}>
              <span>{year}</span>
              <span className={styles.dot}>·</span>
              <span>{isTV ? 'TV Show' : 'Movie'}</span>
              <span className={styles.dot}>·</span>
              <span>{original_language?.toUpperCase()}</span>
              <span className={styles.dot}>·</span>
              {genres?.length > 0 && (
                <span>{genres.map((g: any) => g.name).join(', ')}</span>
              )}
              <span className={styles.dot}>·</span>
              <span>⭐ {vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
            </div>
            <h3>Overview</h3>
            <p className={styles.overview}>{overview}</p>
            {credits && credits.cast && credits.cast.length > 0 && (
              <>
                <h3>Cast</h3>
                <div className={styles.castList}>
                  {credits.cast.slice(0, 8).map((actor: any) => (
                    <div key={actor.cast_id || actor.id} className={styles.castItem}>
                      {actor.profile_path ? (
                        <img
                          src={`${imageBaseUrl}/w185${actor.profile_path}`}
                          alt={actor.name}
                          className={styles.castImg}
                        />
                      ) : (
                        <div className={styles.castImgPlaceholder}></div>
                      )}
                      <span className={styles.actorName}>{actor.name}</span>
                      <span className={styles.character}>as {actor.character}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
