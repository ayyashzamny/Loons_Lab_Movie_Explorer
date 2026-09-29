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

export const getMovieDetails = async (movieId) => {
  const response = await tmdbClient.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,videos',
    },
  });

  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await tmdbClient.get('/search/movie', {
    params: {
      query,
      page,
    },
  });

  return response.data;
};