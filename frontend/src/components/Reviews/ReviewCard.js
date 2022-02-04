import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import ReviewBarrierIcon from "./ReviewBarrierIcon";
import axios from "axios";
import Review from "../review/Review";
import { Link, useNavigate } from "react-router-dom";

const ReviewCard = ({ item }) => {
  // console.log(item)
  // const pageNum = useState([]);
  const navigate = useNavigate();

  const { post_photo, post_location, post_title } = item;
  const barriers = item.impairment;
  const reviewCard = item.post_seq;
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
      // pageNum(res.config.params.postSeq)
      // console.log(setCard)
      // document.location.href = '/detail/'+ reviewCard
    });

    // document.location.href = '/detail/'+ reviewCard
  };

  return (
    <div>
      {/* <Link to={{ pathname: '/post/detail/:reviewCard', state: { detailnum : reviewCard}}}> */}
      <Card
        onClick={onClickCard}
        reviewCard={reviewCard}
        sx={{ maxWidth: 250 }}
      >
        {/* <Card onClick={onClickCard} pageNum={reviewCard} sx={{ maxWidth: 250 }}> */}
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
          <ReviewBarrierIcon barriers={barriers}></ReviewBarrierIcon>
        </CardContent>
      </Card>
      {/* </Link> */}
    </div>
  );
};
export default ReviewCard;
