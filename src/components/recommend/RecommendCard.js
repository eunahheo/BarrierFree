import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import RecommendBarrierIcon from "./RecommendBarrierIcon";

const RecommendCard = ({ item }) => {
  const {post_photo, post_location, post_title} = item;
  const barriers = item.impairment
  
  return (
    <div>
      <Card sx={{ maxWidth: 250 }}>
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
  )
}
export default RecommendCard;