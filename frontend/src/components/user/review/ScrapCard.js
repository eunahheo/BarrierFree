import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReviewBarrierIcon from '../../common/review/ReviewBarrierIcon';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import palette from '../../../lib/styles/palette';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationIcon from '@mui/icons-material/LocationOn';

const ScrapCard = ({ item, onRemove }) => {
  const myuser = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const { firstimage, title, addr1 } = item;
  const scrapCard = item.contentId;
  const barriers = item.impairment;
  const [heart, setHeart] = useState(false);

  const onClickCard = () => {
    navigate(`/recommend/detail/${item.contentId}`);
  };
  const onClickHeart = () => {
    setHeart(true);
    item.scrapYn = 'y';
    axios({
      method: 'get',
      url: '/scrap/insert',
      params: {
        scrap_data: scrapCard,
        scrap_type: 1,
        user_seq: myuser.userSeq,
      },
    });
  };

  const onRemoveHeart = () => {
    setHeart(false);
    item.scrapYn = 'n';
    axios({
      method: 'put',
      url: '/scrap/delete',
      params: {
        scrap_data: scrapCard,
        scrap_type: 1,
        user_seq: myuser.userSeq,
      },
    }).then(function (res) {
      onRemove(item.contentId);
    });
  };
  useEffect(() => {
    if (item.scrap_yn === 'y') setHeart(true);
    else setHeart(false);
  }, []);
  return (
    <div>
      <Card
        style={{ cursor: 'pointer', position: 'relative' }}
        scrapCard={scrapCard}
        sx={{ maxWidth: 250 }}
      >
        <CardMedia
          onClick={onClickCard}
          component="img"
          height="200"
          image={firstimage}
          alt={item.title}
          style={{ maxHeight: 250 }}
        />
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
        <CardContent align="left">
          <Typography variant="body2" color="text.secondary">
            <LocationIcon sx={{ fontSize: 15 }} /> {addr1}
          </Typography>
          {title}
        </CardContent>
        <ReviewBarrierIcon barriers={barriers}></ReviewBarrierIcon>
      </Card>
    </div>
  );
};
export default ScrapCard;
