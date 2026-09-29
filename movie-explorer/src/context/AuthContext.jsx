import {
  createContext,
  useContext,
  useState,
} from 'react';

const AuthContext = createContext();

const APP_USERNAME =
  import.meta.env.VITE_APP_USERNAME;

const APP_PASSWORD =
  import.meta.env.VITE_APP_PASSWORD;

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('movieUser');

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const login = (username, password) => {
    if (
      username === APP_USERNAME &&
      password === APP_PASSWORD
    ) {
      const userData = {
        username,
      };

      localStorage.setItem(
        'movieUser',
        JSON.stringify(userData)
      );

      setUser(userData);

      return {
        success: true,
      };
    }

    return {
      success: false,
      message: 'Invalid username or password.',
    };
  };

  const logout = () => {
    localStorage.removeItem('movieUser');

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;

