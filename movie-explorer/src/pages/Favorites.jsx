import { useState } from 'react';

import {
  getMovieDetails,
} from '../services/movieService';

import {
  useFavorites,
} from '../context/FavoritesContext';

import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

function Favorites() {
  const {
    favorites,
  } = useFavorites();

  const [
    selectedMovie,
    setSelectedMovie,
  ] = useState(null);

  const [
    isLoadingDetails,
    setIsLoadingDetails,
  ] = useState(false);

  const [
    detailsError,
    setDetailsError,
  ] = useState('');

  const handleMovieClick = async (
    movieId
  ) => {
    try {
      setIsLoadingDetails(true);

      setDetailsError('');

      setSelectedMovie(null);

      const data =
        await getMovieDetails(movieId);

      setSelectedMovie(data);
    } catch (error) {
      console.error(
        'Movie details error:',
        error
      );

      setDetailsError(
        'Unable to load movie details. Please try again.'
      );
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);

    setDetailsError('');
  };

  return (
    <div className="container py-5">

      <div className="mb-5">

        <h1 className="mb-2">
          My Favorites
        </h1>

        <p className="text-muted mb-0">
          Movies you have saved for later.
        </p>

      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">

          <h3>
            No favorite movies yet
          </h3>

          <p className="text-muted">
            Click the heart button on a movie
            to add it to your favorites.
          </p>

        </div>
      ) : (
        <>

          <p className="text-muted mb-4">
            {favorites.length}{' '}
            {favorites.length === 1
              ? 'movie'
              : 'movies'}{' '}
            saved
          </p>

          <div className="row g-4">

            {favorites.map((movie) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={movie.id}
              >
                <MovieCard
                  movie={movie}
                  onMovieClick={
                    handleMovieClick
                  }
                />
              </div>
            ))}

          </div>

        </>
      )}

      {(isLoadingDetails ||
        detailsError ||
        selectedMovie) && (
        <MovieModal
          movie={selectedMovie}
          loading={isLoadingDetails}
          error={detailsError}
          onClose={handleCloseModal}
        />
      )}

    </div>
  );
}

export default Favorites;