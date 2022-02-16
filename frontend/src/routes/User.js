import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserHeader from '../components/user/UserHeader';
import UserPage from '../pages/UserPage';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Footer from '../components/common/Footer';
import styled from 'styled-components';

const F = styled.div`
  #footer {
    background: #e5e5e5;
    padding: 10px 0 20px 0;
    width: 100%;
    margin-top: 18%;
    position: relative;
    transform: translatY(-100%);
  }
  #footer p {
    color: #888;
    font-size: 14px;
  }
  #footer a {
    color: #608dfd;
  }
  #footer a:hover {
    border-bottom: 2px solid #608dfd;
  }
  #con {
    text-align: left;
  }
`;

function User() {
  const [userControllType, setUserControllType] = useState('post');
  const params = useParams();
  const currentUser = Number(params.userSeq);

  useEffect(() => {
    setUserControllType('post');
  }, [currentUser]);
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
      <F>
        <Footer></Footer>
      </F>
    </div>
  );
}

export default User;
