import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  const [active, setActive] = useState('home');

  const handleMenuClick = (menuItem) => {
    setActive(menuItem);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Movie App
        </Typography>
        <Button color="inherit" onClick={() => handleMenuClick('home')} sx={{ mr: 2 }} variant={active === 'home' ? 'contained' : 'text'}>
          Home
        </Button>
        <Button color="inherit" onClick={() => handleMenuClick('popular')} variant={active === 'popular' ? 'contained' : 'text'}>
          Popular Movies
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
