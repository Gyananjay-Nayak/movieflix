import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MoviesState } from '../../types/movie.types';
import * as tmdbApi from '../../services/tmdbApi';

const initialState: MoviesState = {
  popular: [],
  nowPlaying: [],
  upcoming: [],
  topRated: [],
  loading: false,
  error: null,
  categoryMovies: [],
  categoryPage: 1,
  categoryTotalPages: 0,
  categoryLoading: false,
  // Movie details state
  movieDetails: null,
  detailsLoading: false,
  detailsError: null,
};

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async () => {
    const response = await tmdbApi.getPopularMovies();
    return response.data.results;
  }
);

export const fetchNowPlayingMovies = createAsyncThunk(
  'movies/fetchNowPlaying',
  async () => {
    const response = await tmdbApi.getNowPlayingMovies();
    return response.data.results;
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcoming',
  async () => {
    const response = await tmdbApi.getUpcomingMovies();
    return response.data.results;
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRated',
  async () => {
    const response = await tmdbApi.getTopRatedMovies();
    return response.data.results;
  }
);

export const fetchMoviesByCategory = createAsyncThunk(
  'movies/fetchByCategory',
  async ({ category, params }: { category: string; params?: any }) => {
    let response;
    
    switch (category) {
      case 'popular':
        response = await tmdbApi.getPopularMovies(params);
        break;
      case 'now-playing':
        response = await tmdbApi.getNowPlayingMovies(params);
        break;
      case 'upcoming':
        response = await tmdbApi.getUpcomingMovies(params);
        break;
      case 'top-rated':
        response = await tmdbApi.getTopRatedMovies(params);
        break;
      default:
        throw new Error('Invalid category');
    }
    
    return response.data;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async ({ id, type = 'movie' }: { id: number; type?: 'movie' | 'tv' }) => {
    const response = await tmdbApi.getDetails(type, id);
    return { ...response.data, media_type: type };
  }
);


const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearCategoryMovies: (state) => {
      state.categoryMovies = [];
      state.categoryPage = 1;
      state.categoryTotalPages = 0;
    },
    clearMovieDetails: (state) => {
      state.movieDetails = null;
      state.detailsLoading = false;
      state.detailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Popular Movies
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popular = action.payload;
        state.loading = false;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch popular movies';
        state.loading = false;
      })
      // Now Playing Movies
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.nowPlaying = action.payload;
      })
      // Upcoming Movies
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming = action.payload;
      })
      // Top Rated Movies
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRated = action.payload;
      })

      // Category Movies with Pagination
      .addCase(fetchMoviesByCategory.pending, (state) => {
        state.categoryLoading = true;
      })
      .addCase(fetchMoviesByCategory.fulfilled, (state, action) => {
        state.categoryMovies = action.payload.results;
        state.categoryPage = action.payload.page;
        state.categoryTotalPages = action.payload.total_pages;
        state.categoryLoading = false;
      })
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch movies';
        state.categoryLoading = false;
      })

      // Movie Details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
        state.detailsLoading = false;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.detailsError = action.error.message || 'Failed to fetch movie details';
        state.detailsLoading = false;
      });
  },
});

export const { clearCategoryMovies, clearMovieDetails } = moviesSlice.actions;
export default moviesSlice.reducer;
