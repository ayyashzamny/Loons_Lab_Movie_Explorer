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

  // Load movie genres from TMDb
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await getMovieGenres();

        setGenres(data.genres);
      } catch (error) {
        console.error(
          'Failed to load genres:',
          error
        );
      }
    };

    loadGenres();
  }, []);

  // Apply selected filters
  const handleApply = () => {
    onApplyFilters({
      genre: selectedGenre,
      year: selectedYear,
      rating: selectedRating,
    });
  };

  // Clear all filters
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

  // Generate years from current year back to 1950
  const currentYear = new Date().getFullYear();

  const years = [];

  for (
    let year = currentYear;
    year >= 1950;
    year--
  ) {
    years.push(year);
  }

  return (
    <div className="card shadow-sm mb-5">
      <div className="card-body">

        <h5 className="card-title mb-3">
          Filter Movies
        </h5>

        <div className="row g-3">

          {/* Genre */}
          <div className="col-12 col-md-4">

            <label
              htmlFor="genre"
              className="form-label"
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
            >
              <option value="">
                All Genres
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

          {/* Release Year */}
          <div className="col-12 col-md-4">

            <label
              htmlFor="year"
              className="form-label"
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

          {/* Minimum Rating */}
          <div className="col-12 col-md-4">

            <label
              htmlFor="rating"
              className="form-label"
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

        <div className="mt-4 d-flex gap-2">

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
          >
            Clear
          </button>

        </div>

      </div>
    </div>
  );
}

export default MovieFilters;