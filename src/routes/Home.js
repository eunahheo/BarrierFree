// App.js 내용 가져오면 됨
import React from "react";
import { useState } from "react";
// import Recommend from "@ ./src/components/recommend/Recommend.js";
import OrderBox from "../components/Reviews/OrderBox";
// import './Home.css';

function Navbar() {
  return <h1>Navbar</h1>;
}

function Home() {
  return (
    <div className="Home">
      <span>Home</span>
      <span>Home</span>
      <span>Home</span>
      <span>Home</span>
      <OrderBox />
      {/* <Navbar /> */}
      {/* <Recommend></Recommend> */}
    </div>
  );
}

export default Home;
