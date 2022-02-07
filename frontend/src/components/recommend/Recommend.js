import React, { useEffect, useState, useCallback } from "react";
import Physical from "../images/Physical.png";
import Auditory from "../images/Auditory.png";
import Pregnant from "../images/Pregnant.png";
import Senior from "../images/Senior.png";
import Visual from "../images/Visual.png";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import RecommendCardList from "./RecommendCardList.js";
import { Container, Box } from "@material-ui/core";
import RecommendCategories from "./RecommendCategories";
import { useDispatch, useSelector } from "react-redux";
import { findLocation } from "../../_actions/find_actions";
import Header from "../common/Header";
import './Recommend.css';

const Recommend = () => {
  const myuser = useSelector((state) => state.user.userData)
  // console.log(myuser)
  const dispatch = useDispatch();
  const [itemList, setItemList] = useState([]);
  const [category, setCategory] = useState("all");
  const onSelect = useCallback(
    (category) => (setCategory(category), console.log(category)),
    []
  );

  // 시도 설정
  const [cityList, setCityList] = useState([]);
  const [townList, setTownList] = useState([]);
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [barrier, setBarrier] = useState('');

  useEffect(() => {
    const SetRecommendPage = () => {
        
          findMyLocation();
          setCityDropdown();          
        }
      
      SetRecommendPage();
      }, []);

  // 내 위치 받아오기
  const findMyLocation = () => {      
    // Geolocation API에 액세스할 수 있는지를 확인
    if (navigator.geolocation) {
        //위치 정보를 얻기
        navigator.geolocation.getCurrentPosition (function(res) {
          axios(
            {
              method: 'GET',
              url:'recommend/myloc',
              params: {
                lat : res.coords.latitude,  // 위도
                lng : res.coords.longitude,  // 경도
                radius : 20000,
                userSeq: myuser.userSeq
              }
            }
          ).then(function (res) {

            setItemList(res.data)
          });
        }
        );
    } else {
        alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.")
    }
  };

  // 여행 지역 선택하기
  const setCityDropdown = () => {
    axios({
      method: "GET",
      url: "recommend/sido",
    }).then(function (res) {
      setCityList(res.data);
    });
  };
  
  const handleChangeCity = (event) => {
    if (town) {
      setTown('')
    }
    console.log(event)
    if (event.target.value != 8) {
      setCity(event.target.value);
      selectTown(event.target.value);
    } else {
      setTownList([])
    }
  }

  const selectTown = (sidoCode) => {
    axios(
      {
        url: 'recommend/sigungu',
        method: 'GET',
        params: {
          sidoCode: sidoCode
        }
      }).then(function (res) {
        console.log(res)
        setTownList(res.data)
      })
  };
  
  const handleChangeTown = (event) => {
    setTown(event.target.value)
  }
  
  // 장애 정보 선택하기
  const onClickBarrier = (res) => {
    // console.log(res.target.id)
    if (res.target.id === "physical") {
      setBarrier(1)
    } else if (res.target.id === "visual") {
      setBarrier(2)
    } else if (res.target.id === "auditory") {
      setBarrier(3)
    } else if (res.target.id === "pregnant") {
      setBarrier(4)
    } else if (res.target.id === "senior") {
      setBarrier(5)
    }
  }
  
  // !!!!!!!!!!!!! 검색 기능 만들기
  const onClickSearch = () => {
    // city와 town만 있을 때
    if (city, town) {
      let data = {
        sidoCode: city,
        sigunguCode: town,
        userSeq: myuser.userSeq,
      }
      dispatch(findLocation(data))
      setCity('');
      setTown('');
    } else if (barrier) {
      let data = {
        contentTypeId: barrier,
        userSeq: myuser.userSeq,
      }
      dispatch(findLocation(data))
      setBarrier('');
    } else if (city, town, barrier) {
      let data = {
        contentTypeId: barrier,
        sidoCode: city,
        sigunguCode: town,
        userSeq: myuser.userSeq,
      }
      dispatch(findLocation(data))
      setCity('');
      setTown('');
      setBarrier('');
    }
  }



  return (
    <div>
      {/* <Header /> */}
      <Container maxWidth="md">
        <h2>내 주변 무장애 여행지</h2>
        <div class="selete-box">
          <h3>무장애 선택하기</h3>
          <div>
            <img id="physical" onClick={onClickBarrier} src={Physical}></img>
            <img id="visual" onClick={onClickBarrier} src={Visual}></img>
            <img id="auditory" onClick={onClickBarrier} src={Auditory}></img>
            <img id="pregnant" onClick={onClickBarrier} src={Pregnant}></img>
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
            label="시도">
              {cityList.map(city => (
                <MenuItem name={city.name} value={city.code} key={city.rnum}>{city.name}</MenuItem>
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
            label="시도">
              {townList.map(town => (
                <MenuItem value={town.code} key={town.rnum}>{town.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div class="button-list">
            <Button variant="contained" id="search" onClick={onClickSearch}>검색</Button>
            <Button variant="contained" id="reset">초기화</Button>
          </div>
        </div>
        <RecommendCategories category={category} onClick={onSelect}></RecommendCategories>
        <RecommendCardList itemList={itemList} category={category}></RecommendCardList>
      </Container>
    </div>
  );
};

export default Recommend;