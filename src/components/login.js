import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { Modal } from 'antd';
import UserData from "./user";

const Login = () => {

  const apiKey = process.env.REACT_APP_APIKEY;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  // state untuk menyimpan token akses
  const [accessToken, setAccessToken] = useState(null);
  const [sesionToken, setSesionToken] = useState(null);


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

    const sesionId = await fetch(
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

    const data = await sesionId.json();

    // Cek apakah respon berhasil
    if (userLogin.ok) {
      // console.log("Login berhasil:", data);
      // console.log(data)

      console.log(tokenData);
      console.log(userToken);
      console.log(data.session_id);
      setSesionToken(data.session_id);
      
      // Simpan token akses yang didapat ke dalam state
      setAccessToken(data.request_token);
      // Tampilkan detail user di console log
      console.log("Detail user:");
      const userResponse = await fetch(
        `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${data.session_id}`
      );
      const userData = await userResponse.json();
      console.log(userData);

    } else {
      console.error("Login gagal:", data);
      // TODO: Tampilkan pesan error ke pengguna
      setModalVisible(true);
    }
  };

  useEffect(() => {
    // Jika token akses tersedia, ambil detail user
    if (accessToken) {
      const getUserData = async () => {
        const userResponse = await fetch(
          `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${accessToken}`
        );
        const userData = await userResponse.json();
        console.log(userData);
      };

      getUserData();
    }
  }, [accessToken, apiKey]);

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh",}}>
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
      <UserData apiKey={apiKey} accessToken={sesionToken} />


        <Modal visible={modalVisible} onCancel={handleCloseModal}>
          <Typography variant="h6">Login failed!</Typography>
        <Typography>Please check your username and password.</Typography>
      </Modal>
 

      </div>
      );
    };
      
export default Login;