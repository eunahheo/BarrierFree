import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import ReviewBarrierIcon from './SearchBarrierIcon';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const SearchCard = ({ item }) => {
  const { post_seq, post_photo, post_location, post_title, impairment } = item;
  const navigate = useNavigate();
  const myuser = useSelector((state) => state.user.userData);

  return (
    <div>
      <Card sx={{ maxWidth: 225 }}>
        <CardMedia
          onClick={() => {
            navigate(`/post/detail/${post_seq}`);
          }}
          component="img"
          height="300"
          image={post_photo}
          alt="Dog Picture"
        />

        <CardContent align="left">
          <Typography noWrap variant="body2">
            {post_location}
          </Typography>
          <Typography noWrap variant="body1">
            {post_title}
          </Typography>
          <ReviewBarrierIcon barriers={impairment}></ReviewBarrierIcon>
        </CardContent>
      </Card>
    </div>
  );
};
export default SearchCard;
