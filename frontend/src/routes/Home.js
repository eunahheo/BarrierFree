// App.js 내용 가져오면 됨
import React, { useEffect, useState } from "react";
import axios from "axios";
// import OrderBox from "../components/Reviews/OrderBox";
import ReviewPage from "../components/Reviews/ReviewPage";
import Header from "../components/common/Header";
// import './Home.css';

function Home() {
  // const [ordertype, setOrdertype] = useState("");

  // const orderbylatest = () => {
  //   setOrdertype("http://localhost:3000/post/all?userSeq=0");
  // };

  // const orderbypopular = () => {
  //   setOrdertype("http://localhost:8080/post/scrap?userSeq=1");
  // };

  // const orderbybf = () => {
  //   setOrdertype("http://localhost:8080/post/follow?userSeq=1");
  // };

  return (
    <div className="Home">
      <Header />
      <h1>Home</h1>
      {/* <OrderBox /> */}
      <ReviewPage></ReviewPage>
      {/* <Navbar /> */}
      {/* <Recommend></Recommend> */}
      {/* <RecommendCardList itemList={itemList}></RecommendCardList> */}
    </div>
  );
}

export default Home;
