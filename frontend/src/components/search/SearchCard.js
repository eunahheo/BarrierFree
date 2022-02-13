import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import ReviewBarrierIcon from './SearchBarrierIcon';

const SearchCard = ({ item }) => {
  const { firstimage, addr1, title, impairment } = item;

  return (
    <div>
      <Card sx={{ maxWidth: 225 }}>
        <CardMedia
          component="img"
          height="300"
          image={firstimage}
          alt="Dog Picture"
        />

        <CardContent align="left">
          <Typography noWrap variant="body2" color="text.secondary">
            {addr1}
          </Typography>
          <Typography noWrap variant="body1">
            {title}
          </Typography>
          <ReviewBarrierIcon barriers={impairment}></ReviewBarrierIcon>
        </CardContent>
      </Card>
    </div>
  );
};
export default SearchCard;
