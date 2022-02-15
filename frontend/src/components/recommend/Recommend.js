import React, { useEffect, useState } from 'react';
import Physical from '../images/PhysicalCheck.png';
import PhysicalHide from '../images/Physical60.png';
import Auditory from '../images/AuditoryCheck.png';
import AuditoryHide from '../images/Auditory60.png';
import Pregnant from '../images/PregnantCheck.png';
import PregnantHide from '../images/Pregnant60.png';
import Senior from '../images/SeniorCheck.png';
import SeniorHide from '../images/Senior60.png';
import Visual from '../images/VisualCheck.png';
import VisualHide from '../images/Visual60.png';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import RecommendCardList from './RecommendCardList.js';
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import './Recommend.css';
import qs from 'qs';
import Button from '../common/Button';
import RecommendList from './RecommendList';
import RecommendDetail from './RecommendDetail';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import styled from 'styled-components';

const AuthBarrierIconBlock = styled.div`
  img {
    margin: 1rem 0.5rem 0;
    cursor: pointer;
    width: 33;
  }
`;

const Recommend = () => {
  const myuser = useSelector((state) => state.user.userData);

  // 시도 설정
  const [cityList, setCityList] = useState([]);
  const [townList, setTownList] = useState([]);
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [barrier, setBarrier] = useState([]);

  // 여행지 추천 파트
  const [itemList, setItemList] = useState([]);
  const [searchLocationList, setSearchLocationList] = useState([]);
  const [searchFoodList, setSearchFoodList] = useState([]);
  const [searchHomeList, setSearchHomeList] = useState([]);
  const [searchCultureList, setSearchCultureList] = useState([]);
  const [searchPartyList, setSearchPartyList] = useState([]);
  const [noresult, setNoresult] = useState('');
  const [search, setSearch] = useState(false);
  const [findSearch, setFindSearch] = useState(false);
  const [number, setNumber] = useState(0);
  const [title, setTitle] = useState('');

  useEffect(() => {
    findMyLocation();
    setCityDropdown();
    // if (barrier.length > 0) {
    //   for (let i = 0; barrier.length > i; i++) {
    //     let current = document.getElementById(barrier[i]);
    //     current.style.border = '3px solid';
    //     current.style.borderColor = 'rgb(234, 84, 85)';
    //     current.style.borderRadius = '100%';
    //   }
    // }
  }, [barrier]);

  // 내 위치 받아오기
  const findMyLocation = () => {
    // Geolocation API에 액세스할 수 있는지를 확인
    if (navigator.geolocation) {
      //위치 정보를 얻기
      navigator.geolocation.getCurrentPosition(function (res) {
        // console.log(res);
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
          if (res.data === '검색결과가 없습니다.') {
            // console.log('hey');
            setItemList([]);
          } else {
            // console.log(res.data);
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
      // console.log(res);
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
    // console.log(event);
    setTown(event.target.value);
  };

  // 장애 정보 선택하기
  // const onClickBarrier = (res) => {
  //   // if (search === true) {
  //   //   if (barrier.length > 0) {
  //   //     for (let i = 0; barrier.length > i; i++) {
  //   //       if (barrier[i] === 'physical')
  //   //         setBarrierIcon({ ...barrierIcon, deafFlag: true });
  //   //     }
  //   //   }
  //   // }
  //   // if (barrier.includes(res.target.id)) {
  //   //   let current = document.getElementById(res.target.id);
  //   //   console.log('current2', current);
  //   //   current.style.border = null;
  //   //   setBarrier(barrier.filter((info) => info !== res.target.id));
  //   // } else {
  //   //   setBarrier(barrier.concat(res.target.id));
  //   // }
  //   if (barrier.includes(res.target.id)) {

  //   }

  //   // console.log(barrier);
  // };

  // 검색
  const onClickSearch = () => {
    setItemList([]);
    setSearchLocationList([]);
    setSearchFoodList([]);
    setSearchHomeList([]);
    setSearchCultureList([]);
    setSearchPartyList([]);
    setSearch(true);
    const cityNum = Number(city);
    const townNum = Number(town);
    const impairmentNums = [0, 12, 39, 32, 14, 15];
    for (var i = 0; i < impairmentNums.length; i++)
      if (city && town && barrier) {
        let data = {
          sidoCode: cityNum,
          sigunguCode: townNum,
          userSeq: myuser.userSeq,
          contentTypeId: impairmentNums[i],
          impairments: barrier,
          page: 1,
          size: 4,
        };
        axios({
          method: 'GET',
          url: '/recommend/search',
          params: data,
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
          },
        }).then((res) => {
          if (res.config.params.contentTypeId === 0) {
            if (res.data.length > 0) {
              setItemList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 12) {
            if (res.data.length > 0) {
              setSearchLocationList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 39) {
            if (res.data.length > 0) {
              setSearchFoodList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 32) {
            if (res.data.length > 0) {
              setSearchHomeList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 14) {
            if (res.data.length > 0) {
              setSearchCultureList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 15) {
            if (res.data.length > 0) {
              setSearchPartyList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          }
          setFindSearch(false);
        });
      } else if (barrier) {
        let data = {
          userSeq: myuser.userSeq,
          contentTypeId: impairmentNums[i],
          impairments: barrier,
          page: 1,
          size: 4,
        };
        axios({
          method: 'GET',
          url: '/recommend/search',
          params: data,
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
          },
        }).then((res) => {
          // console.log(res);
          if (res.config.params.contentTypeId == 0) {
            if (res.data.length > 0) {
              setItemList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 12) {
            if (res.data.length > 0) {
              setSearchLocationList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 39) {
            if (res.data.length > 0) {
              setSearchFoodList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 32) {
            if (res.data.length > 0) {
              setSearchHomeList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 14) {
            if (res.data.length > 0) {
              setSearchCultureList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 15) {
            if (res.data.length > 0) {
              setSearchPartyList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          }
          setFindSearch(false);
        });
      } else if (city && town) {
        let data = {
          sidoCode: cityNum,
          sigunguCode: townNum,
          userSeq: myuser.userSeq,
          contentTypeId: impairmentNums[i],
          page: 1,
          size: 4,
        };
        axios({
          method: 'GET',
          url: '/recommend/search',
          params: data,
        }).then((res) => {
          if (res.config.params.contentTypeId === 0) {
            if (res.data.length > 0) {
              setItemList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 12) {
            if (res.data.length > 0) {
              setSearchLocationList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 39) {
            if (res.data.length > 0) {
              setSearchFoodList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 32) {
            if (res.data.length > 0) {
              setSearchHomeList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 14) {
            if (res.data.length > 0) {
              setSearchCultureList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          } else if (res.config.params.contentTypeId === 15) {
            if (res.data.length > 0) {
              setSearchPartyList(res.data);
            } else {
              setNoresult('검색 내용이 없습니다 😥');
            }
          }
          setFindSearch(false);
        });
      } else if (city) {
        alert('시군구 정보가 필요합니다.');
      } else if (city && barrier) {
        alert('시군구 정보가 필요합니다.');
      }
  };

  const onClickTotal = () => {
    setFindSearch(false);
    setNumber(0);
  };

  const onClickLocation = () => {
    setTitle('명소');
    setFindSearch(true);
    setNumber(12);
  };

  const onClickFood = () => {
    setFindSearch(true);
    setNumber(39);
    setTitle('음식점');
  };

  const onClickHome = () => {
    setFindSearch(true);
    setNumber(32);
    setTitle('숙박시설');
  };

  const onClickParty = () => {
    setFindSearch(true);
    setNumber(15);
    setTitle('행사');
  };

  const onClickCulture = () => {
    setFindSearch(true);
    setNumber(14);
    setTitle('문화');
  };

  const changeFindSearch = () => {
    setFindSearch(true);
    setNumber(15);
    setTitle('행사');
  };

  const onClickReset = () => {
    // if (barrier.length > 0) {
    //   for (let i = 0; barrier.length > i; i++) {
    //     let current = document.getElementById(barrier[i]);
    //     current.style.border = null;
    //   }
    // }
    setBarrierIcon({
      ...barrierIcon,
      physicalFlag: false,
      visibilityFlag: false,
      deafFlag: false,
      infantFlag: false,
      seniorFlag: false,
    });
    setCity('');
    setTown('');
    setBarrier([]);
  };

  const [barrierIcon, setBarrierIcon] = useState({
    physicalFlag: false,
    visibilityFlag: false,
    deafFlag: false,
    infantFlag: false,
    seniorFlag: false,
  });
  const { physicalFlag, visibilityFlag, deafFlag, infantFlag, seniorFlag } =
    barrierIcon;

  return (
    <div>
      {/* <Header /> */}
      {/* <Container maxWidth="lg"> */}
        <div class="selete-box">
          <h2>무장애 선택하기</h2>
          <AuthBarrierIconBlock>
            <img
              class="barrier-icon"
              id="physical"
              onClick={() => {
                if (barrier.includes('physical')) {
                  barrier.splice('physical');
                  setBarrierIcon({ ...barrierIcon, physicalFlag: false });
                } else {
                  barrier.push('physical');
                  setBarrierIcon({ ...barrierIcon, physicalFlag: true });
                }
              }}
              src={physicalFlag ? Physical : PhysicalHide}
            ></img>
            <img
              class="barrier-icon"
              id="visibility"
              onClick={() => {
                if (barrier.includes('visibility')) {
                  barrier.splice('visibility');
                  setBarrierIcon({ ...barrierIcon, visibilityFlag: false });
                } else {
                  barrier.push('visibility');
                  setBarrierIcon({ ...barrierIcon, visibilityFlag: true });
                }
              }}
              src={visibilityFlag ? Visual : VisualHide}
            ></img>
            <img
              class="barrier-icon"
              id="deaf"
              onClick={() => {
                if (barrier.includes('deaf')) {
                  barrier.splice('deaf');
                  setBarrierIcon({ ...barrierIcon, deafFlag: false });
                } else {
                  barrier.push('deaf');
                  setBarrierIcon({ ...barrierIcon, deafFlag: true });
                }
              }}
              src={deafFlag ? Auditory : AuditoryHide}
            ></img>
            <img
              class="barrier-icon"
              id="infant"
              onClick={() => {
                if (barrier.includes('infant')) {
                  barrier.splice('infant');
                  setBarrierIcon({ ...barrierIcon, infantFlag: false });
                } else {
                  barrier.push('infant');
                  setBarrierIcon({ ...barrierIcon, infantFlag: true });
                }
              }}
              src={infantFlag ? Pregnant : PregnantHide}
            ></img>
            <img
              class="barrier-icon"
              id="senior"
              onClick={() => {
                if (barrier.includes('senior')) {
                  barrier.splice('senior');
                  setBarrierIcon({ ...barrierIcon, seniorFlag: false });
                } else {
                  barrier.push('senior');
                  setBarrierIcon({ ...barrierIcon, seniorFlag: true });
                }
              }}
              src={seniorFlag ? Senior : SeniorHide}
            ></img>
          </AuthBarrierIconBlock>
          <h2>무장애 여행지역</h2>
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
            <Button variant="contained" id="reset" onClick={onClickReset}>
              초기화
            </Button>
          </div>
        </div>
        <div>
          {search === false ? (
            <div>
              <div>
                <h2 class="my-loc">내 주변 무장애 여행지</h2>
                <span class="find-myloc" onClick={findMyLocation}>
                  <MyLocationIcon fontSize="small"></MyLocationIcon>내 위치 가져오기
                </span>
              </div>
              {itemList.length > 0 ? (
                <div>
                  <RecommendCardList itemList={itemList}></RecommendCardList>
                </div>
              ) : (
                <div>{noresult}</div>
              )}
            </div>
          ) : findSearch === false ? (
            <div>
              <div>
                <Button onClick={onClickTotal}>전체</Button>
                <Button onClick={onClickLocation}>명소</Button>
                <Button onClick={onClickFood}>음식점</Button>
                <Button onClick={onClickHome}>숙박시설</Button>
                <Button onClick={onClickCulture}>문화</Button>
                <Button onClick={onClickParty}>행사</Button>
              </div>
              <RecommendList
                class="card-list"
                changeFindSearch={changeFindSearch}
                setNumber={setNumber}
                setTitle={setTitle}
                searchLocationList={searchLocationList}
                noresult={noresult}
                searchFoodList={searchFoodList}
                searchHomeList={searchHomeList}
                searchCultureList={searchCultureList}
                searchPartyList={searchPartyList}
              ></RecommendList>
            </div>
          ) : (
            <div>
              <div>
                <Button onClick={onClickTotal}>전체</Button>
                <Button onClick={onClickLocation}>명소</Button>
                <Button onClick={onClickFood}>음식점</Button>
                <Button onClick={onClickHome}>숙박시설</Button>
                <Button onClick={onClickCulture}>문화</Button>
                <Button onClick={onClickParty}>행사</Button>
              </div>
              <h2 class="title">{title}</h2>
              <RecommendDetail
                noresult={noresult}
                number={number}
                city={city}
                town={town}
                barrier={barrier}
              ></RecommendDetail>
            </div>
          )}
        </div>
      {/* </Container> */}
    </div>
  );
};

// changeFindSearch={changeFindSearch}
//               setNumber={setNumber}
//               setTitle={setTitle}
export default Recommend;
