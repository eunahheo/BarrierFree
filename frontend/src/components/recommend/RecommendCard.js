import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import RecommendBarrierIcon from './RecommendBarrierIcon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import palette from '../../lib/styles/palette';
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

const RecommendCard = ({ item }) => {
  const [barriers, setBarrier] = useState([]);
  const navigate = useNavigate();
  const { addr1, contentid, firstimage, scrap_yn, title } = item;
  const myuser = useSelector((state) => state.user.userData);
  const infomationCard = item.contentid;
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    onGetBarriers();
    if (item.scrap_yn === 'y') setHeart(true);
    else setHeart(false);
  }, []);

  const onClickHeart = () => {
    if (myuser) {
      setHeart(true);
      item.scrapYn = 'y';
      axios({
        method: 'get',
        url: '/scrap/insert',
        params: {
          scrap_data: infomationCard,
          scrap_type: 1,
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
        scrap_data: infomationCard,
        scrap_type: 1,
        user_seq: myuser.userSeq,
      },
    });
  };

  const onGetBarriers = () => {
    axios({
      method: 'GET',
      url: 'recommend/impairment',
      params: { contentid: contentid },
    }).then(function (res) {
      var i = 0;
      var array = [];
      if (res.data.physical != null) {
        array[i++] = 'physical';
      }
      if (res.data.visibility != null) {
        array[i++] = 'visibility';
      }
      if (res.data.deaf != null) {
        array[i++] = 'deaf';
      }
      if (res.data.infant != null) {
        array[i++] = 'infant';
      }
      if (res.data.senior != null) {
        array[i++] = 'senior';
      }
      setBarrier(array);
    });
  };
  // 카드를 눌렀을 때 이동
  const onClickCard = () => {
    if (myuser) {
      axios({
        method: 'GET',
        url: 'recommend/detail',
        params: { contentid: contentid, userSeq: myuser.userSeq },
      }).then(function (res) {
        navigate(`/recommend/detail/${contentid}`);
      });
    } else {
      alert('로그인이 필요합니다!😀');
    }
  };

  return (
    <div data-aos="fade-up">
      {/* <Link to={{ pathname: '/post/detail/:reviewCard', state: { detailnum : reviewCard}}}> */}
      <Card
        infomationCard={infomationCard}
        sx={{ maxWidth: 320 }}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
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
        {/* <Card onClick={onClickCard} pageNum={reviewCard} sx={{ maxWidth: 250 }}> */}
        <CardMedia
          onClick={onClickCard}
          component="img"
          height="300"
          image={firstimage}
          alt="Dog Picture"
        />
        <CardContent align="left">
          <Typography noWrap variant="body2" color="text.secondary">
            <LocationIcon sx={{ fontSize: 15 }} /> {addr1}
          </Typography>
          <Typography noWrap variant="body1">
            {title}
          </Typography>
          <RecommendBarrierIcon barriers={barriers}></RecommendBarrierIcon>
        </CardContent>
      </Card>
      {/* </Link> */}
    </div>
  );
};
export default RecommendCard;
