import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';

import { Link } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import MovieIcon from '@mui/icons-material/Movie';

import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  const {
    user,
    logout,
  } = useAuth();

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(12px)',
        backgroundColor: 'background.paper',
      }}
    >
      <Toolbar
        sx={{
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          minHeight: {
            xs: 64,
            sm: 72,
          },
          paddingX: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* BRAND */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.2,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >

          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.5px',
              display: {
                xs: 'none',
                sm: 'block',
              },
            }}
          >
            Movie Explorer
          </Typography>

          {/* Short brand name for mobile */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.5px',
              display: {
                xs: 'block',
                sm: 'none',
              },
            }}
          >
            Movie
          </Typography>
        </Box>

        {/* RIGHT SIDE */}
        <Box
          sx={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: {
              xs: 0.5,
              sm: 1,
            },
          }}
        >
          {user && (
            <>
              {/* HOME */}
              <Tooltip title="Home">
                <Button
                  component={Link}
                  to="/"
                  color="inherit"
                  startIcon={<HomeIcon />}
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'inline-flex',
                    },
                    fontWeight: 600,
                  }}
                >
                  Home
                </Button>
              </Tooltip>

              {/* FAVORITES */}
              <Tooltip title="Favorites">
                <Button
                  component={Link}
                  to="/favorites"
                  color="inherit"
                  startIcon={<FavoriteIcon />}
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'inline-flex',
                    },
                    fontWeight: 600,
                  }}
                >
                  Favorites
                </Button>
              </Tooltip>

              {/* MOBILE HOME */}
              <Tooltip title="Home">
                <IconButton
                  component={Link}
                  to="/"
                  color="inherit"
                  sx={{
                    display: {
                      xs: 'flex',
                      sm: 'none',
                    },
                  }}
                >
                  <HomeIcon />
                </IconButton>
              </Tooltip>

              {/* MOBILE FAVORITES */}
              <Tooltip title="Favorites">
                <IconButton
                  component={Link}
                  to="/favorites"
                  color="inherit"
                  sx={{
                    display: {
                      xs: 'flex',
                      sm: 'none',
                    },
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>

              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  marginX: 1,
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              />

              {/* USER */}
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex',
                  },
                  alignItems: 'center',
                  gap: 0.8,
                  marginX: 1,
                }}
              >
                <PersonIcon
                  fontSize="small"
                  color="action"
                />

                <Typography
                  variant="body2"
                  fontWeight={600}
                >
                  {user.username}
                </Typography>
              </Box>

              {/* LOGOUT */}
              <Tooltip title="Logout">
                <IconButton
                  onClick={logout}
                  color="error"
                  sx={{
                    marginLeft: {
                      xs: 0,
                      sm: 0.5,
                    },
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </>
          )}

          {/* THEME TOGGLE */}
          <Tooltip
            title={
              theme === 'light'
                ? 'Switch to dark mode'
                : 'Switch to light mode'
            }
          >
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              sx={{
                marginLeft: 0.5,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {theme === 'light' ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;