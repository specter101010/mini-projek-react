import React, { useState,  } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { Modal } from 'antd';
import Navbar from "./navbar";

const Login = () => {

  const apiKey = process.env.REACT_APP_APIKEY;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [userInfo, setUserInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);



  // state untuk menyimpan token akses
  // const [accessToken, setAccessToken] = useState();
  
  const [sessionToken, setSessionToken] = useState(localStorage.getItem("sessionToken"));
  const [hidden, setHidden] = useState(sessionToken ? "none" : "flex");




  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);

    // Kirim permintaan ke API untuk memverifikasi login
    const token = await fetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    const tokenData = await token.json();

    const userLogin = await fetch(
      `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          request_token : tokenData.request_token,
        }),
      }
    );
    const userToken = await userLogin.json();

    const sessionId = await fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_token : userToken.request_token,
        }),
      }
    );

    const data = await sessionId.json();

    // Cek apakah respon berhasil
    if (userLogin.ok) {
      console.log(tokenData);
      console.log(userToken);
      console.log(data.session_id);
      setHidden('none')
      setModalOpen(false)
      setSessionToken(data.session_id);
      // setAccessToken(userToken.request_token);
      localStorage.setItem("sessionToken", data.session_id);
      

      // Tampilkan detail user di console log
      console.log("Detail user:");
      const userResponse = await fetch(
        `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${data.session_id}`
      );
      const userData = await userResponse.json();
      console.log(userData);
      // setUserInfo(userData);

    } else {
      console.error("Login gagal:", data);
      // TODO: Tampilkan pesan error ke pengguna
      setModalVisible(true);
    }
  };
  
  


  // useEffect(() => {
  //   // Jika token akses tersedia, ambil detail user
  //   if (accessToken) {
  //     const getUserData = async () => {
  //       const userResponse = await fetch(
  //         `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${accessToken}`
  //       );
  //       const userData = await userResponse.json();
  //       setUserInfo(userData)
  //     };
      
  //     getUserData();
  //   }
  // }, [accessToken, apiKey]);
 

  const handleCloseModal = () => {
    setModalVisible(false);
  };



  const handleOpenModal = () => {
    setModalOpen(true)
  };

    const handleLogout = async () => {
      const sessionId = await fetch(
        `https://api.themoviedb.org/3/authentication/session?api_key=${apiKey}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id : sessionToken
          }),
        }
      );
      if(sessionId.ok){
          localStorage.removeItem("accessToken");
  localStorage.removeItem("sessionToken",sessionId );
  window.location.reload();
  
  // Set state accessToken dan sessionToken ke null
  // setAccessToken(null);
  setSessionToken(null);
  // Set state userInfo ke null
  // setUserInfo(null);
  // Set state hidden ke 'flex'
  setHidden('flex');
      }
      

};

  return (
    <div>
        
        <Navbar apiKey={apiKey} accessToken={sessionToken} />
     
      <Modal visible={modalOpen} onCancel={() => setModalOpen(false)}   footer={null}>
      <Typography variant="h4">Login to your account</Typography>
      <form onSubmit={handleSubmit} style={{
        display: "flex",
      flexDirection: "column",
      alignItems: "center",
            marginTop: "2rem",
    }}>
      <TextField
      label="Username"
      variant="outlined"
      value={username}
      onChange={(event) => setUsername(event.target.value)}
      style={{ marginBottom: "1rem" }}
      />
      <TextField
      label="Password"
      variant="outlined"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      type="password"
      style={{ marginBottom: "1rem" }}
      />
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
      
      </form>
  </Modal>

  <Button type="primary" onClick={() => handleOpenModal()}  style={{display: hidden }}>
  Login
</Button>

<Button onClick={handleLogout} type="primary" style={{ marginTop: '1rem' }}>
      Logout
    </Button>

        <Modal visible={modalVisible} onCancel={handleCloseModal}>
          <Typography variant="h6">Login failed!</Typography>
        <Typography>Please check your username and password.</Typography>
      </Modal>
 

      </div>
      );
    };
      
export default Login;