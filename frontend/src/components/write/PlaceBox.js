import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useCallback, useState, useEffect } from 'react';
import axios from '../../../node_modules/axios/index';
import Button from '../common/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import { setConstantValue } from '../../../node_modules/typescript/lib/typescript';

const PlaceBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[0]};
  padding-top: 1rem;
`;

const PlaceForm = styled.form`
  // overflow: hidden;
  // display: flex;
  // width: 100%;

  // input,
  // button {
  //   outline: none;
  //   border: none;
  //   font-size: 1.125rem;
  // }

  // button {
  //   // background: ${palette.blue[0]};
  //   color: ${palette.blue[0]};
  //   &:hover {
  //     background: ${palette.gray[0]};
  //     color: ${palette.blue[0]};
  //   }
  // }
`;

const pagnationStyle = {
  color: 'black',
  display: 'flex',
  width: '100%',
  marginTop: '3rem',
  textDecoration: 'none',
  margin: '0 10px',
};

const { kakao } = window;

const PlaceItemBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
  border-bottom: 1px solid ${palette.gray[0]};
  padding-bottom: 0.5rem;
`;

const PlaceItem = React.memo(({ place, onRemove }) => (
  <div onClick={() => onRemove(place)}>
    <LocationOnIcon />
    {place}
  </div>
));

const PlaceBox = ({ onChangePlace, onChangeField, postLocation }) => {
  const [input, setInput] = useState('');
  const [localPlace, setLocalPlace] = useState([]);
  const [searchPlaces, setSearchPlaces] = useState([]);
  const [kakaoMap, setKakaoMap] = useState(false);
  const [places, setPlaces] = useState([]);
  const [value, setValue] = useState('');

  const insertPlace = useCallback(
    (postLocation) => {
      if (!postLocation.trim()) return;
      if (localPlace === postLocation) return;
      setLocalPlace(postLocation);
      onChangePlace(postLocation);
    },
    [localPlace, onChangePlace],
  );

  const onRemove = useCallback(() => {
    setLocalPlace([]);
    onChangePlace('');
  }, [localPlace, onChangePlace]);

  const onChange = useCallback((e) => {
    setInput(e.target.value);
    onChangeField({ key: 'postLocation', value: e.target.value });
    setValue(e.target.value);
  }, []);
  const onClickPlace = (searchPlace) => {
    onChangeField({ key: 'postLocation', value: searchPlace.postLocation });
    onChangeField({ key: 'postAddress', value: searchPlace.postAddress });
  };
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertPlace(input.trim());
      setInput('');
      console.log('장소 등록::', input);
    },
    [input, insertPlace],
  );
  const onClick = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/post/searchLocation',
        params: { postLocation: postLocation },
      });
      console.log(response.data);
      setSearchPlaces(response.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };
  useEffect(() => {
    setLocalPlace(postLocation);
  }, [postLocation]);
  useEffect(() => {
    setLocalPlace([]);
  }, []);
  const [myLocation, setMyLocation] = useState('');

  // const onLocationClick = (postLocation) => {
  //   setMyLocation(postLocation);
  // };
  // const [mystyle, setStyle] = useState("display : 'none'");

  // dialog

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => async () => {
    try {
      const response = await axios({
        method: 'get',
        url: '/post/searchLocation',
        params: { postLocation: postLocation },
      });
      console.log(response.data);
      setSearchPlaces(response.data);
      setKakaoMap(false);
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data === 'fail') {
        setKakaoMap(true);
      }
    }
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    onChangeField({ key: 'postLocation', value: 'none' });
    onChangeField({ key: 'postAddress', value: '' });
    onChangeField({ key: 'contentId', value: 0 });
  };

  const ps = new kakao.maps.services.Places();

  // 키워드 검색을 요청하는 함수입니다
  function searchKaKaoPlaces() {
    var keyword = document.getElementById('keyword').value;
    console.log(keyword);

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB);
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 내용 화면에 출력
      setPlaces(data);
      console.log('places : ', places);
      displayPagination(pagination);
      return;
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      // alert('검색 결과가 존재하지 않습니다.');
      var divEl = document.getElementById('pagination');
      var content = document.createTextNode(
        '검색 결과가 없습니다 장소명을 다시 한번 확인해주세요',
      );
      divEl.appendChild(content);
      setValue('');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  }

  // 페이지 번호 출력
  function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
      fragment = document.createDocumentFragment(),
      i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      var el = document.createElement('a');
      el.href = '#';
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.onclick = (function (i) {
          return function () {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <PlaceBoxBlock>
      <div>
        <PlaceForm onSubmit={onSubmit}>
          <Paper
            // component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
            }}
          >
            <LocationOnIcon sx={{ color: '#2D4059' }} aria-label="menu" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="장소를 입력하세요"
              value={postLocation}
              onChange={onChange}
            />
            {/* <IconButton
              onClick={handleClickOpen('paper')}
              sx={{ p: '10px' }}
              aria-label="search"
            >
            </IconButton> */}
            {/* <SearchIcon onClick={handleClickOpen('paper')} /> */}
            <Button onClick={handleClickOpen('paper')}>검색</Button>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
        </PlaceForm>
        <div>
          {/* <Button onClick={handleClickOpen('paper')}>검색 장소 보기</Button> */}
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">장소 검색 결과</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              {kakaoMap ? (
                <div>
                  <h3>빈 값을 입력하셨거나 해당 검색 결과가 없습니다. </h3>
                  <h3>카카오 지도로 검색하시겠어요?🙄</h3>
                  <input type="text" id="keyword" />
                  {/* <input type="text" id="keyword" value={value} /> */}
                  <Button onClick={searchKaKaoPlaces}>
                    카카오 지도에서 검색하기
                  </Button>
                  {places.map((place) => (
                    <div
                      onClick={() => {
                        onChangeField({
                          key: 'postLocation',
                          value: place.place_name,
                        });
                        onChangeField({
                          key: 'postAddress',
                          value: place.road_address_name,
                        });
                        onChangeField({
                          key: 'postLat',
                          value: place.y,
                        });
                        onChangeField({
                          key: 'postLng',
                          value: place.x,
                        });
                        onChangeField({
                          key: 'contentId',
                          value: 0,
                        });
                        setInput(place.place_name);
                        setOpen(false);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <h4>{place.place_name}</h4>
                      <h5>{place.road_address_name}</h5>
                      <hr></hr>
                    </div>
                  ))}
                  <div id="pagination"></div>
                </div>
              ) : (
                // DB에 있는 장소
                searchPlaces.map((searchPlace) => (
                  <div
                    onClick={() => {
                      onChangeField({
                        key: 'postLocation',
                        value: searchPlace.postLocation,
                      });
                      onChangeField({
                        key: 'postAddress',
                        value: searchPlace.postAddress,
                      });
                      onChangeField({
                        key: 'postLat',
                        value: searchPlace.postLat,
                      });
                      onChangeField({
                        key: 'postLng',
                        value: searchPlace.postLng,
                      });
                      setInput(searchPlace.postLocation);
                      setOpen(false);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <h4>{searchPlace.postLocation}</h4>
                    <h5>{searchPlace.postAddress}</h5>
                    <hr></hr>
                  </div>
                ))
              )}
            </DialogContent>
            <DialogActions>
              {kakaoMap ? (
                <div>
                  <Button onClick={() => setOpen(false)}>등록</Button>
                  <Button onClick={handleClose}>취소</Button>
                </div>
              ) : (
                <div>
                  <Button onClick={() => setOpen(false)}>확인</Button>
                  <Button onClick={handleClose}>취소</Button>
                </div>
              )}
            </DialogActions>
          </Dialog>
        </div>
        <br />
      </div>
    </PlaceBoxBlock>
  );
};

export default PlaceBox;
