import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import RecommendBarrierIcon from '../../recommend/RecommendBarrierIcon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import palette from '../../../lib/styles/palette';

const MyCardCopy = ({ item }) => {
  const myuser = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const { postPhoto, postLocation, postTitle, scrapYn } = item;
  const reviewCard = item.postSeq;
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
      method: 'get',
      url: '/scrap/insert',
      params: {
        scrap_data: reviewCard,
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
    <div>
      <Card
        style={{ cursor: 'pointer' }}
        reviewCard={reviewCard}
        sx={{ maxWidth: 250 }}
      >
        {heart ? (
          <h3 style={{ color: `${palette.pink[0]}`, cursor: 'pointer' }}>❤</h3>
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
            image={postPhoto}
            alt={postLocation}
            style={{ maxHeight: 250 }}
          />
          <CardContent align="left">
            <Typography variant="body2" color="text.secondary">
              {postLocation}
            </Typography>
            {postTitle}
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
export default MyCardCopy;
