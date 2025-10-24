import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization : `Bearer ${API_KEY}`
  }
});

export const getPopularMovies = (params?: any) => tmdbApi.get('/movie/popular',{ params });
export const getNowPlayingMovies = (params?: any) => tmdbApi.get('/movie/now_playing', { params });
export const getUpcomingMovies = (params?: any) => tmdbApi.get('/movie/upcoming', { params });
export const getTopRatedMovies = (params?: any) => tmdbApi.get('/movie/top_rated', { params });

export const getDetails = (type: 'movie' | 'tv', id: number, params?: any) => {
  const endpoint = type === 'movie' ? `/movie/${id}` : `/tv/${id}`;
  return tmdbApi.get(endpoint, {
    params: {
      append_to_response: 'credits',
      ...params,
    },
  });
};

export default tmdbApi;
