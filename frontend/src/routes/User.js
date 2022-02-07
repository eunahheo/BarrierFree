import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserHeader from '../components/user/UserHeader';
import UserPage from '../pages/UserPage';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

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
      <h1>user</h1>
      <Container fixed>
        <Grid container>
          <Grid item xs="3">
            <UserHeader
              onPost={onPost}
              onScrap={onScrap}
              onFollowing={onFollowing}
              onFollower={onFollower}
            ></UserHeader>
          </Grid>
          <Grid item xs="9">
            <UserPage type={userControllType}></UserPage>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default User;
