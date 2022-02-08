import React, { useEffect, useState, useCallback } from 'react';
import Physical from '../images/Physical.png';
import Auditory from '../images/Auditory.png';
import Pregnant from '../images/Pregnant.png';
import Senior from '../images/Senior.png';
import Visual from '../images/Visual.png';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import axios from 'axios';
import RecommendCardList from './RecommendCardList.js';
import { Container, Box } from '@material-ui/core';
import RecommendCategories from './RecommendCategories';
import { useDispatch, useSelector } from 'react-redux';
import { findLocation } from '../../_actions/find_actions';
import './Recommend.css';
const Recommend = () => {
  const myuser = useSelector((state) => state.user.userData);
  // console.log(myuser)
  const dispatch = useDispatch();
  const [itemList, setItemList] = useState([]);
  var arrayLength = 3;
  var multiArray = new Array(arrayLength);
  const [result, setResult] = useState([]);
  const [category, setCategory] = useState('all');
  const onSelect = useCallback(
    (category) => (setCategory(category), console.log(category)),
    [],
  );

  // 시도 설정
  const [cityList, setCityList] = useState([]);
  const [townList, setTownList] = useState([]);
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [barrier, setBarrier] = useState('');

  useEffect(() => {
    findMyLocation();
    setCityDropdown();
  }, []);

  // 내 위치 받아오기
  const findMyLocation = () => {
    // Geolocation API에 액세스할 수 있는지를 확인
    if (navigator.geolocation) {
      //위치 정보를 얻기
      navigator.geolocation.getCurrentPosition(function (res) {
        axios({
          method: 'GET',
          url: '/recommend/myloc',
          params: {
            contentTypeId: 12,
            lat: res.coords.latitude, // 위도
            lng: res.coords.longitude, // 경도
            radius: 1000,
            userSeq: myuser.userSeq,
            page: 1,
            size: 100,
          },
        }).then(function (res) {
          setItemList(res.data);
        });
      });
    } else {
      alert('이 브라우저에서는 Geolocation이 지원되지 않습니다.');
    }
  };

  // 여행 지역 선택하기
  const setCityDropdown = () => {
    axios({
      method: 'GET',
      url: 'recommend/sido',
    }).then(function (res) {
      console.log(res);
      setCityList(res.data);
    });
  };

  const handleChangeCity = (event) => {
    if (town) {
      setTown('');
    }
    setCity(event.target.value);
    selectTown(event.target.value);
  };

  const selectTown = (sidoCode) => {
    axios({
      url: 'recommend/sigungu',
      method: 'GET',
      params: {
        sidoCode: sidoCode,
      },
    }).then(function (res) {
      setTownList(res.data);
    });
  };

  const handleChangeTown = (event) => {
    console.log(event);
    setTown(event.target.value);
  };

  // 장애 정보 선택하기
  const onClickBarrier = (res) => {
    console.log(res.target.id);
    setBarrier(res.target.id);
  };

  const onClickSearch = () => {
    const cityNum = Number(city);
    const townNum = Number(town);
    // let data = {
    //   sidoCode: city,
    //   sigunguCode: town,
    //   userSeq: myuser.userSeq,
    //   // contentTypeId: impairmentNums[i],
    //   impairments: barrier,
    //   page: 0,
    //   size: 10
    //   }
    // axios(
    //   {
    //     method: "GET",
    //     url: '/recommend/search',
    //     params: data
    //   }).then((res) => {
    //     console.log(res)
    //     setItemList(res.data)})
    //   .catch('hey')
    // setCity('');
    // setTown('');
    // setBarrier('');
    // const impairmentNums = [12, 39, 32, 15];
    // for (var i = 0; i < impairmentNums.length; i++)

    if (city && town && barrier) {
      let data = {
        sidoCode: cityNum,
        sigunguCode: townNum,
        userSeq: myuser.userSeq,
        // contentTypeId: impairmentNums[i],
        impairments: barrier,
        page: 0,
        size: 10,
      };
      axios({
        method: 'GET',
        url: '/recommend/search',
        params: data,
      })
        .then((res) => {
          console.log(res);
          setItemList(res.data);
        })
        .catch('hey');

      setCity('');
      setTown('');
      setBarrier('');
    } else if (barrier) {
      let data = {
        // sidoCode: cityNum,
        // sigunguCode: townNum,
        userSeq: myuser.userSeq,
        contentTypeId: 12,
        impairments: barrier,
        page: 0,
        size: 10,
      };
      axios({
        method: 'GET',
        url: '/recommend/search',
        params: data,
      }).then((res) => {
        console.log(res);
        setItemList(res.data);
      });

      setCity('');
      setTown('');
      setBarrier('');
    } else if ((city, town)) {
      let data = {
        sidoCode: cityNum,
        sigunguCode: townNum,
        userSeq: myuser.userSeq,
        contentTypeId: 12,
        // impairments: barrier,
        page: 0,
        size: 10,
      };
      axios({
        method: 'GET',
        url: '/recommend/search',
        params: data,
      })
        .then((res) => {
          console.log(res);
          setItemList(res.data);
        })
        .catch('hey');

      setCity('');
      setTown('');
      setBarrier('');
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <Container maxWidth="md">
        <h2>내 주변 무장애 여행지</h2>
        <div class="selete-box">
          <h3>무장애 선택하기</h3>
          <div>
            <img id="physical" onClick={onClickBarrier} src={Physical}></img>
            <img id="visibility" onClick={onClickBarrier} src={Visual}></img>
            <img id="deaf" onClick={onClickBarrier} src={Auditory}></img>
            <img id="infant" onClick={onClickBarrier} src={Pregnant}></img>
            <img id="senior" onClick={onClickBarrier} src={Senior}></img>
          </div>
          <h3>무장애 여행지역</h3>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="find-city">시도 검색</InputLabel>
            <Select
              labelId="find-city"
              id="find-city"
              value={city}
              onChange={handleChangeCity}
              label="시도"
            >
              {cityList.map((city) => (
                <MenuItem name={city.name} value={city.code} key={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="find-town">시구군 검색</InputLabel>
            <Select
              labelId="find-town"
              id="find-town"
              value={town}
              onChange={handleChangeTown}
              label="시도"
            >
              {townList.map((town) => (
                <MenuItem value={town.code} key={town.rnum}>
                  {town.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div class="button-list">
            <Button variant="contained" id="search" onClick={onClickSearch}>
              검색
            </Button>
            <Button variant="contained" id="reset">
              초기화
            </Button>
          </div>
        </div>
        <RecommendCategories
          category={category}
          onClick={onSelect}
        ></RecommendCategories>
        <RecommendCardList
          itemList={itemList}
          category={category}
        ></RecommendCardList>
      </Container>
    </div>
  );
};

export default Recommend;
