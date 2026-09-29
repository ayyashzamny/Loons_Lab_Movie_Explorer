import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const savedTheme = localStorage.getItem('movieTheme');

    return savedTheme || 'light';
  });

  const muiTheme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: {
          main: '#1976d2',
        },
      },
      typography: {
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      },
      shape: {
        borderRadius: 10,
      },
    });
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('movieTheme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((previousMode) =>
      previousMode === 'light' ? 'dark' : 'light'
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: mode,
        toggleTheme,
      }}
    >
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeProvider;