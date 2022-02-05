import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserHeader from '../components/user/UserHeader';
import UserPage from '../pages/UserPage';

function User() {
  // const isLoggedIn = false;
  const [userControllType, setUserControllType] = useState('post');

  const onPost = () => {
    setUserControllType('post');
  };

  const onFollowing = () => {
    setUserControllType('following');
    console.log('following');
  };

  const onFollower = () => {
    setUserControllType('follower');
  };

  const onScrap = () => {
    setUserControllType('scrap');
  };

  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <Navigate to="/loginpage" replace={true} />;
  }
  return (
    <div>
      {/* <HeaderContainer /> */}
      <h1>user</h1>
      <UserHeader
        onPost={onPost}
        onScrap={onScrap}
        onFollowing={onFollowing}
        onFollower={onFollower}
      ></UserHeader>
      <UserPage type={userControllType}></UserPage>
    </div>
  );
}

export default User;
