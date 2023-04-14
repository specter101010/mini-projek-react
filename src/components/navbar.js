import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Popular', 'Trending', 'About'];
const settings = ['Profile', 'Logout'];

function Navbar({ apiKey, accessToken }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userData, setUserData] = useState({ avatar: { tmdb: { avatar_path: "" } } });

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        const response = await fetch(
          `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${accessToken}`
        );
        const data = await response.json();
        setUserData(data);
      }
    };
    fetchUserData();
  }, [apiKey, accessToken]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Found
          </Typography>
        
       
          {accessToken ? (
          <>
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
          <Button key={page} color="inherit">
            {page}
          </Button>
          ))}
          </Box>
          {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                         size="large"
                         aria-label="open menu"
                         aria-controls="menu-user"
                         aria-haspopup="true"
                         onClick={handleOpenNavMenu}
                         color="inherit"
                       >
            <MenuIcon />
          </IconButton>
          <Menu
          id="menu-user"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
          horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
          horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          >
          {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
          ))}
          </Menu>
          </Box> */}
          <Box sx={{ display: { xs: 'flex',  md: 'flex'} }}>
            <IconButton
                         size="large"
                         aria-label="open user menu"
                         aria-controls="menu-user"
                         aria-haspopup="true"
                         onClick={handleOpenUserMenu}
                         color="inherit"
                       >
            <Avatar
          alt={userData.username}
          src={`https://www.themoviedb.org/t/p/w64_and_h64_face/${userData.avatar.tmdb.avatar_path}`}
          />
          </IconButton>
          <Menu
          id="menu-user"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'bottom',
          horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
          horizontal: 'left',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
          <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
          ))}
          </Menu>
          </Box>
          </>
          ) : (
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
          <Button color="inherit" href="/login">
          Login
          </Button>
          </Box>
          )}
          </Toolbar>
          </Container>
          </AppBar>
          );
          }
          export default Navbar;
