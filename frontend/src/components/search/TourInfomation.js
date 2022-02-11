import React, { useEffect, useState } from 'react';
import { Grid, Divider } from '@material-ui/core';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import './TourInfomation.css';
import Physical from '../images/Physical.png';
import Deaf from '../images/Auditory.png';
import Infant from '../images/Pregnant.png';
import Senior from '../images/Senior.png';
import Visibility from '../images/Visual.png';
const TourInfomation = () => {
  const pageNum = useParams();
  const contentid = Number(pageNum.infomationCard);
  const myuser = useSelector((state) => state.user.userData);
  // infomation 내용 불러오기 위한 const

  const [infomationDetail, setInfomationDetail] = useState([]);
  const [barriers, setBarriers] = useState([]);
  const [posts, setPosts] = useState([]);

  // Tourinfomation 창이 뜨자 마자 불러와져야할 것들
  useEffect(() => {
    getPostDetail();
  }, []);

  const getPostDetail = () => {
    axios({
      method: 'GET',
      url: '/recommend/detail',
      params: {
        contentid: contentid,
        userSeq: myuser.userSeq,
      },
    })
      .then((res) => {
        setInfomationDetail(res.data);
      })
      .catch('yes');
  };

  const icon_rendering = (i) => {
    const result = [];
    if (barriers[i].code == 'physical') result.push(<img src={Physical} />);
    else if (barriers[i].code == 'visibility')
      result.push(<img src={Visibility} />);
    else if (barriers[i].code == 'deaf') result.push(<img src={Deaf} />);
    else if (barriers[i].code == 'infant') result.push(<img src={Infant} />);
    else if (barriers[i].code == 'senior') result.push(<img src={Senior} />);
    return result;
  };

  const imp_rendering = (i) => {
    const result = [];
    result.push(
      <p dangerouslySetInnerHTML={{ __html: barriers[i].tiOverview }}></p>,
      <br />,
    );
    return result;
  };

  const post_rendering = () => {
    const result = [];
    for (let i = 0; i < posts.length; i++) {
      result.push(<div>{posts[i].title}</div>);
    }
    return result;
  };

  console.log(barriers);
  console.log(posts);

  return (
    <div>
      <div class="infomation-box">
        <div>
          <div class="infomation">
            <div class="info-scrap">스크랩 : {infomationDetail.scraptimes}</div>
            <div class="info-title">{infomationDetail.title}</div>
            <div class="info-img">
              <img src={infomationDetail.firstimage}></img>
            </div>
            <div class="info-content">
              <div
                dangerouslySetInnerHTML={{ __html: infomationDetail.overview }}
              ></div>
              <br />
              <Grid container>
                <InfoIcon></InfoIcon>
                <p>
                  {infomationDetail.addr1} {infomationDetail.addr2}
                </p>
              </Grid>
              <br />
              <div>
                <p class="overview">
                  <img class="icon" src={Senior}></img> 하하하
                </p>
              </div>
              <div>
                <p>
                  <img class="icon" src={Senior}></img> 으하하하
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// https://mui.com/components/rating/ 별 표시 할 때 쓸 것
export default TourInfomation;
