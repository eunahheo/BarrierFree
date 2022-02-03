import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import RecommendBarrierIcon from "../recommend/RecommendBarrierIcon";
import axios from "axios";
// import Review from "../review/Review";
import { Link, useNavigate } from "react-router-dom";

const MyCard = ({ item }) => {
  const navigate = useNavigate();

  const { postPhoto, postLocation, postTitle } = item;
  // const barriers = item.impairment;
  const reviewCard = item.postSeq;
  // const state = { 'detailnum': reviewCard}
  const onClickCard = () => {
    // console.log(e)
    axios({
      method: "GET",
      url: "post/detail",
      params: { postSeq: reviewCard },
    }).then(function (res) {
      // console.log(res.config.params.postSeq)
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
          {/* <RecommendBarrierIcon barriers={barriers}></RecommendBarrierIcon> */}
        </CardContent>
      </Card>
      {/* </Link> */}
    </div>
  );
};
export default MyCard;
