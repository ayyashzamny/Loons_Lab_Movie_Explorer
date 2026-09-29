import { useState } from 'react';

import { getMovieDetails } from '../services/movieService';

import { useFavorites } from '../context/FavoritesContext';

import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

function Favorites() {
  const {
    favorites,
  } = useFavorites();

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const [detailsError, setDetailsError] = useState('');

  const handleMovieClick = async (movieId) => {
    try {
      setIsLoadingDetails(true);
      setDetailsError('');
      setSelectedMovie(null);

      const data = await getMovieDetails(movieId);

      setSelectedMovie(data);
    } catch (error) {
      console.error('Movie details error:', error);

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

      <h1 className="mb-4">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-5">

          <h3>
            No favorite movies yet
          </h3>

          <p className="text-muted">
            Add movies to your favorites and they
            will appear here.
          </p>

        </div>
      ) : (
        <div className="row g-4">

          {favorites.map((movie) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={movie.id}
            >
              <MovieCard
                movie={movie}
                onMovieClick={handleMovieClick}
              />
            </div>
          ))}

        </div>
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

