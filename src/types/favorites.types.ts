import { Movie } from './movie.types';

export interface FavoritesState {
  items: Movie[];
  loading: boolean;
}

export interface UserFavorites {
  [userId: string]: Movie[];
}