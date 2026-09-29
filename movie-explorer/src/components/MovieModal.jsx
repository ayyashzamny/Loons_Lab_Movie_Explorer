function MovieModal({
  movie,
  loading,
  error,
  onClose,
}) {
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              {movie?.title || 'Movie Details'}
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">

            {loading && (
              <div className="text-center py-5">
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
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            {movie && !loading && !error && (
              <MovieContent movie={movie} />
            )}

          </div>

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
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const trailer = movie.videos?.results?.find(
    (video) =>
      video.site === 'YouTube' &&
      video.type === 'Trailer'
  );

  return (
    <div className="row g-4">

      <div className="col-md-4">
        <img
          src={posterUrl}
          alt={movie.title}
          className="img-fluid rounded shadow"
        />
      </div>

      <div className="col-md-8">

        <h2>{movie.title}</h2>

        <p className="text-muted">
          {movie.release_date || 'Release date unavailable'}
        </p>

        <p>
          ⭐ {movie.vote_average?.toFixed(1)}
        </p>

        <h5>Overview</h5>

        <p>
          {movie.overview || 'No overview available.'}
        </p>

        <h5>Genres</h5>

        <div className="d-flex flex-wrap gap-2 mb-4">
          {movie.genres?.map((genre) => (
            <span
              key={genre.id}
              className="badge bg-secondary"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <h5>Runtime</h5>

        <p>
          {movie.runtime
            ? `${movie.runtime} minutes`
            : 'N/A'}
        </p>

        <h5>Cast</h5>

        <div className="d-flex flex-wrap gap-2">
          {movie.credits?.cast
            ?.slice(0, 8)
            .map((actor) => (
              <span
                key={actor.id}
                className="badge bg-dark"
              >
                {actor.name}
              </span>
            ))}
        </div>

        {trailer && (
          <div className="mt-4">
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-danger"
            >
              Watch Trailer
            </a>
          </div>
        )}

      </div>

    </div>
  );
}

export default MovieModal;