import React, { useEffect, useState, useCallback } from "react";
import Physical from "../images/Physical.png"
import Auditory from "../images/Auditory.png"
import Pregnant from "../images/Pregnant.png"
import Senior from "../images/Senior.png"
import Visual from "../images/Visual.png"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import RecommendCardList from "./RecommendCardList.js";
import { Container, Box } from "@material-ui/core";
import RecommendCategories from "./RecommendCategories";


const Recommend = () => {
  const [itemList, setItemList] = useState([]);
  const [category, setCategory] = useState('all');
  const onSelect = useCallback(category => (setCategory(category), console.log(category)), [])

  // 시도 설정
  const [cityList, setCityList] = useState([]);
  const [townList, setTownList] = useState([]);
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');

  useEffect(() => {
    const setRecommendPage = () => {
      axios(
        {
          method: 'GET',
          url:'post/all?userSeq=1'
        }
      ).then(function (res) {
        setItemList(res.data)
      });
    }
    
    const setCityDropdown = () => {
      axios(
        {
          method: 'GET',
          url: 'recommend/sido'
        }
      ).then(function (res) {
        console.log(res.data)
        setCityList(res.data)
      });
    }
    setRecommendPage();
    setCityDropdown();
  }, []);


  const selectTown = () => {
    const sidoCode = city
    axios(
      {
        url: 'recommend/sigungu',
        method: 'GET',
        params: {sidoCode: sidoCode}
      }).then(function (res) {
        console.log(res)
        setTownList(res.data)
        console.log(townList)
      })
  };
  
  const handelChangeCity = (event) => {
    console.log(event)
    setCity(event.target.value);
    console.log(city)
    selectTown();
  }
  
  const handelChangeTown = (event) => {
    console.log(event.target)
    setTown(event.target.value)
    console.log(town)
  }
  

  const onClickBarrier = (res) => {
    const barrier = res.target.id
    axios(
      {
        url:'post/all?userSeq=1',
        params:{impairment: barrier}
      }
    ).then(function (res) {
      setItemList(res.data)
      // console.log(res.data)
    })
  }

  return (
    <div>
      <Container maxWidth="md">
        <h2>내 주변 무장애 여행지</h2>
        <Box border={1}>
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
            onChange={handelChangeCity}
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
            onChange={handelChangeTown}
            label="시도">
              {townList.map(town => (
                <MenuItem name={town.name} value={town.code} key={town.rnum}>{town.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <Button variant="contained">검색</Button>
            <Button variant="contained">초기화</Button>
          </div>
        </Box>
        <RecommendCategories category={category} onClick={onSelect}></RecommendCategories>
        <RecommendCardList itemList={itemList} caategory={category}></RecommendCardList>
      </Container>
    </div>
  )
}

export default Recommend;