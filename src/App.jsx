import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Layout, Typography, Space } from "antd";


import { Navbar,Exchanges,HomePage,CryptoDetails,Cryptocurrencies,News, Footer,} from "./components";


function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
              <Route path="/cryptodetails/:coinId" element={<CryptoDetails/>} />
            </Routes>
          </div>
        </Layout>
      <div className="footer">
        <Footer/>
      </div>
      </div>
    </div>
  );
}

export default App;
