import { useFavorites } from '../context/FavoritesContext';

function MovieCard({ movie, onMovieClick }) {
  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : 'N/A';

  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();

    toggleFavorite(movie);
  };

  return (
    <div
      className="card h-100 shadow-sm"
      style={{ cursor: 'pointer' }}
      onClick={() => onMovieClick(movie.id)}
    >
      <div className="position-relative">

        <img
          src={posterUrl}
          className="card-img-top"
          alt={movie.title}
          style={{
            height: '400px',
            objectFit: 'cover',
          }}
        />

        <button
          type="button"
          className={`btn position-absolute top-0 end-0 m-2 ${
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
        >
          {favorite ? '♥' : '♡'}
        </button>

      </div>

      <div className="card-body">

        <h5 className="card-title">
          {movie.title}
        </h5>

        <p className="card-text text-muted mb-1">
          {releaseYear}
        </p>

        <p className="card-text">
          ⭐ {movie.vote_average?.toFixed(1)}
        </p>

      </div>
    </div>
  );
}

export default MovieCard;
