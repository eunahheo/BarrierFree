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

const MyCard = ({ item, onRemove }) => {
  const myuser = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const { post_photo, post_location, post_title, scrap_yn } = item;
  const reviewCard = item.post_seq;
  const [heart, setHeart] = useState(false);
  console.log(item);
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
    }).then(function (res) {
      console.log(res);
      console.log(typeof item.post_seq);
      onRemove(item.post_seq);
    });
  };
  useEffect(() => {
    if (scrap_yn === 'y') {
      setHeart(true);
    }
  }, []);
  return (
    <div>
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
            <Typography variant="body2" color="text.secondary">
              <LocationIcon sx={{ fontSize: 15 }} /> {post_location}
            </Typography>
            {post_title}
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
export default MyCard;
