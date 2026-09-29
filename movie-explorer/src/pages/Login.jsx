import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

function Login() {
  const { user, login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  // If the user is already logged in,
  // redirect them to the home page.
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setError('');

    // Validate empty fields
    if (!username.trim() || !password.trim()) {
      setError(
        'Please enter both username and password.'
      );

      return;
    }

    // Check credentials
    const result = login(
      username.trim(),
      password
    );

    // If credentials are incorrect
    if (!result.success) {
      setError(result.message);

      return;
    }

    // Successful login is handled by AuthContext
  };

  return (
    <div className="container">

      <div className="row justify-content-center align-items-center min-vh-100">

        <div className="col-12 col-sm-10 col-md-6 col-lg-4">

          <div className="card shadow-sm">

            <div className="card-body p-4 p-md-5">

              <h1 className="text-center mb-2">
                Movie Explorer
              </h1>

              <p className="text-center text-muted mb-4">
                Sign in to continue
              </p>

              {error && (
                <div
                  className="alert alert-danger"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Username */}
                <div className="mb-3">

                  <label
                    htmlFor="username"
                    className="form-label"
                  >
                    Username
                  </label>

                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(event) =>
                      setUsername(event.target.value)
                    }
                    placeholder="Enter username"
                    autoComplete="username"
                  />

                </div>

                {/* Password */}
                <div className="mb-4">

                  <label
                    htmlFor="password"
                    className="form-label"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />

                </div>

                {/* Login button */}
                <button
                  type="submit"
                  className="btn btn-dark w-100"
                >
                  Login
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;