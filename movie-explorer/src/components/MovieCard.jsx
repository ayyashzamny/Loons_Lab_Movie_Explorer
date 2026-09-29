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
    <div
      className="card movie-card shadow-sm"
      style={{ cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <div className="movie-card-image-container">

        {posterUrl ? (
          <img
            src={posterUrl}
            className="movie-card-image"
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div
            className="movie-card-image bg-secondary-subtle d-flex align-items-center justify-content-center"
          >
            <span className="text-muted">
              No Poster Available
            </span>
          </div>
        )}

        <button
          type="button"
          className={`favorite-button position-absolute top-0 end-0 m-3 ${
            favorite
              ? 'btn-danger'
              : 'btn-light'
          }`}
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
        >
          {favorite ? '♥' : '♡'}
        </button>

      </div>

      <div className="card-body">

        <h5 className="card-title movie-title">
          {movie.title}
        </h5>

        <div className="d-flex justify-content-between align-items-center">

          <span className="text-muted">
            {releaseYear}
          </span>

          <span className="movie-rating">
            ⭐ {rating}
          </span>

        </div>

      </div>
    </div>
  );
}

export default MovieCard;