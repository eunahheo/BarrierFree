import React, { useEffect, useState } from "react";
import CommentList from "./CommentList.js";
import Button from '@mui/material/Button';
import { Box, Container, Grid, Input } from "@material-ui/core";
import Dogimg from "../common/images/강아지.jpg";
import Rating from '@mui/material/Rating';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import axios from "axios";
import qs from 'qs';
import { useParams } from "react-router";
// import "styles.css";

const Review = () => {
  const pageNum = useParams()
  const reviewNum = Number(pageNum.reviewCard)
  
  // console.log(reviewNum)
  // const reviewNumber = match.params
  // console.log(props)
  const [reviewDetail, setReviewDetail] = useState([]);
  const [barriers, setBarriers] = useState([]);

  useEffect(() => {
    // console.log(data)
    axios({
      method: 'GET',
      url:'/post/detail',
      params: {postSeq: reviewNum}
      }
    ).then(res => {
      console.log(res)
      setReviewDetail(res.data[0].post)
      setBarriers(res.data[0].impairment)
      // console.log(reviewDetail)
      // console.log(res.data[0].impairment[0])
    })
  },[])

  return (
    <div>
      <Container maxWidth="md">
        <Box border={1}>
          <div>
            <ArrowBackIcon></ArrowBackIcon>
            <Button variant="contained">수정</Button>
            <Button variant="contained">삭제</Button>
          </div>
          <hr></hr>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <img src={Dogimg}></img>
            </Grid>
            <Grid item xs={8}>
              <h4>{reviewDetail.postTitle}</h4>
              
              <Rating name="read-only" value={reviewDetail.postPoint} readOnly></Rating>
              <p>{reviewDetail.regDt}</p>
              <p>{reviewDetail.postContent}</p>
              <Grid container>
                <InfoIcon></InfoIcon>
                <h5>{reviewDetail.postLocation}</h5>
              </Grid>
            </Grid>
          </Grid>
          <div>
            <Input placeholder="댓글을 입력하세요" ></Input>
            <Button variant="contained">작성</Button>
          </div>
          <div>
            <CommentList></CommentList>
          </div>
        </Box>
      </Container>
    </div>
  )
}

// https://mui.com/components/rating/ 별 표시 할 때 쓸 것
export default Review;