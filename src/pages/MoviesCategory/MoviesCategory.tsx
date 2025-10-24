import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchMoviesByCategory,
  clearCategoryMovies,
} from "../../store/slices/moviesSlice";
import Header from "../../components/layout/Header/Header";
import MovieCard from "../../components/movies/MovieCard/MovieCard";
import styles from "./MoviesCategory.module.scss";
import Loader from "../../components/common/Loader/Loader";

const categoryTitles: Record<string, string> = {
  popular: "Popular Movies",
  "now-playing": "Now Playing",
  upcoming: "Upcoming Movies",
  "top-rated": "Top Rated Movies",
};

const MoviesCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryMovies, categoryPage, categoryTotalPages, categoryLoading } =
    useAppSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (category) {
      dispatch(
        fetchMoviesByCategory({
          category,
          params: { page: currentPage },
        })
      );
    }
  }, [category, currentPage, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearCategoryMovies());
    };
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(categoryTotalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={`${styles.pageNumber} ${
            currentPage === 1 ? styles.active : ""
          }`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className={styles.ellipsis}>
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageNumber} ${
            currentPage === i ? styles.active : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < categoryTotalPages) {
      if (endPage < categoryTotalPages - 1) {
        pages.push(
          <span key="ellipsis2" className={styles.ellipsis}>
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={categoryTotalPages}
          className={`${styles.pageNumber} ${
            currentPage === categoryTotalPages ? styles.active : ""
          }`}
          onClick={() => handlePageChange(categoryTotalPages)}
        >
          {categoryTotalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={styles.categoryPage}>
      <Header />

      <main className={styles.content}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => navigate("/")}>
            ← Back to Home
          </button>
          <h1 className={styles.title}>
            {categoryTitles[category || ""] || "Movies"}
          </h1>
          <p className={styles.subtitle}>
            Page {categoryPage} of {categoryTotalPages}
          </p>
        </div>

        {categoryLoading ? (
          <div className={styles.loading}>
            <Loader size="large"/>
          </div>
        ) : (
          <>
            <div className={styles.movieGrid}>
              {categoryMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {categoryTotalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={styles.pageButton}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <div className={styles.pageNumbers}>{renderPageNumbers()}</div>

                <button
                  className={styles.pageButton}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === categoryTotalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MoviesCategory;
