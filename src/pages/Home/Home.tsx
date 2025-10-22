import React, {useEffect} from 'react';
import Header from '../../components/layout/Header/Header';
import styles from './Home.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchPopularMovies,
} from '../../store/slices/moviesSlice';

const Home: React.FC = () => {

  const dispatch = useAppDispatch();
  const { popular, error } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  useEffect(() => {
    if (popular.length > 0) {
      console.log('Popular Movies:', popular);
    }
  }, [popular]);


  if (error) {
    return (
      <div className={styles.homePage}>
        <Header />
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <Header />
      
      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Popular Movies</h2>
          <div className={styles.movieGrid}>
            <p className={styles.placeholder}>Loading movies...</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Now Playing</h2>
          <div className={styles.movieGrid}>
            <p className={styles.placeholder}>Loading movies...</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Upcoming</h2>
          <div className={styles.movieGrid}>
            <p className={styles.placeholder}>Loading movies...</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Top Rated</h2>
          <div className={styles.movieGrid}>
            <p className={styles.placeholder}>Loading movies...</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
