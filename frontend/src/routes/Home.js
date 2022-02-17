// App.js 내용 가져오면 됨
import ReviewPage from '../components/common/review/ReviewPage';
import Grid from '@mui/material/Grid';
import React from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import palette from '../lib/styles/palette';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import './Home.css';
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

const CustomIcon = styled('icon')`
  cursor: pointer;
  position: fixed;
  bottom: 5%;
  right: 3%;
`;

function Home() {
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const navigate_wr = () => {
    if (user) {
      navigate('/write');
    } else {
      alert('로그인이 필요합니다!😋');
      navigate('/loginpage');
    }
  };

  return (
    <div>
      <Grid item>
        <div data-aos="fade-up">
          <ReviewPage></ReviewPage>
        </div>
        <CustomIcon>
          <AddCircleRoundedIcon
            className="AddCircleRoundedIcon"
            position="sticky"
            fontSize="large"
            sx={{ color: palette.pink[0], fontSize: '46px' }}
            onClick={navigate_wr}
          />
        </CustomIcon>
      </Grid>
    </div>
  );
}

export default Home;
