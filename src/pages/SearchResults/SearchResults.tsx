import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/layout/Header/Header';
import MovieCard from '../../components/movies/MovieCard/MovieCard';
import styles from './SearchResults.module.scss';
import Loader from '../../components/common/Loader/Loader';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults: React.FC = () => {
  const query = useQuery().get('query') || '';
  const navigate = useNavigate();

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query.trim()) {
      navigate('/');
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
          params: {
            query,
          },
          headers: {
    Authorization : `Bearer ${TMDB_API_KEY}`
  }
        });
        setResults(response.data.results);
      } catch (err) {
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, navigate]);

  if (error) {
    return (
      <div className={styles.searchResultsPage}>
        <Header />
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.searchResultsPage}>
      <Header />

      <main className={styles.content}>
        <h1 className={styles.title}>Search Results for: "{query}"</h1>

        {loading ? (
          <div className={styles.loading}>
            <Loader size='large'/>
          </div>
        ) : results.length === 0 ? (
          <p className={styles.noResults}>No results found.</p>
        ) : (
          <div className={styles.movieGrid}>
            {results.map((item) => {
              if (item.media_type !== 'movie' && item.media_type !== 'tv') {
                return null;
              }

              return (
                <MovieCard
                  key={`${item.media_type}-${item.id}`}
                  movie={{
                    id: item.id,
                    title: item.title || item.name,
                    poster_path: item.poster_path,
                    backdrop_path: item.backdrop_path,
                    overview: item.overview,
                    release_date: item.release_date || item.first_air_date,
                    vote_average: item.vote_average,
                    genre_ids: item.genre_ids,
                    media_type: item.media_type,
                  }}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
