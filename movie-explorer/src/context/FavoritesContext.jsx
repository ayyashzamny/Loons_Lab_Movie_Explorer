import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');

    return savedFavorites
      ? JSON.parse(savedFavorites)
      : [];
  });

  // Save favorites whenever they change
  useEffect(() => {
    localStorage.setItem(
      'movieFavorites',
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // Add or remove a movie from favorites
  const toggleFavorite = (movie) => {
    setFavorites((previousFavorites) => {
      const alreadyFavorite = previousFavorites.some(
        (favorite) => favorite.id === movie.id
      );

      if (alreadyFavorite) {
        return previousFavorites.filter(
          (favorite) => favorite.id !== movie.id
        );
      }

      return [...previousFavorites, movie];
    });
  };

  // Check whether a movie is already a favorite
  const isFavorite = (movieId) => {
    return favorites.some(
      (favorite) => favorite.id === movieId
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}

export default FavoritesProvider;

