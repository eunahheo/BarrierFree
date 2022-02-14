import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import RecommendBarrierIcon from './RecommendBarrierIcon';
import axios from 'axios';
import Review from '../review/Review';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import palette from '../../lib/styles/palette';

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
      // console.log(res.data.infant);
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
      // console.log(array);
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
    // document.location.href = '/detail/'+ reviewCard
  };

  return (
    <div>
      {/* <Link to={{ pathname: '/post/detail/:reviewCard', state: { detailnum : reviewCard}}}> */}
      <Card
        infomationCard={infomationCard}
        sx={{ maxWidth: 225 }}
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
            {addr1}
          </Typography>{' '}
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
