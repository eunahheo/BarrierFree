import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import MyReviewPage from "../components/Reviews/MyReviewPage";
import UserFeedTemplate from "../components/user/UserFeedTemplate";
import Userbar from "../components/user/Userbar";
import Header from "../components/common/Header";
import UserHeader from "../components/user/UserHeader";

function User() {
  // const isLoggedIn = false;

  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <Navigate to="/loginpage" replace={true} />;
  }
  return (
    <div>
      <Header />
      <h1>user</h1>
      <UserHeader></UserHeader>
      <Userbar></Userbar>
      {/* <UserFeedTemplate></UserFeedTemplate> */}
      <MyReviewPage></MyReviewPage>
    </div>
  );
}

export default User;
