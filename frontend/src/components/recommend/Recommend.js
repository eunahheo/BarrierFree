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
import Header from '../common/Header';
import './Recommend.css';

const Recommend = () => {
  const myuser = useSelector((state) => state.user.userData);
  // console.log(myuser)
  const dispatch = useDispatch();
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

  // 여행지 추천 파트
  const [itemList, setItemList] = useState([]);
  const [searchLocationList, setSearchLocationList] = useState([]);
  const [searchFoodList, setSearchFoodList] = useState([]);
  const [searchHomeList, setSearchHomeList] = useState([]);
  const [searchPartyList, setSearchPartyList] = useState([]);
  const [noresult, setNoresult] = useState('');
  const [search, setSearch] = useState(false);

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
        console.log(res)
        axios({
          method: 'GET',
          url: '/recommend/myloc',
          params: {
            contentTypeId: 12,
            lat: res.coords.latitude, // 위도
            lng: res.coords.longitude, // 경도
            radius: 5000,
            userSeq: myuser.userSeq,
            page: 1,
            size: 20,
          },
        }).then(function (res) {
          console.log(res)
          if (res.data === '검색결과가 없습니다.') {
            setItemList([]);
          } else {
            setItemList(res.data);
          }
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
    setItemList([]);
    setSearchLocationList([]);
    setSearchFoodList([]);
    setSearchHomeList([]);
    setSearchPartyList([]);
    setSearch(true);
    const cityNum = Number(city);
    const townNum = Number(town);
    const impairmentNums = [0, 12, 39, 32, 15];
    for (var i = 0; i < impairmentNums.length; i++)
    if (city && town && barrier) {
      let data = {
        sidoCode: cityNum,
        sigunguCode: townNum,
        userSeq: myuser.userSeq,
        contentTypeId: impairmentNums[i],
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
          if (res.config.params.contentTypeId == 0) {
            if (res.data.length > 0) {
              setItemList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId == 12) {
            if (res.data.length > 0) {
              setSearchLocationList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            } 
          } else if (res.config.params.contentTypeId == 39) {
            if (res.data.length > 0) {
              setSearchFoodList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId == 32) {
            if (res.data.length > 0) {
              setSearchHomeList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId == 15) {
            if (res.data.length > 0) {
              setSearchPartyList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          }
        })
        .catch('hey');

      setCity('');
      setTown('');
      setBarrier('');
    } else if (barrier) {
      let data = {
        userSeq: myuser.userSeq,
        contentTypeId: impairmentNums[i],
        impairments: barrier,
        page: 0,
        size: 10,
      };
      axios({
        method: 'GET',
        url: '/recommend/search',
        params: data,
      }).then((res) => {
        console.log(res)
        if (res.config.params.contentTypeId == 0) {
          if (res.data.length > 0) {
            setItemList(res.data);
          } else {
            setNoresult('검색 내용이 없습니다 😥');
          }
        } else if (res.config.params.contentTypeId == 12) {
          if (res.data.length > 0) {
            setSearchLocationList(res.data);
          } else {
            setNoresult('검색 내용이 없습니다 😥');
          } 
        } else if (res.config.params.contentTypeId == 39) {
          if (res.data.length > 0) {
            setSearchFoodList(res.data);
          } else {
            setNoresult('검색 내용이 없습니다 😥');
          }
        } else if (res.config.params.contentTypeId == 32) {
          if (res.data.length > 0) {
            setSearchHomeList(res.data);
          } else {
            setNoresult('검색 내용이 없습니다 😥');
          }
        } else if (res.config.params.contentTypeId == 15) {
          if (res.data.length > 0) {
            setSearchPartyList(res.data);
          } else {
            setNoresult('검색 내용이 없습니다 😥');
          }
        }
      });

      setCity('');
      setTown('');
      setBarrier('');
    } else if ((city, town)) {
      let data = {
        sidoCode: cityNum,
        sigunguCode: townNum,
        userSeq: myuser.userSeq,
        contentTypeId: impairmentNums[i],
        page: 0,
        size: 10,
      };
      axios({
        method: 'GET',
        url: '/recommend/search',
        params: data,
      })
        .then((res) => {
          if (res.config.params.contentTypeId == 0) {
            if (res.data.length > 0) {
              setItemList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId == 12) {
            if (res.data.length > 0) {
              setSearchLocationList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            } 
          } else if (res.config.params.contentTypeId == 39) {
            if (res.data.length > 0) {
              setSearchFoodList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId == 32) {
            if (res.data.length > 0) {
              setSearchHomeList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId == 15) {
            if (res.data.length > 0) {
              setSearchPartyList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          }
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


        {search == false? <div>
          {itemList.length > 0?
          <div>
            <RecommendCardList
              itemList={itemList}
              category={category}
            ></RecommendCardList> 
          </div>
          : <div>{noresult}</div>}
          </div>
          :
          <div>
            <h2>명소</h2>
            {searchLocationList.length > 0?
            <div>
              <RecommendCardList
              itemList={searchLocationList}
              category={category}
              ></RecommendCardList> 
            </div>
            : <div>{noresult}</div>
            }
            <h2>음식점</h2>
            {searchFoodList.length > 0? 
            <div>
              <RecommendCardList
                itemList={searchFoodList}
                category={category}
              ></RecommendCardList>
            </div>
            : <div>{noresult}</div>
            }
            <h2>숙박시설</h2>
            {searchHomeList.length > 0? 
            <div>
              <RecommendCardList
                itemList={searchHomeList}
                category={category}
            ></RecommendCardList>
            </div> : <div>{noresult}</div>
            }
            <h2>행사</h2>
            {searchPartyList.length > 0? 
            <div>
              <RecommendCardList
                itemList={searchPartyList}
                category={category}
              ></RecommendCardList>
            </div>
            : <div>{noresult}</div>
            }
            </div>
      }
        
        
        
        
      </Container>
    </div>
  );
};

export default Recommend;
