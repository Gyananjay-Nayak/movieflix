import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization : `Bearer ${API_KEY}`
  }
});

export const getPopularMovies = () => tmdbApi.get('/movie/popular');
export const getNowPlayingMovies = () => tmdbApi.get('/movie/now_playing');
export const getUpcomingMovies = () => tmdbApi.get('/movie/upcoming');
export const getTopRatedMovies = () => tmdbApi.get('/movie/top_rated');

export default tmdbApi;
