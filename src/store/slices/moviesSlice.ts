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


const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
  },
});

export default moviesSlice.reducer;
