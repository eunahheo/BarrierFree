import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import ReviewBarrierIcon from './ReviewBarrierIcon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import palette from '../../../lib/styles/palette';
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
const ReviewCard = ({ item }) => {
  const myuser = useSelector((state) => state.user.userData);
  // console.log('item in reviewCard', item);
  const navigate = useNavigate();
  const { postPhoto, postLocation, postTitle, scrapYn } = item;
  const barriers = item.impairment;
  const reviewCard = item.postSeq;
  const [heart, setHeart] = useState(false);

  const onClickCard = () => {
    if (myuser) {
      axios({
        method: 'GET',
        url: 'post/detail',
        params: { postSeq: reviewCard },
      }).then(function (res) {
        navigate(`/post/detail/${reviewCard}`);
      });
    } else {
      alert(`${postTitle}에 대한 리뷰를 보시려면 로그인이 필요합니다!😀`);
      navigate('/loginpage');
    }
  };
  const onClickHeart = () => {
    if (myuser) {
      setHeart(true);
      item.scrapYn = 'y';
      axios({
        method: 'get',
        url: '/scrap/insert',
        params: {
          scrap_data: reviewCard,
          scrap_type: 0,
          user_seq: myuser.userSeq,
        },
      });
    } else {
      alert('좋아요는 BF 회원만 가능합니다! 로그인 페이지로 이동할게요!😀');
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
        scrap_data: reviewCard,
        scrap_type: 0,
        user_seq: myuser.userSeq,
      },
    });
  };
  useEffect(() => {
    if (item.scrapYn === 'y') setHeart(true);
    else setHeart(false);
  });

  return (
    <div data-aos="fade-up">
      <Card
        reviewCard={reviewCard}
        sx={{ width: 320 }}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        {/* <span style={{ position: 'absolute', top: '235', float: 'right' }} > */}
        {heart ? (
          <FavoriteIcon
            style={{
              color: `${palette.pink[0]}`,
              cursor: 'pointer',
              position: 'absolute',
              top: '10',
              right: '10',
            }}
            onClick={onRemoveHeart}
          />
        ) : (
          <FavoriteBorderIcon
            onClick={onClickHeart}
            style={{
              color: `${palette.pink[0]}`,
              cursor: 'pointer',
              position: 'absolute',
              top: '10',
              right: '10',
            }}
          />
        )}

        <CardMedia
          component="img"
          height="300"
          image={postPhoto}
          alt="Dog Picture"
          // style={{ position: 'relative' }}
          onClick={onClickCard}
        />

        <CardContent align="left">
          <Typography variant="body2" color="text.secondary">
            <LocationIcon sx={{ fontSize: 15 }} /> {postLocation}
          </Typography>
          {postTitle}
          <div>
            {' '}
            <ReviewBarrierIcon barriers={barriers}></ReviewBarrierIcon>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ReviewCard;
