import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('movieTheme');

    return savedTheme || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-bs-theme',
      theme
    );

    localStorage.setItem(
      'movieTheme',
      theme
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((previousTheme) =>
      previousTheme === 'light'
        ? 'dark'
        : 'light'
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeProvider;

