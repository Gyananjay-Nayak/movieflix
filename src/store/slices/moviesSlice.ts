import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MoviesState, Movie } from '../../types/movie.types';
import * as tmdbApi from '../../services/tmdbApi';

const initialState: MoviesState = {
  popular: [],
  nowPlaying: [],
  upcoming: [],
  topRated: [],
  loading: false,
  error: null,
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

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
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
      });
  },
});

export default moviesSlice.reducer;
