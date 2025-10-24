import React, { useEffect } from "react";
import Header from "../../components/layout/Header/Header";
import styles from "./Home.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getFromLocalStorage } from '../../utils/localStorage';
import {
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
} from "../../store/slices/moviesSlice";
import { loadUserFavorites } from '../../store/slices/favoritesSlice';
import MovieList from "../../components/movies/MovieList/MovieList";
import Banner from '../../components/banner/Banner';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { popular, nowPlaying, upcoming, topRated, loading, error } =
    useAppSelector((state) => state.movies);
  const { user } =
    useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const allFavorites: any = getFromLocalStorage('all_user_favorites') || {};
      const userFavorites = allFavorites[user.id] || [];
      dispatch(loadUserFavorites(userFavorites));
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);


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
      <Banner />

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Popular Movies</h2>
          <MovieList movies={popular} loading={loading} category="popular" />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Now Playing</h2>
          <MovieList movies={nowPlaying} loading={loading} category="now-playing" />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Upcoming</h2>
          <MovieList movies={upcoming} loading={loading} category="upcoming" />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Top Rated</h2>
          <MovieList movies={topRated} loading={loading} category="top-rated" />
        </section>
      </main>
    </div>
  );
};

export default Home;
