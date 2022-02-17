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
import ReviewCardList from '../user/review/ReviewCardList';
import { Container } from '@material-ui/core';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import palette from '../../lib/styles/palette';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const TourInfomation = () => {
  const pageNum = useParams();
  const contentid = Number(pageNum.infomationCard);
  const myuser = useSelector((state) => state.user.userData);
  // infomation 내용 불러오기 위한 const

  const [infomationDetail, setInfomationDetail] = useState([]);
  const [barriers, setBarriers] = useState([]);
  const [posts, setPosts] = useState([]);
  const { kakao } = window;
  const [heart, setHeart] = useState(false);
  const [scraptimes, setScraptimes] = useState([]);
  const navigate = useNavigate();

  // Tourinfomation 창이 뜨자 마자 불러와져야할 것들
  useEffect(() => {
    window.scrollTo(0, 0);
    axios({
      method: 'get',
      url: '/scrap/check',
      params: {
        scrap_data: contentid,
        scrap_type: 1,
        user_seq: myuser.userSeq,
      },
    }).then(function (res) {
      if (res.data.scrap_yn == 'y') {
        setHeart(true);
      }
    });
    getPostDetail();
    setScraptimes(scraptimes);
  }, []);

  const onClickHeart = () => {
    if (myuser) {
      setHeart(true);
      infomationDetail.scrap_yn = 'y';
      setScraptimes(scraptimes + 1);
      axios({
        method: 'get',
        url: '/scrap/insert',
        params: {
          scrap_data: contentid,
          scrap_type: 1,
          user_seq: myuser.userSeq,
        },
      });
    } else {
      alert('좋아요는 BF 회원만 가능합니다! 로그인 페이지로 이동할게요!😀');
      navigate('/loginpage');
    }
  };

  const onRemoveHeart = () => {
    setHeart(false);
    infomationDetail.scrap_yn = 'n';
    setScraptimes(scraptimes - 1);
    axios({
      method: 'put',
      url: '/scrap/delete',
      params: {
        scrap_data: contentid,
        scrap_type: 1,
        user_seq: myuser.userSeq,
      },
    });
  };

  const getPostDetail = () => {
    console.log(contentid);
    axios({
      method: 'GET',
      url: '/recommend/detail',
      params: {
        contentid: contentid,
        userSeq: myuser.userSeq,
      },
    })
      .then((res) => {
        console.log(res);
        setInfomationDetail(res.data);
        imp_rendering(res.data.impairments);
        setPosts(res.data.posts);
        kakaomap_rendering(res.data);
        setScraptimes(res.data.scraptimes);
      })
      .catch('yes');
  };

  const kakaomap_rendering = (data) => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(data.lat, data.lng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(data.lat, data.lng);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    var mapTypeControl = new kakao.maps.MapTypeControl();

    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

    const roadviewContainer = document.getElementById('roadview');
    const roadview = new kakao.maps.Roadview(roadviewContainer);
    const roadviewClient = new kakao.maps.RoadviewClient();

    const position = new kakao.maps.LatLng(data.lat, data.lng);

    roadviewClient.getNearestPanoId(position, 50, function (panoId) {
      roadview.setPanoId(panoId, position);
    });
  };

  const imp_rendering = (data) => {
    const result = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].code == 'physical')
        result.push(
          <div class="barrier">
            <img class="icon" src={Physical} />
            <div>
              <p dangerouslySetInnerHTML={{ __html: data[i].tiOverview }}></p>
            </div>
          </div>,
        );
      else if (data[i].code == 'visibility')
        result.push(
          <div class="barrier">
            <img class="icon" src={Visibility} />
            <div>
              <p dangerouslySetInnerHTML={{ __html: data[i].tiOverview }}></p>
            </div>
          </div>,
        );
      else if (data[i].code == 'deaf')
        result.push(
          <div class="barrier">
            <img class="icon" src={Deaf} />
            <div>
              <p dangerouslySetInnerHTML={{ __html: data[i].tiOverview }}></p>
            </div>
          </div>,
        );
      else if (data[i].code == 'infant')
        result.push(
          <div class="barrier">
            <img class="icon" src={Infant} />
            <div>
              <p dangerouslySetInnerHTML={{ __html: data[i].tiOverview }}></p>
            </div>
          </div>,
        );
      else if (data[i].code == 'senior')
        result.push(
          <div class="barrier">
            <img class="icon" src={Senior} />
            <div>
              <p dangerouslySetInnerHTML={{ __html: data[i].tiOverview }}></p>
            </div>
          </div>,
        );
      result.push(<br />);
    }
    setBarriers(result);
  };

  return (
    <div>
      <div class="infomation-box">
        <div>
          <div class="infomation">
            <div>
              <span class="info-title">{infomationDetail.title}</span>
              <span class="info-scrap">
                {heart ? (
                  <FavoriteIcon
                    style={{
                      color: `${palette.pink[0]}`,
                      cursor: 'pointer',
                      fontSize: 30,
                    }}
                    onClick={onRemoveHeart}
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={onClickHeart}
                    style={{
                      color: `${palette.pink[0]}`,
                      cursor: 'pointer',
                      fontSize: 30,
                    }}
                  />
                )}
                {scraptimes}
              </span>
            </div>
            <div class="info-item">
              <img class="info-img" src={infomationDetail.firstimage}></img>
            </div>
            <div class="info-content">
              <div class="info-first">
                <div class="info-left">
                  <h2>여행지 정보</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: infomationDetail.overview,
                    }}
                  ></div>
                  <div>
                    {infomationDetail.homepage ? (
                      <div>
                        <h2>홈페이지</h2>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: infomationDetail.homepage,
                          }}
                        ></p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <br />
                  <div>
                    <h2>주소</h2>
                    <p>
                      {infomationDetail.addr1} {infomationDetail.addr2}
                    </p>
                  </div>
                </div>
                <div class="info-right">
                  <br />
                  <div>
                    {/* <h2>무장애 정보</h2> */}
                    <p>{barriers}</p>
                  </div>
                </div>
              </div>

              <div class="info-second">
                <h2>지도</h2>
                <div class="map">
                  <div
                    id="myMap"
                    style={{ width: '100%', height: '500px' }}
                  ></div>
                  <div
                    id="roadview"
                    style={{
                      width: '100%',
                      height: '500px',
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <br></br>
              <h2>{infomationDetail.title}을 다녀간 친구들의 게시글</h2>
              {posts.length > 0 ? (
                <ReviewCardList itemList={posts}></ReviewCardList>
              ) : (
                <div>아직 게시글이 없어요 😅</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// https://mui.com/components/rating/ 별 표시 할 때 쓸 것
export default TourInfomation;
