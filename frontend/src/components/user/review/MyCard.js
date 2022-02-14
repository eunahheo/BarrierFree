import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import RecommendBarrierIcon from '../../recommend/RecommendBarrierIcon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import palette from '../../../lib/styles/palette';

const MyCard = ({ item }) => {
  const myuser = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const { post_photo, post_location, post_title, scrap_yn } = item;
  const reviewCard = item.post_seq;
  const [heart, setHeart] = useState(false);

  const onClickCard = () => {
    // axios({
    //   method: 'GET',
    //   url: '/post/detail',
    //   params: { postSeq: reviewCard },
    // }).then(function (res) {
    // });
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
    });
  };
  useEffect(() => {
    if (scrap_yn === 'y') {
      setHeart(true);
    }
  });
  return (
    <div>
      <Card
        style={{ cursor: 'pointer' }}
        reviewCard={reviewCard}
        sx={{ maxWidth: 250 }}
      >
        {heart ? (
          <h3
            style={{ color: `${palette.pink[0]}`, cursor: 'pointer' }}
            onClick={onRemoveHeart}
          >
            ❤
          </h3>
        ) : (
          <h3
            onClick={onClickHeart}
            style={{ color: `${palette.pink[0]}`, cursor: 'pointer' }}
          >
            ♡
          </h3>
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
            <Typography variant="body2" color="text.secondary">
              {post_location}
            </Typography>
            {post_title}
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
export default MyCard;
