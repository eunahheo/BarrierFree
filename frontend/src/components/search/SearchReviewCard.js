import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import ReviewBarrierIcon from './SearchBarrierIcon';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationIcon from '@mui/icons-material/LocationOn';
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
const SearchReviewCard = ({ item }) => {
  const {
    post_seq,
    post_photo,
    post_location,
    post_title,
    impairment,
    scrapYn,
  } = item;
  const navigate = useNavigate();
  const myuser = useSelector((state) => state.user.userData);
  const [heart, setHeart] = useState(false);
  const onClickHeart = () => {
    if (myuser) {
      setHeart(true);
      item.scrapYn = 'y';
      axios({
        method: 'get',
        url: '/scrap/insert',
        params: {
          scrap_data: post_seq,
          scrap_type: 0,
          user_seq: myuser.userSeq,
        },
      });
    } else {
      alert('좋아요는 BF 회원만 가능합니다! 로그인 페이지로 이동할게요!😄');
      navigate('/loginpage');
    }
  };
  const onRemoveHeart = () => {
    setHeart(false);
    item.scrapYn = 'n';
    axios({
      method: 'put',
      url: '/scrap/delete',
      params: {
        scrap_data: post_seq,
        scrap_type: 0,
        user_seq: myuser.userSeq,
      },
    });
  };
  useEffect(() => {
    if (scrapYn === 'y') {
      setHeart(true);
    }
  });
  return (
    <div data-aos="fade-up">
      <Card
        sx={{ width: 320 }}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <CardMedia
          onClick={() => {
            navigate(`/post/detail/${post_seq}`);
          }}
          component="img"
          height="300"
          image={post_photo}
          alt="Dog Picture"
        />
        {heart ? (
          <FavoriteIcon
            onClick={onRemoveHeart}
            style={{
              color: '#EA5455',
              cursor: 'pointer',
              position: 'absolute',
              top: '10',
              right: '10',
            }}
          />
        ) : (
          <FavoriteBorderIcon
            onClick={onClickHeart}
            style={{
              color: '#EA5000',
              cursor: 'pointer',
              position: 'absolute',
              top: '10',
              right: '10',
            }}
          />
        )}
        <CardContent align="left">
          <Typography noWrap variant="body2">
            <LocationIcon sx={{ fontSize: 15 }} /> {post_location}
          </Typography>
          <Typography noWrap variant="body1">
            {post_title}
          </Typography>
          <ReviewBarrierIcon barriers={impairment}></ReviewBarrierIcon>
        </CardContent>
      </Card>
    </div>
  );
};
export default SearchReviewCard;
