import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesState } from '../../types/favorites.types';
import { Movie } from '../../types/movie.types';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';

const initialState: FavoritesState = {
  items: [],
  loading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    loadUserFavorites: (state, action: PayloadAction<Movie[]>) => {
      state.items = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<{ userId: string; movie: Movie }>) => {
      const { userId, movie } = action.payload;
      
      // Check if already in favorites
      if (!state.items.find((m) => m.id === movie.id)) {
        state.items.push(movie);
        saveFavoritesToStorage(userId, state.items);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<{ userId: string; movieId: number }>) => {
      const { userId, movieId } = action.payload;
      
      state.items = state.items.filter((m) => m.id !== movieId);
      saveFavoritesToStorage(userId, state.items);
    },
    clearFavorites: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.items = [];
      saveFavoritesToStorage(userId, []);
    },
  },
});

//function to save favorites by userId
const saveFavoritesToStorage = (userId: string, favorites: Movie[]) => {
  const allFavorites = getFromLocalStorage('all_user_favorites') || {};
  allFavorites[userId] = favorites;
  saveToLocalStorage('all_user_favorites', allFavorites);
};

export const { loadUserFavorites, addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
