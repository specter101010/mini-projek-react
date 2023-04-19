import React from "react";
import { Container } from "@mui/material";
import PopularMovies from './components/popular';
import Login from "./components/login";
import './App.css'
import TrendingMovies from "./components/trending";
import UpComingMovies from "./components/upcoming";
import { Layout, Row, Col } from 'antd';
import { PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons';


function App() {
  return (
    <div className="body">
      <Login/>
      <Container>
        <div className="container-card">
          <div className="carousel">
            <UpComingMovies/>
          </div>  
          <div id="popular-movies">
          <PopularMovies/>
          </div>    
          
          <div id="trending-movies">
            <TrendingMovies/>
          </div>
          
        </div>      
      </Container>
      <Layout.Footer style={{ width: '100%' }}>
        <div className="footer">
          <Row>
            <Col span={8} offset={4}>
              <h4><PhoneOutlined /> Kontak</h4>
              <a href="tel:08982228178"><PhoneOutlined /></a>
              <a href="yasyirmasyal@gmail.com"><MailOutlined /></a>
            </Col>
            <Col span={8} offset={4}>
              <h4><FacebookOutlined /> Sosial Media</h4>
              <a href="https://www.facebook.com/yasir.masyal.5?mibextid=ZbWKwL"><FacebookOutlined /></a>
              <a href="https://instagram.com/lauliet_y?igshid=ZDdkNTZiNTM="><InstagramOutlined /></a>
              <a href="https://github.com/yasyir90"><GithubOutlined /></a>
              <a href="https://www.linkedin.com/in/yasyir-masy-al"><LinkedinOutlined /></a>
            </Col>
          </Row>
          <p style={{ textAlign: 'center' }}>© Yasyir Masy'al 2023. All rights reserved.</p>
        </div>
      </Layout.Footer>
    </div>
  );
}

export default App;
