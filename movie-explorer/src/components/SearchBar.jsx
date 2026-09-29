import { useEffect, useState } from 'react';

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
      localStorage.removeItem('lastSearchedMovie');

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
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="input-group input-group-lg">

        <input
          type="text"
          className="form-control"
          placeholder="Search for a movie..."
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
        />

        <button
          type="submit"
          className="btn btn-dark"
        >
          Search
        </button>

      </div>
    </form>
  );
}

export default SearchBar;