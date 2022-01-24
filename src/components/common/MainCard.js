import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import BeachPicture from "./images/beach.jpg"
import BarrierIcon from "./BarrierIcon";


function MainCard() {
  return (
    <div>
      <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="300"
          image={BeachPicture}
          alt="Dog Picture"
        />
        
        <CardContent align="left">
          <Typography variant="body2" color="text.secondary">
            장사해수욕장
          </Typography>
          영덕에 놀러왔어요 ㅎㅎ
          <BarrierIcon></BarrierIcon>
        </CardContent>

      </Card>
    </div>
  )
}

export default MainCard;