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
// import "styles.css";

const Review = ({ location }) => {
  console.log(location)

  const [reviewDetail, setReviewDetail] = useState([]);

  

  useEffect(() => {
    axios({
      url:'post/detail/postSeq?postSeq=1'
      }
    ).then(function (res) {
      setReviewDetail(res.data)
      console.log(reviewDetail)
    })
  })

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
              <h4>오미크론 확산세, 예상보다 빠르다…"다음달 3만명 이상 갈수도"</h4>
              
              <Rating name="read-only" value={5} readOnly></Rating>
              <p>날짜: 2022-01-26</p>
              <p>날짜: 2022-01-26</p>
              <p>(서울=연합뉴스) 최인영 기자 = 국내 코로나19 하루 확진자가 1만명을 넘어섰다. 전파력이 강한 오미크론 변이가 우세종이 되면서 확진자 규모가 급격히 커졌다. 중앙방역대책본부(방대본)에 따르면 26일 0시 기준 신규확진자는 1만3천12명이다. 신규확진자가 1만명을 넘은 것은 처음이다. 전날 8천571명에서 50% 이상 증가한 수준이다. 지난 20일 6천601명과 비교하면 거의 두 배가 뛰었다. 일주일도 안 되는 시간에 '더블링'(기존의 배 이상 늘어나는 현상)이 나타난 것이다. 오미크론은 지난주(17∼23일) 50.3%의 검출률을 기록하며 우세종이 됐다. 오미크론은 기존 델타 변이보다 전파력이 2배 이상 높은 것으로 파악됐다. 이 때문에 앞으로 확산 속도가 더욱 빨라져 확진자가 기하급수적으로 증가할 수 있다는 전망이 나온다. 정부의 예상보다도 빠른 속도로 확산하는 모습이다. 방대본이 서정숙 의원실에 제출한 '단기 예측 결과'에 따르면 오미크론의 전파율을 델타의 2.5배로 가정했을 때 확진자 수는 이달 말 7천200∼8천300명, 내달 말 3만1천800∼5만2천200명에 이를 것으로 예측됐다. 하지만 1월을 5일 남겨둔 시점에서 이미 1만명 이상의 확진자가 나왔다.</p>
              <Grid container>
                <InfoIcon></InfoIcon>
                <h5>강아지가 세상을 구한다</h5>
              </Grid>
            </Grid>
          </Grid>
          <div>
            <Input placeholder="댓글을 입력하세요" ></Input>
            <TextField label="댓글을 입력하세요" variant="standard"></TextField>
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