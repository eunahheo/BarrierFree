import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { Box, Container, Grid, Input } from "@material-ui/core";
import Dogimg from "../common/images/강아지.jpg";
import Rating from '@mui/material/Rating';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";
import { useParams } from "react-router";
// import "./Review.css"
// import "styles.css";

const Review = () => {
  const pageNum = useParams()
  const reviewNum = Number(pageNum.reviewCard)
  
  // review 내용 불러오기 위한 const
  
  const [infomationDetail, setInfomationDetail] = useState([]);
  const [barriers, setBarriers] = useState([]);
  const [reviewPoint, setReviewPoint] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviewTime, setReviewTime] = useState('');
  
  // 댓글 작성을 위한 const
  
  const [newComment, setNewComment] = useState('');
  const onCommentHandler = (event) => {
    console.log(event)
    setNewComment(event.target.value);
  };

  
  // review 창이 뜨자 마자 불러와져야할 것들
  useEffect(() => {
    const getPostDetail = () => {
      axios({
        method: 'GET',
        url: 'recommend/detail',
        params: {contentid: 126508}
      }
      ).then(res => {
        console.log(res)
        setInfomationDetail(res.data)
        // console.log(infomationDetail)
      }).catch('yes')
    };
    
    const getCommentList = () => {
      axios({
        method: 'GET',
        url: '/post/comment/detail',
        params: {postSeq: reviewNum}
      }
      ).then(res => {
        setComments(res.data)
      }).catch('yes')
    };
    
    
    getPostDetail();
    getCommentList();
    
  },[])
  
  
  // const saveComment = () => {
  //   axios.post('/post/comment/saveComment', {1, reviewNum, newComment})
  // }
  // onClick={saveComment}


  return (
    <div>
      <Container maxWidth="md">
        <Box border={1}>
          <div>
            <ArrowBackIcon></ArrowBackIcon>
            <span>{infomationDetail.title}</span>
          </div>
          <hr></hr>
          <img src={infomationDetail.firstimage}></img>
          <p>{infomationDetail.overview}</p>
          <Grid container>
              <InfoIcon></InfoIcon>
          </Grid>

          <div>
          </div>
        </Box>
      </Container>
    </div>
  )
}

// https://mui.com/components/rating/ 별 표시 할 때 쓸 것
export default Review;