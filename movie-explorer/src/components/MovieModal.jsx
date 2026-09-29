function MovieModal({
  movie,
  loading,
  error,
  onClose,
}) {
  return (
    <div
      className="modal fade show d-block movie-modal-backdrop"
      tabIndex="-1"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-content">

          {/* Header */}

          <div className="modal-header">

            <h5 className="modal-title">
              {movie?.title || 'Movie Details'}
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>

          </div>

          {/* Body */}

          <div className="modal-body">

            {loading && (
              <div className="loading-container">

                <div
                  className="spinner-border"
                  role="status"
                >
                  <span className="visually-hidden">
                    Loading...
                  </span>
                </div>

                <p className="mt-3 text-muted">
                  Loading movie details...
                </p>

              </div>
            )}

            {error && (
              <div
                className="alert alert-danger"
                role="alert"
              >
                {error}
              </div>
            )}

            {movie &&
              !loading &&
              !error && (
                <MovieContent movie={movie} />
              )}

          </div>

          {/* Footer */}

          <div className="modal-footer">

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

function MovieContent({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  // Find a YouTube trailer
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
    <div className="row g-4">

      {/* Poster */}

      <div className="col-md-4">

        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="img-fluid rounded shadow movie-modal-poster"
          />
        ) : (
          <div
            className="bg-secondary-subtle rounded d-flex align-items-center justify-content-center"
            style={{
              minHeight: '500px',
            }}
          >
            <span className="text-muted">
              No Poster Available
            </span>
          </div>
        )}

      </div>

      {/* Movie Details */}

      <div className="col-md-8">

        <h2 className="mb-2">
          {movie.title}
        </h2>

        {movie.tagline && (
          <p className="fst-italic text-muted">
            "{movie.tagline}"
          </p>
        )}

        {/* Basic information */}

        <div className="d-flex flex-wrap gap-3 mb-4">

          <span>
            📅 {movie.release_date || 'N/A'}
          </span>

          <span>
            ⭐{' '}
            {movie.vote_average
              ?.toFixed(1) || 'N/A'}
          </span>

          <span>
            ⏱️ {runtime}
          </span>

        </div>

        {/* Overview */}

        <h5>Overview</h5>

        <p className="movie-overview">
          {movie.overview ||
            'No overview available.'}
        </p>

        {/* Genres */}

        <h5 className="mt-4">
          Genres
        </h5>

        <div className="d-flex flex-wrap gap-2 mb-4">

          {movie.genres?.length > 0 ? (
            movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="badge bg-secondary movie-badge"
              >
                {genre.name}
              </span>
            ))
          ) : (
            <span className="text-muted">
              No genres available.
            </span>
          )}

        </div>

        {/* Cast */}

        <h5>Cast</h5>

        <div className="d-flex flex-wrap gap-2">

          {movie.credits?.cast?.length > 0 ? (
            movie.credits.cast
              .slice(0, 8)
              .map((actor) => (
                <span
                  key={actor.id}
                  className="badge bg-dark movie-badge"
                >
                  {actor.name}
                </span>
              ))
          ) : (
            <span className="text-muted">
              No cast information available.
            </span>
          )}

        </div>

        {/* Trailer */}

        {trailer && (
          <div className="mt-5">

            <h5 className="mb-3">
              Trailer
            </h5>

            <div className="ratio ratio-16x9">

              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>

            </div>

          </div>
        )}

        {/* No trailer */}

        {!trailer && (
          <div className="alert alert-secondary mt-5">
            No trailer is available for this movie.
          </div>
        )}

      </div>

    </div>
  );
}

export default MovieModal;