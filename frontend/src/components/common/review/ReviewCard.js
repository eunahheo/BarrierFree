import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import ReviewBarrierIcon from './ReviewBarrierIcon';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ReviewCard = ({ item }) => {
  const myuser = useSelector((state) => state.user.userData);
  // console.log('item in reviewCard', item);
  const navigate = useNavigate();
  const { postPhoto, postLocation, postTitle } = item;
  const barriers = item.impairment;
  const reviewCard = item.postSeq;
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
      alert('로그인이 필요합니다!😀');
    }
  };

  return (
    <div>
      <Card
        onClick={onClickCard}
        reviewCard={reviewCard}
        sx={{ maxWidth: 250 }}
        style={{ cursor: 'pointer' }}
      >
        <CardMedia
          component="img"
          height="300"
          image={postPhoto}
          alt="Dog Picture"
        />

        <CardContent align="left">
          <Typography variant="body2" color="text.secondary">
            {postLocation}
          </Typography>
          {postTitle}
          <ReviewBarrierIcon barriers={barriers}></ReviewBarrierIcon>
        </CardContent>
      </Card>
    </div>
  );
};
export default ReviewCard;
