import { useState } from 'react';

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';

import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

import { useFavorites } from '../context/FavoritesContext';

import { getMovieDetails } from '../services/movieService';

function Favorites() {
  const { favorites } = useFavorites();

  const [selectedMovie, setSelectedMovie] =
    useState(null);

  const [movieDetails, setMovieDetails] =
    useState(null);

  const [movieDetailsLoading, setMovieDetailsLoading] =
    useState(false);

  const [movieDetailsError, setMovieDetailsError] =
    useState('');

  const handleMovieClick = async (movieId) => {
    try {
      setSelectedMovie(movieId);
      setMovieDetails(null);
      setMovieDetailsError('');
      setMovieDetailsLoading(true);

      const details =
        await getMovieDetails(movieId);

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
          {/* Header */}
          <Box
            sx={{
              marginBottom: {
                xs: 3,
                md: 5,
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
              My Favorites
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
            >
              {favorites.length === 0
                ? 'Movies you save will appear here.'
                : `${favorites.length} ${
                    favorites.length === 1
                      ? 'movie'
                      : 'movies'
                  } saved to your favorites.`}
            </Typography>
          </Box>

          {/* Empty Favorites */}
          {favorites.length === 0 && (
            <Box
              sx={{
                minHeight: 400,

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',

                textAlign: 'center',

                border: '1px dashed',
                borderColor: 'divider',

                borderRadius: 3,

                padding: {
                  xs: 3,
                  sm: 5,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: '3rem',
                    sm: '4rem',
                  },
                  lineHeight: 1,
                  marginBottom: 2,
                }}
              >
                ♡
              </Typography>

              <Typography
                variant="h5"
                fontWeight={700}
                gutterBottom
              >
                No favorites yet
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  maxWidth: 450,
                }}
              >
                Explore movies on the home page
                and add the ones you love to your
                favorites.
              </Typography>
            </Box>
          )}

          {/* Favorites Grid */}
          {favorites.length > 0 && (
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
              {favorites.map((movie) => (
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

export default Favorites;