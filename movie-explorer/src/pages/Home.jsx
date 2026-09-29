import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  getTrendingMovies,
  getMovieDetails,
  searchMovies,
  discoverMovies,
} from '../services/movieService';

import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import SearchBar from '../components/SearchBar';
import MovieFilters from '../components/MovieFilters';

function Home() {
  // Movies displayed on the page
  const [movies, setMovies] = useState([]);

  // Selected movie for details modal
  const [selectedMovie, setSelectedMovie] =
    useState(null);

  // Movie details loading state
  const [isLoadingDetails, setIsLoadingDetails] =
    useState(false);

  // Movie details error
  const [detailsError, setDetailsError] =
    useState('');

  // Search query
  const [searchQuery, setSearchQuery] =
    useState('');

  // Search loading state
  const [isSearching, setIsSearching] =
    useState(false);

  // Search error
  const [searchError, setSearchError] =
    useState('');

  // Current pagination page
  const [currentPage, setCurrentPage] =
    useState(1);

  // Total pages available from TMDb
  const [totalPages, setTotalPages] =
    useState(1);

  // Loading more movies
  const [isLoadingMore, setIsLoadingMore] =
    useState(false);

  // Current filters
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
  });

  // Filter loading state
  const [isFiltering, setIsFiltering] =
    useState(false);

  // Filter error
  const [filterError, setFilterError] =
    useState('');

  // Reference used by IntersectionObserver
  const observerRef = useRef(null);

  // --------------------------------------------------
  // Load initial movies
  // --------------------------------------------------

  useEffect(() => {
    const loadInitialMovies = async () => {
      const lastSearch =
        localStorage.getItem(
          'lastSearchedMovie'
        );

      try {
        // Restore previous search
        if (lastSearch) {
          setSearchQuery(lastSearch);
          setIsSearching(true);

          const data = await searchMovies(
            lastSearch,
            1
          );

          setMovies(data.results);
          setTotalPages(data.total_pages);
          setCurrentPage(1);

          return;
        }

        // Otherwise load trending movies
        const data =
          await getTrendingMovies();

        setMovies(data.results);
      } catch (error) {
        console.error(
          'Initial movie loading error:',
          error
        );

        setSearchError(
          'Unable to load movies. Please try again.'
        );
      } finally {
        setIsSearching(false);
      }
    };

    loadInitialMovies();
  }, []);

  // --------------------------------------------------
  // Search movies
  // --------------------------------------------------

  const handleSearch = async (query) => {
    try {
      setSearchQuery(query);

      setIsSearching(true);

      setSearchError('');

      setFilterError('');

      // Reset filters when searching
      setFilters({
        genre: '',
        year: '',
        rating: '',
      });

      // Reset pagination
      setCurrentPage(1);

      const data = await searchMovies(
        query,
        1
      );

      setMovies(data.results);

      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(
        'Search error:',
        error
      );

      setSearchError(
        'Unable to search movies. Please try again.'
      );
    } finally {
      setIsSearching(false);
    }
  };

  // --------------------------------------------------
  // Apply movie filters
  // --------------------------------------------------

  const handleApplyFilters = async (
    newFilters
  ) => {
    try {
      setIsFiltering(true);

      setFilterError('');

      setSearchError('');

      // Clear search mode
      setSearchQuery('');

      // Save filters
      setFilters(newFilters);

      // Reset pagination
      setCurrentPage(1);

      const data = await discoverMovies({
        ...newFilters,
        page: 1,
      });

      setMovies(data.results);

      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(
        'Filter error:',
        error
      );

      setFilterError(
        'Unable to load filtered movies. Please try again.'
      );
    } finally {
      setIsFiltering(false);
    }
  };

  // --------------------------------------------------
  // Load more movies
  // --------------------------------------------------

  const loadMoreMovies = async () => {
    // Do not load another page if
    // another request is already running
    if (isLoadingMore) {
      return;
    }

    // No more pages
    if (currentPage >= totalPages) {
      return;
    }

    // Determine whether we are searching
    // or filtering
    const isSearchMode =
      Boolean(searchQuery);

    const hasActiveFilters =
      filters.genre ||
      filters.year ||
      filters.rating;

    if (!isSearchMode && !hasActiveFilters) {
      return;
    }

    try {
      setIsLoadingMore(true);

      const nextPage =
        currentPage + 1;

      let data;

      // Search mode
      if (isSearchMode) {
        data = await searchMovies(
          searchQuery,
          nextPage
        );
      }

      // Filter mode
      else {
        data = await discoverMovies({
          ...filters,
          page: nextPage,
        });
      }

      setMovies(
        (previousMovies) => [
          ...previousMovies,
          ...data.results,
        ]
      );

      setCurrentPage(nextPage);
    } catch (error) {
      console.error(
        'Load more error:',
        error
      );

      setSearchError(
        'Unable to load more movies. Please try again.'
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  // --------------------------------------------------
  // Infinite scrolling
  // --------------------------------------------------

  useEffect(() => {
    const isSearchMode =
      Boolean(searchQuery);

    const hasActiveFilters =
      filters.genre ||
      filters.year ||
      filters.rating;

    // Infinite scrolling is only needed
    // for search or filtered results
    if (
      !isSearchMode &&
      !hasActiveFilters
    ) {
      return;
    }

    // No more pages
    if (currentPage >= totalPages) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting
          ) {
            loadMoreMovies();
          }
        },
        {
          threshold: 1.0,
        }
      );

    if (observerRef.current) {
      observer.observe(
        observerRef.current
      );
    }

    return () => {
      observer.disconnect();
    };
  }, [
    searchQuery,
    filters,
    currentPage,
    totalPages,
    isLoadingMore,
  ]);

  // --------------------------------------------------
  // Open movie details
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Close movie details modal
  // --------------------------------------------------

  const handleCloseModal = () => {
    setSelectedMovie(null);

    setDetailsError('');
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="container py-5">

      {/* Page heading */}

      <h1 className="text-center mb-2">
        Movie Explorer
      </h1>

      <p className="text-center text-muted mb-4">
        Discover your next favorite movie
      </p>

      {/* Search */}

      <SearchBar
        onSearch={handleSearch}
      />

      {/* Filters */}

      <MovieFilters
        onApplyFilters={
          handleApplyFilters
        }
      />

      {/* Search error */}

      {searchError && (
        <div className="alert alert-danger">
          {searchError}
        </div>
      )}

      {/* Filter error */}

      {filterError && (
        <div className="alert alert-danger">
          {filterError}
        </div>
      )}

      {/* Search loading */}

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

      {/* Filter loading */}

      {isFiltering && (
        <div className="text-center mb-4">

          <div
            className="spinner-border"
            role="status"
          >
            <span className="visually-hidden">
              Filtering...
            </span>
          </div>

          <p className="mt-2 text-muted">
            Loading filtered movies...
          </p>

        </div>
      )}

      {/* Section heading */}

      {!isSearching &&
        !isFiltering && (
          <h2 className="mb-4">

            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : filters.genre ||
                filters.year ||
                filters.rating
              ? 'Filtered Movies'
              : 'Trending Movies'}

          </h2>
        )}

      {/* Movie grid */}

      {!isSearching &&
        !isFiltering && (
          <>
            {movies.length === 0 ? (
              <div className="text-center py-5">

                <h3>
                  No movies found
                </h3>

                <p className="text-muted">
                  Try a different search or filter.
                </p>

              </div>
            ) : (
              <div className="row g-4">

                {movies.map((movie) => (
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
            )}
          </>
        )}

      {/* Infinite scrolling trigger */}

      {(searchQuery ||
        filters.genre ||
        filters.year ||
        filters.rating) &&
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
          onClose={
            handleCloseModal
          }
        />
      )}

    </div>
  );
}

export default Home;