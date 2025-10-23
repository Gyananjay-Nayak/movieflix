import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  removeFromFavorites,
  clearFavorites,
} from "../../store/slices/favoritesSlice";
import Header from "../../components/layout/Header/Header";
import MovieCard from "../../components/movies/MovieCard/MovieCard";
import styles from "./Favorites.module.scss";

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items: favorites } = useAppSelector((state) => state.favorites);
  const [showDeleteAll, setShowDeleteAll] = useState(false);

  const handleRemove = (movieId: number) => {
    if (user) {
      dispatch(removeFromFavorites({ userId: user.id, movieId }));
    }
  };

  const handleClearAll = () => {
    if (user) {
      dispatch(clearFavorites(user.id));
      setShowDeleteAll(false);
    }
  };

  return (
    <div className={styles.favoritesPage}>
      <Header />

      <main className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Favorites</h1>
          <p className={styles.subtitle}>
            {favorites.length === 0
              ? "No favorites yet"
              : `${favorites.length} movie${
                  favorites.length !== 1 ? "s" : ""
                } in your favorites`}
          </p>
        </div>

        {favorites.length > 0 && (
          <div className={styles.actions}>
            <button
              className={styles.clearButton}
              onClick={() => setShowDeleteAll(true)}
            >
              Clear All
            </button>
          </div>
        )}

        {showDeleteAll && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Remove All Favorites?</h2>
              <div className={styles.modalButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowDeleteAll(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={handleClearAll}
                >
                  Yes, Delete All
                </button>
              </div>
            </div>
          </div>
        )}

        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>No favorite movies yet</p>
            <p className={styles.emptySubtext}>
              Click the heart icon on any movie to add it to your favorites
            </p>
            <button
              className={styles.browseButton}
              onClick={() => navigate("/")}
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className={styles.movieGrid}>
            {favorites.map((movie) => (
              <div key={movie.id} className={styles.movieWrapper}>
                <MovieCard movie={movie} />
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemove(movie.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
