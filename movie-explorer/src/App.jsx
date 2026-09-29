import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import FavoritesProvider from './context/FavoritesContext';
import ThemeProvider from './context/ThemeContext';
import AuthProvider, {
  useAuth,
} from './context/AuthContext';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Login from './pages/Login';

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>

      <ThemeProvider>

        <AuthProvider>

          <FavoritesProvider>

            <AppRoutes />

          </FavoritesProvider>

        </AuthProvider>

      </ThemeProvider>

    </BrowserRouter>
  );
}

export default App;

