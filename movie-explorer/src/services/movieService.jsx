import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Get trending movies
export const getTrendingMovies = async () => {
  const response = await tmdbClient.get('/trending/movie/week');

  return response.data;
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  const response = await tmdbClient.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,videos',
    },
  });

  return response.data;
};

// Search movies
export const searchMovies = async (query, page = 1) => {
  const response = await tmdbClient.get('/search/movie', {
    params: {
      query,
      page,
    },
  });

  return response.data;
};

// Get movie genres
export const getMovieGenres = async () => {
  const response = await tmdbClient.get('/genre/movie/list', {
    params: {
      language: 'en',
    },
  });

  return response.data;
};

// Discover movies using filters
export const discoverMovies = async ({
  genre,
  year,
  rating,
  page = 1,
}) => {
  const params = {
    page,
    sort_by: 'popularity.desc',
  };

  if (genre) {
    params.with_genres = genre;
  }

  if (year) {
    params.primary_release_year = year;
  }

  if (rating) {
    params['vote_average.gte'] = rating;
  }

  const response = await tmdbClient.get('/discover/movie', {
    params,
  });

  return response.data;
};