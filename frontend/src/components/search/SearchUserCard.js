import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import ReviewBarrierIcon from './SearchBarrierIcon';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
const SearchCard = ({ item }) => {
  const { userSeq, userPhoto, userNickname, isfollow } = item;
  const navigate = useNavigate();
  const myuser = useSelector((state) => state.user.userData);

  // 카드를 눌렀을 때 이동
  // const onClickCard = () => {
  //   if (myuser) {
  //     axios({
  //       method: 'GET',
  //       url: 'recommend/detail',
  //       params: { contentid: contentid, userSeq: myuser.userSeq },
  //     }).then(function (res) {
  //       navigate(`/recommend/detail/${contentid}`);
  //     });
  //   } else {
  //     alert('로그인이 필요합니다!😀');
  //   }
  // };

  return (
    <div data-aos="fade-up">
      <Card sx={{ maxWidth: 320 }}>
        <CardMedia
          onClick={() => {
            navigate(`/user/${userSeq}`);
          }}
          component="img"
          height="200"
          image={userPhoto}
          alt="Dog Picture"
        />

        <CardContent align="left">
          <Typography noWrap variant="body1">
            {userNickname}
          </Typography>
          {/* <ReviewBarrierIcon barriers={impairment}></ReviewBarrierIcon> */}
        </CardContent>
      </Card>
    </div>
  );
};
export default SearchCard;
