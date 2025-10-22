import React, { useEffect } from "react";
import Header from "../../components/layout/Header/Header";
import styles from "./Home.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
} from "../../store/slices/moviesSlice";
import MovieList from "../../components/movies/MovieList/MovieList";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { popular, nowPlaying, upcoming, topRated, loading, error } =
    useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  useEffect(() => {
    if (popular.length > 0) {
      console.log("Popular Movies:", popular);
    }
  }, [popular]);

  useEffect(() => {
    if (nowPlaying.length > 0) {
      console.log("Now Playing Movies:", nowPlaying);
    }
  }, [nowPlaying]);

  useEffect(() => {
    if (upcoming.length > 0) {
      console.log("Upcoming Movies:", upcoming);
    }
  }, [upcoming]);

  useEffect(() => {
    if (topRated.length > 0) {
      console.log("Top Rated Movies:", topRated);
    }
  }, [topRated]);

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
          <MovieList movies={popular} loading={loading} category="popular" />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Now Playing</h2>
          <MovieList movies={nowPlaying} loading={loading} category="nowPlaying" />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Upcoming</h2>
          <MovieList movies={upcoming} loading={loading} category="upcoming" />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Top Rated</h2>
          <MovieList movies={topRated} loading={loading} category="topRated" />
        </section>
      </main>
    </div>
  );
};

export default Home;
