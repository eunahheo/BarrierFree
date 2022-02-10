import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import RecommendBarrierIcon from '../../recommend/RecommendBarrierIcon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyCard = ({ item }) => {
  const navigate = useNavigate();
  const { postPhoto, postLocation, postTitle } = item;
  const reviewCard = item.postSeq;

  const onClickCard = () => {
    axios({
      method: 'GET',
      url: '/post/detail',
      params: { postSeq: reviewCard },
    }).then(function (res) {
      navigate(`/post/detail/${reviewCard}`);
    });
  };

  return (
    <div>
      <Card
        style={{ cursor: 'pointer' }}
        onClick={onClickCard}
        reviewCard={reviewCard}
        sx={{ maxWidth: 250 }}
      >
        <CardMedia
          component="img"
          height="200"
          image={postPhoto}
          alt="Dog Picture"
          style={{ maxHeight: 250 }}
        />
        <CardContent align="left">
          <Typography variant="body2" color="text.secondary">
            {postLocation}
          </Typography>
          {postTitle}
        </CardContent>
      </Card>
    </div>
  );
};
export default MyCard;
