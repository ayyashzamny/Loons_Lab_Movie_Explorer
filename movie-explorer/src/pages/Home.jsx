import { useEffect, useRef, useState } from 'react';

import {
  getTrendingMovies,
  getMovieDetails,
  searchMovies,
} from '../services/movieService';

import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import SearchBar from '../components/SearchBar';

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const observerRef = useRef(null);

  // Load trending movies when the page first loads
  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies();

        setMovies(data.results);
      } catch (error) {
        console.error('TMDb Error:', error);
      }
    };

    loadTrendingMovies();
  }, []);

  // Search movies
  const handleSearch = async (query) => {
    try {
      setSearchQuery(query);
      setIsSearching(true);
      setSearchError('');

      setCurrentPage(1);

      const data = await searchMovies(query, 1);

      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Search error:', error);

      setSearchError(
        'Unable to search movies. Please try again.'
      );
    } finally {
      setIsSearching(false);
    }
  };

  // Load next page of search results
  const loadMoreMovies = async () => {
    if (
      !searchQuery ||
      isLoadingMore ||
      currentPage >= totalPages
    ) {
      return;
    }

    try {
      setIsLoadingMore(true);

      const nextPage = currentPage + 1;

      const data = await searchMovies(
        searchQuery,
        nextPage
      );

      setMovies((previousMovies) => [
        ...previousMovies,
        ...data.results,
      ]);

      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Load more error:', error);

      setSearchError(
        'Unable to load more movies. Please try again.'
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Detect when the user reaches the bottom
  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreMovies();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [
    searchQuery,
    currentPage,
    totalPages,
    isLoadingMore,
  ]);

  // Open movie details modal
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

  // Close movie details modal
  const handleCloseModal = () => {
    setSelectedMovie(null);
    setDetailsError('');
  };

  return (
    <div className="container py-5">

      <h1 className="text-center mb-2">
        Movie Explorer
      </h1>

      <p className="text-center text-muted mb-4">
        Discover your next favorite movie
      </p>

      <SearchBar onSearch={handleSearch} />

      {searchError && (
        <div className="alert alert-danger">
          {searchError}
        </div>
      )}

      {isSearching && (
        <div className="text-center mb-4">
          <div
            className="spinner-border"
            role="status"
          >
            <span className="visually-hidden">
              Searching...
            </span>
          </div>

          <p className="mt-2 text-muted">
            Searching for "{searchQuery}"...
          </p>
        </div>
      )}

      {!isSearching && (
        <h2 className="mb-4">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : 'Trending Movies'}
        </h2>
      )}

      <div className="row g-4">

        {movies.map((movie) => (
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

      {/* Infinite scrolling trigger */}
      {searchQuery &&
        currentPage < totalPages && (
          <div
            ref={observerRef}
            className="text-center py-5"
          >
            {isLoadingMore && (
              <>
                <div
                  className="spinner-border"
                  role="status"
                >
                  <span className="visually-hidden">
                    Loading more...
                  </span>
                </div>

                <p className="mt-2 text-muted">
                  Loading more movies...
                </p>
              </>
            )}
          </div>
        )}

      {/* Movie details modal */}
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

export default Home;

