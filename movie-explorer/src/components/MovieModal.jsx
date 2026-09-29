import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';

function MovieModal({
  movie,
  loading,
  error,
  onClose,
}) {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      scroll="paper"
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          component="span"
          variant="h6"
          fontWeight={600}
        >
          {movie?.title || 'Movie Details'}
        </Typography>

        <IconButton
          onClick={onClose}
          aria-label="Close"
        >
          <Typography
            component="span"
            sx={{
              fontSize: '28px',
              lineHeight: 1,
            }}
          >
            ×
          </Typography>
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading && (
          <Box
            sx={{
              minHeight: 250,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />

            <Typography
              color="text.secondary"
              sx={{
                marginTop: 2,
              }}
            >
              Loading movie details...
            </Typography>
          </Box>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{
              marginTop: 1,
            }}
          >
            {error}
          </Alert>
        )}

        {movie &&
          !loading &&
          !error && (
            <MovieContent movie={movie} />
          )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function MovieContent({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const trailer =
    movie.videos?.results?.find(
      (video) =>
        video.site === 'YouTube' &&
        video.type === 'Trailer'
    );

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${
        movie.runtime % 60
      }m`
    : 'N/A';

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: '280px 1fr',
        },
        gap: 4,
        paddingTop: 1,
      }}
    >
      <Box>
        {posterUrl ? (
          <Box
            component="img"
            src={posterUrl}
            alt={movie.title}
            sx={{
              width: '100%',
              maxHeight: {
                xs: 500,
                md: 600,
              },
              objectFit: 'cover',
              borderRadius: 2,
              display: 'block',
            }}
          />
        ) : (
          <Box
            sx={{
              minHeight: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover',
              borderRadius: 2,
            }}
          >
            <Typography color="text.secondary">
              No Poster Available
            </Typography>
          </Box>
        )}
      </Box>

      <Box>
        <Typography
          variant="h4"
          component="h2"
          fontWeight={700}
          gutterBottom
        >
          {movie.title}
        </Typography>

        {movie.tagline && (
          <Typography
            variant="body1"
            color="text.secondary"
            fontStyle="italic"
            sx={{
              marginBottom: 2,
            }}
          >
            "{movie.tagline}"
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            marginBottom: 4,
          }}
        >
          <Typography variant="body2">
            📅 {movie.release_date || 'N/A'}
          </Typography>

          <Typography variant="body2">
            ⭐{' '}
            {movie.vote_average
              ? movie.vote_average.toFixed(1)
              : 'N/A'}
          </Typography>

          <Typography variant="body2">
            ⏱️ {runtime}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
        >
          Overview
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            lineHeight: 1.7,
          }}
        >
          {movie.overview ||
            'No overview available.'}
        </Typography>

        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            marginTop: 4,
            marginBottom: 1.5,
          }}
        >
          Genres
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            marginBottom: 4,
          }}
        >
          {movie.genres?.length > 0 ? (
            movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                size="small"
              />
            ))
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              No genres available.
            </Typography>
          )}
        </Box>

        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
        >
          Cast
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {movie.credits?.cast?.length > 0 ? (
            movie.credits.cast
              .slice(0, 8)
              .map((actor) => (
                <Chip
                  key={actor.id}
                  label={actor.name}
                  size="small"
                  variant="outlined"
                />
              ))
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              No cast information available.
            </Typography>
          )}
        </Box>

        {trailer && (
          <Box
            sx={{
              marginTop: 5,
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                marginBottom: 2,
              }}
            >
              Trailer
            </Typography>

            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                overflow: 'hidden',
                borderRadius: 2,
              }}
            >
              <Box
                component="iframe"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
              />
            </Box>
          </Box>
        )}

        {!trailer && (
          <Alert
            severity="info"
            sx={{
              marginTop: 5,
            }}
          >
            No trailer is available for this movie.
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default MovieModal;