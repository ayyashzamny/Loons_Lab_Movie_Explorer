import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';

import { useFavorites } from '../context/FavoritesContext';

function MovieCard({ movie, onMovieClick }) {
  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : 'N/A';

  const rating =
    typeof movie.vote_average === 'number'
      ? movie.vote_average.toFixed(1)
      : 'N/A';

  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();

    toggleFavorite(movie);
  };

  const handleCardClick = () => {
    onMovieClick(movie.id);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: '100%',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition:
          'transform 0.25s ease, box-shadow 0.25s ease',

        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: 6,
        },
      }}
    >
      {posterUrl ? (
        <CardMedia
          component="img"
          image={posterUrl}
          alt={movie.title}
          loading="lazy"
          sx={{
            height: {
              xs: 450,
              sm: 420,
            },
            objectFit: 'cover',
          }}
        />
      ) : (
        <Box
          sx={{
            height: {
              xs: 450,
              sm: 420,
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'action.hover',
          }}
        >
          <Typography color="text.secondary">
            No Poster Available
          </Typography>
        </Box>
      )}

      <IconButton
        onClick={handleFavoriteClick}
        aria-label={
          favorite
            ? 'Remove from favorites'
            : 'Add to favorites'
        }
        title={
          favorite
            ? 'Remove from favorites'
            : 'Add to favorites'
        }
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 42,
          height: 42,

          backgroundColor: favorite
            ? 'error.main'
            : 'background.paper',

          color: favorite
            ? 'white'
            : 'text.primary',

          boxShadow: 2,

          fontSize: '24px',
          fontWeight: 700,

          '&:hover': {
            backgroundColor: favorite
              ? 'error.dark'
              : 'action.hover',

            transform: 'scale(1.1)',
          },

          transition: 'transform 0.2s ease',
        }}
      >
        {favorite ? '♥' : '♡'}
      </IconButton>

      <CardContent>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 56,
            marginBottom: 1,
          }}
        >
          {movie.title}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {releaseYear}
          </Typography>

          <Typography
            variant="body2"
            fontWeight={600}
          >
            ⭐ {rating}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieCard;