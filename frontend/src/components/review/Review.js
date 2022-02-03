import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box, Container, Grid, Input } from "@material-ui/core";
import Dogimg from "../common/images/강아지.jpg";
import Rating from "@mui/material/Rating";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { useParams } from "react-router";
import CommentItem from "./CommentItem.js";
import "./Review.css";
// import "styles.css";

const Review = () => {
  const pageNum = useParams();
  const reviewNum = Number(pageNum.reviewCard);

  // review 내용 불러오기 위한 const

  const [reviewDetail, setReviewDetail] = useState([]);
  const [barriers, setBarriers] = useState([]);
  const [reviewPoint, setReviewPoint] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviewTime, setReviewTime] = useState("");
  const [reviewImage, setReviewImage] = useState("");

  // 댓글 작성을 위한 const

  const [newComment, setNewComment] = useState("");
  const onCommentHandler = (event) => {
    console.log(event);
    setNewComment(event.target.value);
  };

  // review 창이 뜨자 마자 불러와져야할 것들
  useEffect(() => {
    const getPostDetail = () => {
      axios({
        method: "GET",
        url: "/post/detail",
        params: { postSeq: reviewNum },
      })
        .then((res) => {
          console.log(res);
          setReviewDetail(res.data[0].post);
          setBarriers(res.data[0].impairment);
          setReviewPoint(res.data[0].post.postPoint);
          setReviewTime(res.data[0].post.regDt.substring(0, 10));
          setReviewImage(res.data[0].post.postPhoto);
          console.log(res.data[0].impairment[0]);
        })
        .catch("yes");
    };

    const getCommentList = () => {
      axios({
        method: "GET",
        url: "/post/comment/detail",
        params: { postSeq: reviewNum },
      })
        .then((res) => {
          setComments(res.data);
        })
        .catch("yes");
    };

    getPostDetail();
    getCommentList();
  }, []);

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
            <Button variant="contained">수정</Button>
            <Button variant="contained">삭제</Button>
          </div>
          <hr></hr>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <img src={reviewImage} sx={{ maxWidth: 250 }} />
            </Grid>
            <Grid item xs={8}>
              <h4>{reviewDetail.postTitle}</h4>

              <Rating name="read-only" value={reviewPoint} readOnly></Rating>
              <p>{reviewTime}</p>
              <p>{barriers}</p>
              <p>{reviewDetail.postContent}</p>
              <Grid container>
                <InfoIcon></InfoIcon>
                <span class="location-name">{reviewDetail.postLocation}</span>
              </Grid>
            </Grid>
          </Grid>
          <div>
            <Input
              placeholder="댓글을 입력하세요"
              onChange={onCommentHandler}
            ></Input>
            <Button variant="contained">작성</Button>
          </div>
          <div>
            {comments.map((comment) => (
              <CommentItem comment={comment} key={comment.cmtSeq} />
            ))}
          </div>
        </Box>
      </Container>
    </div>
  );
};

// https://mui.com/components/rating/ 별 표시 할 때 쓸 것
export default Review;
