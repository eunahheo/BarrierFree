import React from "react";
import { Navigate } from "react-router-dom";

function User() {
  const isLoggedIn = false;
  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <div>
      <h1>user</h1>
    </div>
  );
}

export default User;
