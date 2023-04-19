import React from "react";
import { Container } from "@mui/material";
import PopularMovies from './components/popular';
import Login from "./components/login";
import './App.css'
import TrendingMovies from "./components/trending";
import UpComingMovies from "./components/upcoming";
import { Layout, Row, Col } from 'antd';
import { PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';


function App() {
  return (
    <div className="body">
      <Login/>
      <Container>
        <div className="container-card">
          <div className="carousel">
            <UpComingMovies/>
          </div>      
          <PopularMovies />
          <TrendingMovies/>
        </div>      
      </Container>
      <Layout.Footer style={{ width: '100%' }}>
  <div className="footer">
    <Row>
      <Col span={8} offset={4}>
        <h4><PhoneOutlined /> Kontak</h4>
        <a href="tel:123456789"><PhoneOutlined /> 123456789</a>
        <a href="mailto:info@example.com"><MailOutlined /> info@example.com</a>
      </Col>
      <Col span={8} offset={4}>
        <h4><FacebookOutlined /> Sosial Media</h4>
        <a href="https://facebook.com/example"><FacebookOutlined /> @example</a>
        <a href="https://instagram.com/example"><InstagramOutlined /> @example</a>
        <a href="https://twitter.com/example"><TwitterOutlined /> @example</a>
      </Col>
    </Row>
    <p style={{ textAlign: 'center' }}>© Yasyir Masy'al 2023. All rights reserved.</p>
  </div>
</Layout.Footer>


    </div>
  );
}

export default App;
