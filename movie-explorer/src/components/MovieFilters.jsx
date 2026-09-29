import { useEffect, useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

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
    <Card
      elevation={2}
      sx={{
        marginBottom: 5,
      }}
    >
      <CardContent
        sx={{
          padding: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        <Box
          sx={{
            marginBottom: 3,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            gutterBottom
          >
            Filter Movies
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Narrow down your movie results
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 2,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="genre-label">
              Genre
            </InputLabel>

            <Select
              labelId="genre-label"
              id="genre"
              value={selectedGenre}
              label="Genre"
              onChange={(event) =>
                setSelectedGenre(
                  event.target.value
                )
              }
              disabled={isLoadingGenres}
            >
              <MenuItem value="">
                {isLoadingGenres
                  ? 'Loading genres...'
                  : 'All Genres'}
              </MenuItem>

              {genres.map((genre) => (
                <MenuItem
                  key={genre.id}
                  value={genre.id}
                >
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="year-label">
              Release Year
            </InputLabel>

            <Select
              labelId="year-label"
              id="year"
              value={selectedYear}
              label="Release Year"
              onChange={(event) =>
                setSelectedYear(
                  event.target.value
                )
              }
            >
              <MenuItem value="">
                All Years
              </MenuItem>

              {years.map((year) => (
                <MenuItem
                  key={year}
                  value={year}
                >
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="rating-label">
              Minimum Rating
            </InputLabel>

            <Select
              labelId="rating-label"
              id="rating"
              value={selectedRating}
              label="Minimum Rating"
              onChange={(event) =>
                setSelectedRating(
                  event.target.value
                )
              }
            >
              <MenuItem value="">
                Any Rating
              </MenuItem>

              <MenuItem value="5">
                5+
              </MenuItem>

              <MenuItem value="6">
                6+
              </MenuItem>

              <MenuItem value="7">
                7+
              </MenuItem>

              <MenuItem value="8">
                8+
              </MenuItem>

              <MenuItem value="9">
                9+
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            marginTop: 3,
          }}
        >
          <Button
            variant="contained"
            onClick={handleApply}
          >
            Apply Filters
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            onClick={handleClear}
            disabled={!hasFilters}
          >
            Clear Filters
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieFilters;