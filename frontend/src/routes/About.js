import React from "react";
import Login from "../components/user/Login";
import Infomation from "../components/infomation/Infomation";
import TourInfomation from "../components/search/TourInfomation";
import Header from "../components/common/Header";

function About() {
  return (
    <div>
      <Header />
      {/* <Infomation></Infomation> */}
      <Login></Login>
      <TourInfomation></TourInfomation>
      <span>About weclusive</span>;
    </div>
  );
}

export default About;
