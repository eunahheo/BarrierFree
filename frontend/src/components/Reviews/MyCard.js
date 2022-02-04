import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import RecommendBarrierIcon from "../recommend/RecommendBarrierIcon";
import axios from "axios";
// import Review from "../review/Review";
import { Link, useNavigate } from "react-router-dom";

const MyCard = ({ item }) => {
  const navigate = useNavigate();

  const { postPhoto, postLocation, postTitle } = item;

  const reviewCard = item.postSeq;
  // console.log("reviewcard", reviewCard);
  const onClickCard = () => {
    // console.log(e)
    axios({
      method: "GET",
      url: "post/detail",
      params: { postSeq: reviewCard },
    }).then(function (res) {
      // console.log(reviewCard);
      navigate(`/post/detail/${reviewCard}`);
    });
  };

  return (
    <div>
      <Card
        onClick={onClickCard}
        reviewCard={reviewCard}
        sx={{ maxWidth: 250 }}
        // style={{ maxHeight: 250 }}
      >
        <CardMedia
          component="img"
          height="300"
          image={postPhoto}
          alt="Dog Picture"
          style={{ maxHeight: 250 }}
        />

        <CardContent align="left">
          <Typography variant="body2" color="text.secondary">
            {postLocation}
          </Typography>
          {postTitle}
        </CardContent>
      </Card>
    </div>
  );
};
export default MyCard;
