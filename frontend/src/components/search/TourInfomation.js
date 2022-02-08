import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import './TourInfomation.css';

const TourInfomation = () => {
  const pageNum = useParams();
  const infomationNum = Number(pageNum.infomationCard);
  const myuser = useSelector((state) => state.user.userData);

  // infomation 내용 불러오기 위한 const

  const [infomationDetail, setInfomationDetail] = useState([]);
  const [barriers, setBarriers] = useState([]);
  const [reviewPoint, setReviewPoint] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviewTime, setReviewTime] = useState('');

  // review 창이 뜨자 마자 불러와져야할 것들
  useEffect(() => {
    getPostDetail();
  }, []);

  const getPostDetail = () => {
    axios({
      method: 'GET',
      url: 'recommend/detail',
      params: {
        contentid: 130183,
        userSeq: myuser.userSeq,
      },
    })
      .then((res) => {
        setInfomationDetail(res.data);
        // console.log(infomationDetail)
      })
      .catch('yes');
  };

  return (
    <div>
      <div class="infomation-box">
        <div>
          <div class="infomation">
            <div class="info-img">
              <img src={infomationDetail.firstimage}></img>
            </div>
            <div class="info-content">
              <h1>{infomationDetail.title}</h1>
              <p>{infomationDetail.overview}</p>
              <Grid container>
                <InfoIcon></InfoIcon>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// https://mui.com/components/rating/ 별 표시 할 때 쓸 것
export default TourInfomation;
