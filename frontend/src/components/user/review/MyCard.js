import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import RecommendBarrierIcon from '../../recommend/RecommendBarrierIcon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
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
const MyCard = ({ item, onRemove }) => {
  const myuser = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const { post_photo, post_location, post_title, scrap_yn } = item;
  const reviewCard = item.post_seq;
  const [heart, setHeart] = useState(false);
  console.log(item);
  const onClickCard = () => {
    navigate(`/post/detail/${reviewCard}`);
  };
  const onClickHeart = () => {
    setHeart(true);
    axios({
      method: 'get',
      url: '/scrap/insert',
      params: {
        scrap_data: reviewCard,
        scrap_type: 0,
        user_seq: myuser.userSeq,
      },
    });
  };
  const onRemoveHeart = () => {
    setHeart(false);
    axios({
      method: 'put',
      url: '/scrap/delete',
      params: {
        scrap_data: reviewCard,
        scrap_type: 0,
        user_seq: myuser.userSeq,
      },
    }).then(function (res) {
      onRemove(item.post_seq);
    });
  };
  useEffect(() => {
    if (scrap_yn === 'y') {
      setHeart(true);
    }
  }, []);
  return (
    <div data-aos="fade-up">
      <span>here</span>
      <Card
        style={{ cursor: 'pointer', position: 'relative' }}
        reviewCard={reviewCard}
        sx={{ maxWidth: 250 }}
      >
        {heart ? (
          <FavoriteIcon
            onClick={onRemoveHeart}
            style={{
              color: `${palette.pink[0]}`,
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
              color: `${palette.pink[0]}`,
              cursor: 'pointer',
              position: 'absolute',
              top: '10',
              right: '10',
            }}
          />
        )}

        <div onClick={onClickCard}>
          <CardMedia
            component="img"
            height="200"
            image={post_photo}
            alt={post_location}
            style={{ maxHeight: 250 }}
          />
          <CardContent align="left">
            <Typography variant="body2" color="text.secondary" noWrap>
              <LocationIcon sx={{ fontSize: 15 }} /> {post_location}
            </Typography>
            <Typography noWrap variant="body1">
              {post_title}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
export default MyCard;
