import { useEffect, useState } from 'react';

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';

import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import MovieFilters from '../components/MovieFilters';
import MovieModal from '../components/MovieModal';

import {
  getTrendingMovies,
  searchMovies,
  discoverMovies,
  getMovieDetails,
} from '../services/movieService';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState('');

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieDetailsLoading, setMovieDetailsLoading] =
    useState(false);
  const [movieDetailsError, setMovieDetailsError] = useState('');

  const hasActiveFilters =
    filters.genre ||
    filters.year ||
    filters.rating;

  const isSearching =
    searchQuery.trim().length > 0;

  const loadTrendingMovies = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getTrendingMovies();

      setMovies(data.results || []);
      setPage(1);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error('Failed to load trending movies:', error);

      setError(
        'Unable to load movies right now. Please check your connection and try again.'
      );

      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMovies = async ({
    query = searchQuery,
    appliedFilters = filters,
    requestedPage = 1,
    append = false,
  } = {}) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      setError('');

      let data;

      const hasFilters =
        appliedFilters.genre ||
        appliedFilters.year ||
        appliedFilters.rating;

      if (query.trim()) {
        data = await searchMovies(
          query.trim(),
          requestedPage
        );
      } else if (hasFilters) {
        data = await discoverMovies({
          genre: appliedFilters.genre,
          year: appliedFilters.year,
          rating: appliedFilters.rating,
          page: requestedPage,
        });
      } else {
        data = await getTrendingMovies();
      }

      const newMovies = data.results || [];

      setMovies((previousMovies) =>
        append
          ? [...previousMovies, ...newMovies]
          : newMovies
      );

      setPage(requestedPage);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error('Failed to load movies:', error);

      if (!append) {
        setMovies([]);
      }

      setError(
        'Unable to load movies right now. Please try again.'
      );
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    const cleanQuery = query.trim();

    if (!cleanQuery) {
      loadMovies({
        query: '',
        appliedFilters: filters,
        requestedPage: 1,
        append: false,
      });

      return;
    }

    loadMovies({
      query: cleanQuery,
      appliedFilters: {
        genre: '',
        year: '',
        rating: '',
      },
      requestedPage: 1,
      append: false,
    });
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);

    setSearchQuery('');

    loadMovies({
      query: '',
      appliedFilters: newFilters,
      requestedPage: 1,
      append: false,
    });
  };

  const handleLoadMore = () => {
    if (
      loadingMore ||
      loading ||
      page >= totalPages
    ) {
      return;
    }

    loadMovies({
      query: searchQuery,
      appliedFilters: filters,
      requestedPage: page + 1,
      append: true,
    });
  };

  const handleMovieClick = async (movieId) => {
    try {
      setSelectedMovie(movieId);
      setMovieDetails(null);
      setMovieDetailsError('');
      setMovieDetailsLoading(true);

      const details = await getMovieDetails(movieId);

      setMovieDetails(details);
    } catch (error) {
      console.error(
        'Failed to load movie details:',
        error
      );

      setMovieDetailsError(
        'Unable to load movie details. Please try again.'
      );
    } finally {
      setMovieDetailsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setMovieDetails(null);
    setMovieDetailsError('');
    setMovieDetailsLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + window.scrollY;

      const pageHeight =
        document.documentElement.scrollHeight;

      if (
        pageHeight - scrollPosition < 500
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, [
    loadingMore,
    loading,
    page,
    totalPages,
    searchQuery,
    filters,
  ]);

  const getPageTitle = () => {
    if (isSearching) {
      return `Search results for "${searchQuery}"`;
    }

    if (hasActiveFilters) {
      return 'Filtered Movies';
    }

    return 'Trending Movies';
  };

  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: 'calc(100vh - 72px)',

          borderLeft: '1px solid',
          borderRight: '1px solid',
          borderColor: 'divider',

          paddingTop: {
            xs: 3,
            sm: 4,
            md: 6,
          },

          paddingBottom: 6,

          paddingX: {
            xs: 1.5,
            sm: 2.5,
            md: 4,
            lg: 5,
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {/* Page Header */}
          <Box
            sx={{
              marginBottom: {
                xs: 3,
                md: 4,
              },
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              fontWeight={800}
              sx={{
                fontSize: {
                  xs: '2rem',
                  sm: '2.5rem',
                  md: '3rem',
                },
                letterSpacing: '-1px',
                marginBottom: 1,
              }}
            >
              Discover Movies
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
            >
              Explore trending movies, search for your
              favorites, and discover something new.
            </Typography>
          </Box>

          {/* Search */}
          <SearchBar
            onSearch={handleSearch}
          />

          {/* Filters */}
          <MovieFilters
            onApplyFilters={
              handleApplyFilters
            }
          />

          {/* Error */}
          {error && (
            <Alert
              severity="error"
              sx={{
                marginBottom: 4,
              }}
            >
              {error}
            </Alert>
          )}

          {/* Section Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: {
                xs: 'flex-start',
                sm: 'center',
              },
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              gap: 1,
              marginBottom: 3,
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              fontWeight={700}
            >
              {getPageTitle()}
            </Typography>

            {!loading && movies.length > 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {movies.length} movies
              </Typography>
            )}
          </Box>

          {/* Initial Loading */}
          {loading && (
            <Box
              sx={{
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <CircularProgress />

              <Typography
                color="text.secondary"
              >
                Loading movies...
              </Typography>
            </Box>
          )}

          {/* Empty State */}
          {!loading &&
            !error &&
            movies.length === 0 && (
              <Box
                sx={{
                  minHeight: 350,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: 3,
                  padding: 4,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  gutterBottom
                >
                  No movies found
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  Try a different search or adjust
                  your filters.
                </Typography>
              </Box>
            )}

          {/* Movie Grid */}
          {!loading &&
            movies.length > 0 && (
              <Box
                sx={{
                  display: 'grid',

                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, minmax(0, 1fr))',
                    md: 'repeat(3, minmax(0, 1fr))',
                    lg: 'repeat(4, minmax(0, 1fr))',
                  },

                  gap: {
                    xs: 2,
                    sm: 2.5,
                    md: 3,
                  },
                }}
              >
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={
                      handleMovieClick
                    }
                  />
                ))}
              </Box>
            )}

          {/* Infinite Scroll Loading */}
          {loadingMore && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                paddingTop: 5,
                paddingBottom: 2,
              }}
            >
              <CircularProgress
                size={30}
              />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Loading more movies...
              </Typography>
            </Box>
          )}

          {/* End of Results */}
          {!loading &&
            !loadingMore &&
            movies.length > 0 &&
            page >= totalPages && (
              <Typography
                align="center"
                variant="body2"
                color="text.secondary"
                sx={{
                  paddingTop: 5,
                }}
              >
                You've reached the end of the
                results.
              </Typography>
            )}
        </Box>
      </Container>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieModal
          movie={movieDetails}
          loading={movieDetailsLoading}
          error={movieDetailsError}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default Home;