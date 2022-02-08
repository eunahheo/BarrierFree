import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const SearchCard = ({ item }) => {
  const { firstimage, addr1, title } = item;

  return (
    <div>
      <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="300"
          image={firstimage}
          alt="Dog Picture"
        />

        <CardContent align="left">
          <Typography variant="body2" color="text.secondary">
            {addr1}
          </Typography>
          {title}
        </CardContent>
      </Card>
    </div>
  );
};
export default SearchCard;
