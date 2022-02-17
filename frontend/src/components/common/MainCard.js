import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import BarrierIcon from './BarrierIcon';
import LocationIcon from '@mui/icons-material/LocationOn';

function MainCard(post_photo, post_location, post_title, impairment) {
  return (
    <div>
      <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="300"
          image={post_photo}
          alt="post_title"
        />

        <CardContent align="left">
          <Typography variant="body2" color="text.secondary">
            <LocationIcon sx={{ fontSize: 15 }} /> {post_location}
          </Typography>
          {post_title}
          {impairment}
          <BarrierIcon></BarrierIcon>
        </CardContent>
      </Card>
    </div>
  );
}

export default MainCard;
