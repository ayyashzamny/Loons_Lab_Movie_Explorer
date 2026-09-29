import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import FavoritesProvider from './context/FavoritesContext';
import ThemeProvider from './context/ThemeContext';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  return (
    <BrowserRouter>

      <ThemeProvider>
        <FavoritesProvider>

          <Navbar />

          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/favorites"
              element={<Favorites />}
            />
          </Routes>

        </FavoritesProvider>
      </ThemeProvider>

    </BrowserRouter>
  );
}

export default App;

