// App.js 내용 가져오면 됨
import React from "react";
// import Recommend from "./components/recommend/Recommend.js";

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
      {/* <Navbar /> */}
      {/* <Recommend></Recommend> */}
    </div>
  );
}

export default Home;
