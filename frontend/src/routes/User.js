import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserHeader from '../components/user/UserHeader';
import UserPage from '../pages/UserPage';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { getCurrentUserInfo } from '../_actions/current_actions';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

function User() {
  const myuserData = useSelector((state) => state.user.userData);
  const myuser = myuserData.userSeq;
  const dispatch = useDispatch();
  const [userControllType, setUserControllType] = useState('post');
  const params = useParams();
  const currentUser = Number(params.userSeq);

  useEffect(() => {
    getUserHeader();
    // console.log(currentUser);
  }, []);
  const getUserHeader = async () => {
    try {
      if (currentUser === myuser) {
        const response = await axios({
          method: 'get',
          url: '/myFeed/main',
          params: {
            userSeq: currentUser,
          },
        });
        // setUserHeaderInfo(response.data[0]);
        // console.log('here', response.data[0]);
        dispatch(
          getCurrentUserInfo({
            key: 'follower',
            value: response.data[0].follower,
          }),
        );
        dispatch(
          getCurrentUserInfo({
            key: 'writePost',
            value: response.data[0].writePost,
          }),
        );
        dispatch(
          getCurrentUserInfo({
            key: 'following',
            value: response.data[0].following,
          }),
        );
        dispatch(
          getCurrentUserInfo({
            key: 'totalScarp',
            value: response.data[0].totalScarp,
          }),
        );
        dispatch(
          getCurrentUserInfo({
            key: 'userNickname',
            value: response.data[0].userNickname,
          }),
        );
        dispatch(
          getCurrentUserInfo({
            key: 'userPhoto',
            value: response.data[0].userPhoto,
          }),
        );
      } else {
        const response = await axios({
          method: 'get',
          url: '/othersFeed/main',
          params: {
            otherUserSeq: currentUser,
            userSeq: myuser,
          },
        });
        // setUserHeaderInfo(response.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    setUserControllType('post');
  }, [currentUser]);
  const onPost = () => {
    setUserControllType('post');
    getUserHeader();
  };

  const onFollowing = () => {
    setUserControllType('following');
    getUserHeader();
    // console.log('following');
  };

  const onFollower = () => {
    setUserControllType('follower');
    getUserHeader();
  };

  const onScrap = () => {
    setUserControllType('scrap');
    getUserHeader();
  };

  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <Navigate to="/loginpage" replace={true} />;
  }

  return (
    <div data-aos="fade-up">
      <Container fixed>
        <Grid container>
          <Grid item xs="3">
            <UserHeader
              onPost={onPost}
              onScrap={onScrap}
              onFollowing={onFollowing}
              onFollower={onFollower}
              getUserHeader={getUserHeader}
            ></UserHeader>
          </Grid>
          <Grid item xs="9">
            <UserPage
              type={userControllType}
              getUserHeader={getUserHeader}
            ></UserPage>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default User;
