export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MoviesState {
  popular: Movie[];
  nowPlaying: Movie[];
  upcoming: Movie[];
  topRated: Movie[];
  loading: boolean;
  error: string | null;
  categoryMovies: Movie[],
  categoryPage: number,
  categoryTotalPages: number,
  categoryLoading: boolean,
}
