import React, { useState, useEffect } from "react";
import { Modal } from 'antd';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const pages = ['Popular', 'Trending', 'About'];
const settings = ['Profile', 'info'];

function Navbar({ apiKey, accessToken }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userData, setUserData] = useState({ avatar: { tmdb: { avatar_path: "" } } });
  const [modalOpen, setModalOpen] = useState(false);
  const [hidden, setHidden] = useState('none');

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        const response = await fetch(
          `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${accessToken}`
        );
        const data = await response.json();
        setUserData(data);
        setHidden('flex')
      }
    };
    fetchUserData();
  }, [apiKey, accessToken]);


  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    if(accessToken){
       setHidden('block')
    }  
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


    const handleLogin = () => {
      setModalOpen(true)
      setHidden('none')
  };

 
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const info = () => {
    Modal.info({
      title: 'Info',
      content: (
        <div style={{ border: 'none', color: '#222', padding: '1rem' }}>
          {/* profile */}
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Sebuah website pencarian film adalah sebuah situs yang menyediakan informasi mengenai berbagai film, baik yang sudah dirilis maupun yang akan dirilis. Pada website ini, pengguna dapat mencari film berdasarkan judul, genre, tahun rilis, atau bahkan berdasarkan nama aktor atau sutradara. Selain itu, website pencarian film juga menyediakan informasi mengenai sinopsis, poster, trailer, dan ulasan dari film yang ada. Beberapa website pencarian film juga menampilkan informasi mengenai peringkat atau rating dari film tersebut, sehingga pengguna dapat memilih film yang dianggap terbaik berdasarkan kriteria masing-masing. Dengan adanya website pencarian film, pengguna dapat lebih mudah mencari dan menemukan film yang mereka inginkan tanpa perlu repot mencari informasi tersebut di berbagai sumber yang berbeda.</p>
        </div>
      ),
      // okButtonProps: { style: { display: 'none' } },
    });
      setHidden('none')
  };

  return (
    <AppBar position="static">
    <Box maxWidth="xl">
      <Toolbar disableGutters>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Found
        </Typography>

        <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
          {pages.map((page) => (
            <Button key={page} color="inherit">
              {page}
            </Button>
          ))}
        </Box>

        {userData ? (
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
               style={{display: hidden }}
              id="menu-user"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              >
                 {settings.map((setting) => ( 
        <MenuItem  key={setting} onClick={setting === "Profile" ? handleLogin:  info }>
          {setting}
        </MenuItem>
      ))}
        </Menu>
            
            
              </Box>
              ) : (
              <Tooltip title="Login" aria-label="login">
              <IconButton
                           size="large"
                           aria-label="login"
                           onClick={handleOpenModal}
                           color="inherit"
                         >
              <Avatar sx={{ bgcolor: 'secondary.main' }}>L</Avatar>
              </IconButton>
              </Tooltip>
              )}
                    <Menu
      id="menu-nav"
      anchorEl={anchorElNav}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
    >
      {pages.map((page) => (
        <MenuItem key={page} onClick={handleLogin}>
          {page}
        </MenuItem>
      ))}
    </Menu>
  </Toolbar>
</Box>
<Modal
onCancel={() => setModalOpen(false)}
  title="Profile"
  visible={modalOpen}
  footer={null}
  style={{ border: "none", color: "#222" }}
>
  {/* profile */}
  <div
    className="user-info"
    style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem" }}
  >
    <div
      className="user-info-row"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: "0.5rem",
      }}
    >
      <label style={{ fontWeight: "bold", marginRight: "0.5rem" }}>Name:</label>
      <span style={{ fontSize: "1rem", color: "#111" }}>{userData.name}</span>
    </div>
    <div
      className="user-info-row"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: "0.5rem",
      }}
    >
      <label style={{ fontWeight: "bold", marginRight: "0.5rem" }}>Username:</label>
      <span style={{ fontSize: "1rem", color: "#111" }}>{userData.username}</span>
    </div>
    <div
      className="user-info-row"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: "0.5rem",
      }}
    >
      <label style={{ fontWeight: "bold", marginRight: "0.5rem" }}>Country:</label>
      <span style={{ fontSize: "1rem", color: "#111" }}>{userData.iso_3166_1}</span>
    </div>
    <div
      className="user-info-row"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "1rem",
      }}
    >
      <Avatar
        alt={userData.username}
        src={`https://www.themoviedb.org/t/p/w64_and_h64_face/${userData.avatar.tmdb.avatar_path}`}
        style={{ width: "5rem", height: "5rem", borderRadius: "50%" }}
      />
    </div>
    
  </div>
</Modal>
</AppBar>
          );
          }
          export default Navbar;
