import React from "react";
import Login from "../components/user/Login";
import Infomation from "../components/infomation/Infomation";
import Header from "../components/common/Header";

function About() {
  return (
    <div>
      <Header />
      {/* <Infomation></Infomation> */}
      <Login></Login>
      <span>About weclusive</span>;
    </div>
  );
}

export default About;
