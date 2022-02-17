import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import RecommendBarrierIcon from './RecommendBarrierIcon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecommendCard = ({ item }) => {
  const navigate = useNavigate();

  const { post_photo, post_location, post_title } = item;
  const barriers = item.impairment;
  const reviewCard = item.post_seq;

  const onClickCard = () => {
    axios({
      method: 'GET',
      url: 'post/detail',
      params: { postSeq: reviewCard },
    }).then(function (res) {
      navigate(`/post/detail/${reviewCard}`);
    });
  };

  return (
    <div>
      {/* <Link to={{ pathname: '/post/detail/:reviewCard', state: { detailnum : reviewCard}}}> */}
      <Card
        onClick={onClickCard}
        reviewCard={reviewCard}
        sx={{ maxWidth: 250 }}
      >
        {/* <Card onClick={onClickCard} pageNum={reviewCard} sx={{ maxWidth: 250 }}> */}
        <CardMedia
          component="img"
          height="300"
          image={post_photo}
          alt="Dog Picture"
        />

        <CardContent align="left">
          <Typography variant="body2" color="text.secondary">
            {post_location}
          </Typography>
          {post_title}
          <RecommendBarrierIcon barriers={barriers}></RecommendBarrierIcon>
        </CardContent>
      </Card>
    </div>
  );
};
export default RecommendCard;
