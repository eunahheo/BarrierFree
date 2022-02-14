import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import RecommendBarrierIcon from '../../recommend/RecommendBarrierIcon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReviewBarrierIcon from '../../common/review/ReviewBarrierIcon';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import palette from '../../../lib/styles/palette';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ScrapCard = ({ item, onRemove }) => {
  const myuser = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const { firstimage, title, addr1 } = item;
  const reviewCard = item.postSeq;
  const [image, setImage] = useState(item.firstimage);
  const barriers = item.impairment;
  const [heart, setHeart] = useState(false);

  const onClickCard = () => {
    navigate(`/recommend/detail/${item.contentId}`);
  };
  // console.log(item);
  useEffect(() => {
    if (item.scrap_yn === 'y') {
      setHeart(true);
    }
  });
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
    }).then(onRemove(item.post_seq));
  };
  useEffect(() => {
    if (item.scrapYn === 'y') {
      setHeart(true);
    }
  });
  return (
    <div>
      <Card
        onClick={onClickCard}
        style={{ cursor: 'pointer' }}
        onClick={onClickCard}
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
        <CardMedia
          component="img"
          height="200"
          image={firstimage}
          alt={item.title}
          style={{ maxHeight: 250 }}
        />
        <CardContent align="left">
          <Typography variant="body2" color="text.secondary">
            {addr1}
          </Typography>
          {title}
        </CardContent>
        <ReviewBarrierIcon barriers={barriers}></ReviewBarrierIcon>
      </Card>
    </div>
  );
};
export default ScrapCard;
