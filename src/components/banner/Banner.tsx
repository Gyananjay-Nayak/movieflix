import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Banner.module.scss';

const Banner: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className={styles.banner}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Welcome.</h1>
        <p className={styles.subtitle}>
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for movies, TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Banner;
