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
  useEffect(() => {
    axios(
      {
        url:'post/all?userSeq=1'
      }
    ).then(function (res) {
      setItemList(res.data)
    });
  }, [])

  const [city, setCity] = React.useState('');
  const [town, setTown] = React.useState('');

  const handelChangeCity = (event) => {
    setCity(event.target.value)
  }
  
  const handelChangeTown = (event) => {
    setTown(event.target.value)
  }
  
  const onClickBarrier = (res) => {
    console.log(res.target.id)
    const barrier = res.target.id
    axios(
      {
        url:'post/all?userSeq=1',
        params:{impairment: barrier}
      }
    ).then(function (res) {
      setItemList(res.data)
      console.log(res.data)
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
              <MenuItem value="서울">서울</MenuItem>
              <MenuItem value="경기">경기</MenuItem>
              <MenuItem value="강원">강원</MenuItem>
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
              <MenuItem value="서울">서울</MenuItem>
              <MenuItem value="경기">경기</MenuItem>
              <MenuItem value="강원">강원</MenuItem>
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