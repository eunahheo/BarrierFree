import React from "react";
import { Navigate } from "react-router-dom";
import MyReviewPage from "../components/Reviews/MyReviewPage";

function User() {
  // const isLoggedIn = false;
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div>
      <h1>user</h1>
      <MyReviewPage></MyReviewPage>
    </div>
  );
}

export default User;
