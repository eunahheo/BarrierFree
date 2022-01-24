import React from "react";
import { Card, CardMedia, CardContent } from "@mui/material";
import BeachPicture from "./images/beach.jpg"

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
        <CardContent>
          영덕에 놀러왔어요 ㅎㅎ
        </CardContent>
      </Card>
    </div>
  )
}

export default MainCard;