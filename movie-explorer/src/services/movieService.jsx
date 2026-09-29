import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const getTrendingMovies = async () => {
  const response = await tmdbClient.get('/trending/movie/week');

  return response.data;
};