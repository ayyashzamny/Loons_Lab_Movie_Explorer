import { useEffect, useState } from 'react';

import {
  Box,
  TextField,
  Button,
} from '@mui/material';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const lastSearch = localStorage.getItem(
      'lastSearchedMovie'
    );

    if (lastSearch) {
      setQuery(lastSearch);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      localStorage.removeItem(
        'lastSearchedMovie'
      );

      onSearch('');

      return;
    }

    localStorage.setItem(
      'lastSearchedMovie',
      trimmedQuery
    );

    onSearch(trimmedQuery);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        gap: 1,
        marginBottom: 5,
      }}
    >
      <TextField
        fullWidth
        label="Search movies"
        placeholder="Search for a movie..."
        value={query}
        onChange={(event) =>
          setQuery(event.target.value)
        }
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          minWidth: {
            xs: '100%',
            sm: 110,
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;