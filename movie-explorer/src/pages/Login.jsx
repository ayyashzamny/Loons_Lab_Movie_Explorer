import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';

import { useAuth } from '../context/AuthContext';

function Login() {
  const { user, login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setError('');

    if (!username.trim() || !password.trim()) {
      setError(
        'Please enter both username and password.'
      );

      return;
    }

    const result = login(
      username.trim(),
      password
    );

    if (!result.success) {
      setError(result.message);

      return;
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Card
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 420,
        }}
      >
        <CardContent
          sx={{
            padding: {
              xs: 3,
              sm: 5,
            },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            fontWeight={700}
            gutterBottom
          >
            Movie Explorer
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{
              marginBottom: 4,
            }}
          >
            Sign in to continue
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                marginBottom: 3,
              }}
            >
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="Username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Enter username"
              autoComplete="username"
              margin="normal"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter password"
              autoComplete="current-password"
              margin="normal"
              sx={{
                marginBottom: 3,
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;