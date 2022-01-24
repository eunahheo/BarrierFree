import React from "react";
import MainCard from "../common/MainCard.js"
import Physical from "../images/Physical.png"
import Auditory from "../images/Auditory.png"
import Pregnant from "../images/Pregnant.png"
import Senior from "../images/Senior.png"
import Visual from "../images/Visual.png"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Recommend() {
  return (
    <div>
      <h2>내 주변 무장애 여행지</h2>
      <hr></hr>
      <h3>무장애 선택하기</h3>
      <div>
        <img src={Physical}></img>
        <img src={Visual}></img>
        <img src={Auditory}></img>
        <img src={Pregnant}></img>
        <img src={Senior}></img>
      </div>
      <h3>무장애 여행지역</h3>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>시도 검색</InputLabel>
        <Select>
          <MenuItem>서울</MenuItem>
          <MenuItem>경기</MenuItem>
          <MenuItem>강원</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>시구군 검색</InputLabel>
        <Select>
          <MenuItem>서울</MenuItem>
          <MenuItem>경기</MenuItem>
          <MenuItem>강원</MenuItem>
        </Select>
      </FormControl>
      <div>
        <Button variant="contained">검색</Button>
        <Button variant="contained">초기화</Button>
      </div>
      <hr></hr>
      <MainCard></MainCard>
    </div>
  )
}

export default Recommend;