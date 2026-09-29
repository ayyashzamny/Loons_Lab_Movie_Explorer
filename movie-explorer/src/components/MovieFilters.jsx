import { useEffect, useState } from 'react';

import {
  getMovieGenres,
} from '../services/movieService';

function MovieFilters({ onApplyFilters }) {
  const [genres, setGenres] = useState([]);

  const [selectedGenre, setSelectedGenre] =
    useState('');

  const [selectedYear, setSelectedYear] =
    useState('');

  const [selectedRating, setSelectedRating] =
    useState('');

  const [isLoadingGenres, setIsLoadingGenres] =
    useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        setIsLoadingGenres(true);

        const data =
          await getMovieGenres();

        setGenres(data.genres || []);
      } catch (error) {
        console.error(
          'Failed to load genres:',
          error
        );
      } finally {
        setIsLoadingGenres(false);
      }
    };

    loadGenres();
  }, []);

  const handleApply = () => {
    onApplyFilters({
      genre: selectedGenre,
      year: selectedYear,
      rating: selectedRating,
    });
  };

  const handleClear = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedRating('');

    onApplyFilters({
      genre: '',
      year: '',
      rating: '',
    });
  };

  const currentYear =
    new Date().getFullYear();

  const years = [];

  for (
    let year = currentYear;
    year >= 1950;
    year--
  ) {
    years.push(year);
  }

  const hasFilters =
    selectedGenre ||
    selectedYear ||
    selectedRating;

  return (
    <div className="card movie-filters shadow-sm mb-5">

      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h5 className="filter-title mb-1">
              Filter Movies
            </h5>

            <p className="text-muted mb-0">
              Narrow down your movie results
            </p>
          </div>

        </div>

        <div className="row g-3">

          {/* Genre */}

          <div className="col-12 col-md-4">

            <label
              htmlFor="genre"
              className="form-label fw-semibold"
            >
              Genre
            </label>

            <select
              id="genre"
              className="form-select"
              value={selectedGenre}
              onChange={(event) =>
                setSelectedGenre(
                  event.target.value
                )
              }
              disabled={isLoadingGenres}
            >
              <option value="">
                {isLoadingGenres
                  ? 'Loading genres...'
                  : 'All Genres'}
              </option>

              {genres.map((genre) => (
                <option
                  key={genre.id}
                  value={genre.id}
                >
                  {genre.name}
                </option>
              ))}
            </select>

          </div>

          {/* Year */}

          <div className="col-12 col-md-4">

            <label
              htmlFor="year"
              className="form-label fw-semibold"
            >
              Release Year
            </label>

            <select
              id="year"
              className="form-select"
              value={selectedYear}
              onChange={(event) =>
                setSelectedYear(
                  event.target.value
                )
              }
            >
              <option value="">
                All Years
              </option>

              {years.map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>

          </div>

          {/* Rating */}

          <div className="col-12 col-md-4">

            <label
              htmlFor="rating"
              className="form-label fw-semibold"
            >
              Minimum Rating
            </label>

            <select
              id="rating"
              className="form-select"
              value={selectedRating}
              onChange={(event) =>
                setSelectedRating(
                  event.target.value
                )
              }
            >
              <option value="">
                Any Rating
              </option>

              <option value="5">
                5+
              </option>

              <option value="6">
                6+
              </option>

              <option value="7">
                7+
              </option>

              <option value="8">
                8+
              </option>

              <option value="9">
                9+
              </option>
            </select>

          </div>

        </div>

        <div className="mt-4 d-flex flex-wrap gap-2">

          <button
            type="button"
            className="btn btn-dark"
            onClick={handleApply}
          >
            Apply Filters
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleClear}
            disabled={!hasFilters}
          >
            Clear Filters
          </button>

        </div>

      </div>

    </div>
  );
}

export default MovieFilters;